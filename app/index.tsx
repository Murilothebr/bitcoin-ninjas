import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import addCar from "@/services/hooks/addCar";
import getCars from "@/services/hooks/getCars";
import deleteCars from "@/services/hooks/deleteCar";
import updateCar from "@/services/hooks/editarCar";
import organizeCarsIntoSections from "@/services/carsService";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import FormInput from "@/components/form/FormInput";
import FormButtonCancel from "@/components/form/FormButtonCancel";
import FormButtonCreate from "@/components/form/FormButtonCreate";

export default function index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cars, setCars] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newCar, setNewCar] = useState<Omit<Cars, "id">>({
    brand: "",
    price: "",
    model: "",
    year: "",
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentCar, setCurrentCar] = useState<
    Omit<Cars, "id"> & { id?: number }
  >({ brand: "", price: "", model: "", year: "" });

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

  const handleDelete = async (id: number) => {
    try {
      await deleteCars(id);
      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  const handleAddCar = async () => {
    try {
      await addCar(newCar);
      setModalVisible(false);
      setNewCar({ brand: "", price: "", model: "", year: "" });
      const carsData = await getCars();
      setCars(carsData);
    } catch (error) {
      console.error("Failed to add car:", error);
    }
  };

  const handleEditCar = async () => {
    try {
      if (currentCar.id) {
        await updateCar(currentCar as Cars);
        setModalVisible(false);
        setCurrentCar({ brand: "", model: "", year: "", price: "" });
        const carsData = await getCars();
        setCars(carsData);
      }
    } catch (error) {
      console.error("Failed to edit car:", error);
    }
  };

  const openEditModal = (car: Cars) => {
    setCurrentCar(car);
    setEditMode(true);
    setModalVisible(true);
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

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <AntDesign name="pluscircle" size={50} color="green" />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalView}>
              <FormInput
                label="Marca"
                value={currentCar.brand}
                onChangeText={(text) =>
                  setCurrentCar({ ...currentCar, brand: text })
                }
              />
              <FormInput
                label="Modelo"
                value={currentCar.model}
                onChangeText={(text) =>
                  setCurrentCar({ ...currentCar, model: text })
                }
              />
              <FormInput
                label="Preço (Mil / BRL)"
                value={currentCar.price}
                onChangeText={(text) =>
                  setCurrentCar({ ...currentCar, price: text })
                }
              />
              <FormInput
                label="Ano fabricação"
                value={currentCar.year.toString()}
                onChangeText={(text) =>
                  setCurrentCar({ ...currentCar, year: text })
                }
              />

              <View style={styles.buttonContainer}>
                <FormButtonCreate
                  title={editMode ? "Edit Car" : "Add Car"}
                  onPress={editMode ? handleEditCar : handleAddCar}
                />
                <FormButtonCancel
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        
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
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "white",
    padding: 35,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    width: "80%",
  },
});
