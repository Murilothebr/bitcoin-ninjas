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
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

export default function index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stores, setStores] = useState<Store[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentStore, setCurrentStore] = useState<Store | undefined>(
    undefined
  );

  const handleRefresh = async () => {
    try {
      const storesData = await getStores();
      setStores(storesData);
    } catch (error) {
      console.error("Failed to refresh stores:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleRefresh();
    }, [])
  );

  const handleDelete = async (id: number) => {
    try {
      await deleteStores(id);
      setStores((prevStores) => prevStores.filter((store) => store.id !== id));
    } catch (error) {
      console.error("Failed to delete store:", error);
    }
  };

  const openEditModal = (store: Store) => {
    setCurrentStore(store);
    setModalVisible(true);
  };

  return (
    <View style={styles.view}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          placeholderTextColor="black"
        />

        <View style={{ marginBottom: 100 }}>
          <SectionList
            sections={organizeStoreIntoSections(stores).filter((data) =>
              data.title.toUpperCase().includes(searchQuery.toUpperCase())
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.model}>{item.name}</Text>
                <Text style={styles.storePrice}>
                  {item.currencies?.join(", ")}
                </Text>
                <Text style={styles.year}>{item.contact}</Text>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <FontAwesome name="trash" size={15} color="red" />
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
            isEdit={!!currentStore}
            currentStore={currentStore as Store}
            modalVisible={modalVisible}
            onClose={() => {
              setModalVisible(false);
              handleRefresh();
            }}
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
    padding: 5,
    fontWeight: "bold",
  },
  storePrice: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
  },
  year: {
    fontSize: 12,
    textAlign: "center",
    color: "gray",
    marginBottom: 5,
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
