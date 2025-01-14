import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import getStores from "@/services/hooks/getStores";
import deleteStores from "@/services/hooks/deleteStore";
import { FontAwesome } from "@expo/vector-icons";
import organizeStoreIntoSections from "@/services/storeService";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

export default function index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stores, setStores] = useState<Store[]>([]);
  const [currentStore, setCurrentStore] = useState<Store | undefined>(
    undefined
  );
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [storeToDelete, setStoreToDelete] = useState<Store | undefined>(
    undefined
  );

  const handleRefresh = async () => {
    try {
      const storesData = await getStores();
      setStores(storesData);
      console.log(storesData);
    } catch (error) {
      console.error("Failed to refresh stores:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleRefresh();
    }, [])
  );

  const handleDelete = async () => {
    if (!storeToDelete) return;

    try {
      await deleteStores(storeToDelete.id);
      setStores((prevStores) =>
        prevStores.filter((store) => store.id !== storeToDelete.id)
      );
      setDeleteModalVisible(false);
      setStoreToDelete(undefined);
    } catch (error) {
      console.error("Failed to delete store:", error);
    }
  };

  const openInfoModal = (store: Store) => {
    setCurrentStore(store);
    setInfoModalVisible(true);
  };

  const openDeleteModal = (store: Store) => {
    setStoreToDelete(store);
    setDeleteModalVisible(true);
  };

  return (
    <View style={styles.view}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Pesquisar por cidade..."
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
                <Text style={styles.year}>{item.segment}</Text>
                <TouchableOpacity
                  onPress={() => openInfoModal(item)}
                  style={styles.infoButton}
                >
                  <Text style={styles.infoButtonText}>Detalhes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openDeleteModal(item)}>
                  <FontAwesome name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
        </View>

        {infoModalVisible && currentStore && (
          <Modal
            visible={infoModalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setInfoModalVisible(false)}
          >
            <View style={styles.infoModal}>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Detalhes da Loja</Text>
                <View style={styles.detailContainer}>
                  <Text style={styles.label}>Nome</Text>
                  <Text style={styles.value}>{currentStore.name}</Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.label}>Segmento</Text>
                  <Text style={styles.value}>{currentStore.segment}</Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.label}>Moedas Aceitas</Text>
                  <Text style={styles.value}>
                    {currentStore.currencies?.join(", ") || "N/A"}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.label}>Cidade</Text>
                  <Text style={styles.value}>{currentStore.city || "N/A"}</Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.label}>Contacto</Text>
                  <Text style={styles.value}>
                    {currentStore.contact || "N/A"}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.label}>Description</Text>
                  <Text style={styles.value}>
                    {currentStore.description || "N/A"}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setInfoModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Anotado!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {deleteModalVisible && storeToDelete && (
          <Modal
            visible={deleteModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setDeleteModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.deleteModal}>
                <Text style={styles.modalText}>
                  Certeza que quer remover essa loja? :/
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setDeleteModalVisible(false)}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleDelete}
                  >
                    <Text style={styles.buttonText}>Deletar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
    marginBottom: 10,
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
  infoButton: {
    marginTop: 5,
    backgroundColor: "#007BFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  infoButtonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  infoModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  infoContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
    alignSelf: "center",
  },
  detailContainer: {
    marginBottom: 10,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    marginTop: 2,
  },
  value: {
    fontSize: 16,
    color: "black",
    marginTop: 2,
  },
  closeButton: {
    marginTop: 15,
    alignSelf: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  deleteModal: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
