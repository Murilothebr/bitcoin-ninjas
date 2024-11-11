import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import getCars from "@/services/hooks/getCars";
import deleteCars from "@/services/hooks/deleteCar";
import organizeCarsIntoSections from "@/services/carsService";
import { FontAwesome } from "@expo/vector-icons";
import FormModal from "@/components/form/FormModal";

export default function index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cars, setCars] = useState<any[]>([]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentCar, setCurrentCar] = useState<Cars | undefined>(undefined);

  const onChangeSearch = (query: any) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await getCars();
        setCars(carsData);
      } catch (error) {
        console.error("Failed to fetch cars data:", error);
      }
    };

    fetchCars();
  }, []);

  const handleRefresh = async () => {
    const cars = await getCars();
    setCars(cars);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCars(id);
      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  const openEditModal = (car: Cars) => {
    setCurrentCar(car);
    setModalVisible(true);
    handleRefresh();
  };

  return (
    <View style={styles.view}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Cade..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholderTextColor="black"
        />

        <View style={{ marginBottom: 100 }}>
          <SectionList
            sections={organizeCarsIntoSections(cars).filter((data) =>
              data.title.toUpperCase().includes(searchQuery.toUpperCase())
            )}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.model}>{item.model}</Text>
                <Text style={styles.carPrice}>{item.price},000R$</Text>
                <Text style={styles.year}>{item.year}</Text>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <FontAwesome name="trash" size={15} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openEditModal(item)}
                  style={styles.editButton}
                >
                  <FontAwesome name="pencil" size={15} color="gray" />
                </TouchableOpacity>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
        </View>

        {modalVisible && (
          <FormModal
            isEdit={true}
            currentCar={currentCar}
            modalVisible={true}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  view: {
    backgroundColor: "white",
  },
  searchBar: {
    padding: 10,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 5,
    color: "black",
    borderWidth: 1,
    borderColor: "gray",
  },
  item: {
    alignItems: "center",
  },
  header: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    padding: 20,
  },
  model: {
    fontSize: 30,
    textAlign: "center",
  },
  carPrice: {
    fontSize: 20,
    textAlign: "center",
    color: "lightgreen",
    fontWeight: "bold",
  },
  year: {
    fontSize: 12,
    textAlign: "center",
    color: "gray",
  },
  carId: {
    fontSize: 10,
    textAlign: "center",
    color: "lightgray",
  },
  deleteButton: {
    color: "red",
  },
  addButton: {
    marginTop: 15,
    alignSelf: "center",
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
