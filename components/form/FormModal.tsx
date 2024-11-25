import { useEffect, useState } from "react";
import {
  Modal,
  View,
  TouchableNativeFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import FormInput from "./FormInput";
import FormButtonCreate from "./FormButtonCreate";
import FormButtonCancel from "./FormButtonCancel";
import addStore from "@/services/hooks/addStore";
import updateStore from "@/services/hooks/editarStore";
import { router } from "expo-router";

interface FormModalProps {
  isEdit: boolean;
  currentStore?: Store;
  modalVisible: boolean;
}

const FormModal: React.FC<FormModalProps> = ({
  isEdit,
  currentStore,
  modalVisible,
}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(modalVisible);

  const [storeData, setStoreData] = useState<
    Omit<Store, "id"> & { id?: number }
  >({
    id: currentStore?.id || null,
    name: currentStore?.name || "",
    location: currentStore?.location || "",
    contact: currentStore?.contact || "",
    currencies: currentStore?.currencies || null,
  });

  const handleAddStore = async () => {
    try {
      await addStore(storeData);
      setStoreData({
        name: "",
        location: "",
        contact: "",
        currencies: null,
      });

      router.push(`/`);
    } catch (error) {
      console.error("Failed to add store:", error);
    }
  };

  const handleEditStore = async () => {
    try {
      if (storeData.id) {
        await updateStore(currentStore as Store);
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Failed to edit store:", error);
    }
  };

  useEffect(() => {
    if (currentStore) {
      setStoreData({
        id: currentStore?.id || null,
        name: currentStore?.name || "",
        location: currentStore?.location || "",
        contact: currentStore?.contact || "",
        currencies: currentStore?.currencies || null,
      });
    }
  }, [currentStore]);

  useEffect(() => {
    console.log("modalVisible", isModalVisible);
  }, [isModalVisible]);

  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalView}>
          <FormInput
            label="Nome do estabelecimento"
            value={storeData.name}
            onChangeText={(text) => setStoreData({ ...storeData, name: text })}
          />
          <FormInput
            label="Cidade"
            value={storeData.location}
            onChangeText={(text) =>
              setStoreData({ ...storeData, location: text })
            }
          />
          <FormInput
            label="Contato"
            value={storeData.contact}
            onChangeText={(text) =>
              setStoreData({ ...storeData, contact: text })
            }
          />
          <FormInput
            label="Moedas aceitas"
            value={storeData.currencies?.join(", ")}
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
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    width: "80%",
  },
});

export default FormModal;
