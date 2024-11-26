import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import FormInput from "./FormInput";
import FormButtonCreate from "./FormButtonCreate";
import FormButtonCancel from "./FormButtonCancel";
import addStore from "@/services/hooks/addStore";
import updateStore from "@/services/hooks/editarStore";

interface FormModalProps {
  isEdit: boolean;
  currentStore?: Store;
  modalVisible: boolean;
  onClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({
  isEdit,
  currentStore,
  modalVisible,
  onClose,
}) => {
  const [storeData, setStoreData] = useState<Store>({
    id: currentStore?.id || null,
    name: currentStore?.name || "",
    location: currentStore?.location || "",
    contact: currentStore?.contact || "",
    currencies: currentStore?.currencies || null,
  });

  // Update storeData when currentStore changes
  useEffect(() => {
    if (currentStore) {
      setStoreData({
        id: currentStore.id || null,
        name: currentStore.name || "",
        location: currentStore.location || "",
        contact: currentStore.contact || "",
        currencies: currentStore.currencies || null,
      });
    }
  }, [currentStore]);

  // Handle adding a store
  const handleAddStore = async () => {
    try {
      await addStore(storeData); // Assuming this is the service to add the store
      setStoreData({
        id: null,
        name: "",
        location: "",
        contact: "",
        currencies: null,
      });
      onClose(); // Close modal and refresh parent
    } catch (error) {
      console.error("Failed to add store:", error);
    }
  };

  // Handle editing a store
  const handleEditStore = async () => {
    try {
      if (storeData.id) {
        await updateStore(storeData); // Assuming this is the service to update the store
        onClose(); // Close modal and refresh parent
      }
    } catch (error) {
      console.error("Failed to edit store:", error);
    }
  };

  return (
    <View style={styles.modalView}>
      <FormInput
        label="Nome da loja"
        value={storeData.name}
        onChangeText={(text) => setStoreData({ ...storeData, name: text })}
      />
      <FormInput
        label="Cidade"
        value={storeData.location}
        onChangeText={(text) => setStoreData({ ...storeData, location: text })}
      />
      <FormInput
        label="Contato"
        value={storeData.contact}
        onChangeText={(text) => setStoreData({ ...storeData, contact: text })}
      />
      <FormInput
        label="Moedas aceitas (separar por virgula)"
        value={storeData.currencies?.join(", ") || ""}
        onChangeText={(text) =>
          setStoreData({
            ...storeData,
            currencies: text.split(",").map((item) => item.trim()),
          })
        }
      />

      <View style={styles.buttonContainer}>
        <FormButtonCreate
          title={isEdit ? "Edit Store" : "Add Store"}
          onPress={isEdit ? handleEditStore : handleAddStore}
        />
        <FormButtonCancel
          title="Cancel"
          onPress={onClose} // Close modal via parent's onClose handler
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    width: "80%",
  },
});

export default FormModal;
