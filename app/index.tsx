import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import getStores from "@/services/hooks/getStores";
import deleteStores from "@/services/hooks/deleteStore";
import { FontAwesome } from "@expo/vector-icons";
import FormModal from "@/components/form/FormModal";
import organizeStoreIntoSections from "@/services/storeService";
import { useEffect, useState } from "react";

export default function index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stores, setStores] = useState<any[]>([]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentStore, setCurrentStore] = useState<Store | undefined>(
    undefined
  );

  const onChangeSearch = (query: any) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storesData = await getStores();
        setStores(storesData);
      } catch (error) {
        console.error("Failed to fetch stores data:", error);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    console.log(modalVisible);
  }, [modalVisible, setModalVisible]);

  const handleRefresh = async () => {
    const stores = await getStores();
    setStores(stores);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStores(id);
      setStores(stores.filter((store) => store.id !== id));
    } catch (error) {
      console.error("Failed to delete store:", error);
    }
  };

  const openEditModal = async (store: Store) => {
    setModalVisible(true);
    setCurrentStore(store);
    await handleRefresh();
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
            sections={organizeStoreIntoSections(stores).filter((data) =>
              data.title.toUpperCase().includes(searchQuery.toUpperCase())
            )}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.model}>{item.name}</Text>
                <Text style={styles.storePrice}>{item.location}</Text>
                <Text style={styles.year}>{item.contact}</Text>
                <Text style={styles.year}>{item.currencies}</Text>
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
            currentStore={currentStore}
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
  storePrice: {
    fontSize: 20,
    textAlign: "center",
    color: "gray",
    fontWeight: "bold",
  },
  year: {
    fontSize: 12,
    textAlign: "center",
    color: "gray",
  },
  storeId: {
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
