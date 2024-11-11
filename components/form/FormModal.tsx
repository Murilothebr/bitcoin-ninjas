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
import addCar from "@/services/hooks/addCar";
import updateCar from "@/services/hooks/editarCar";

interface FormModalProps {
  isEdit: boolean;
  currentCar?: Cars;
  modalVisible: boolean;
}

const FormModal: React.FC<FormModalProps> = ({
  isEdit,
  currentCar,
  modalVisible,
}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(modalVisible);

  const [carData, setCarData] = useState<Omit<Cars, "id"> & { id?: number }>({
    id: currentCar?.id || null,
    brand: currentCar?.brand || "",
    price: currentCar?.price || "",
    model: currentCar?.model || "",
    year: currentCar?.year || "",
  });

  const handleAddCar = async () => {
    try {
      await addCar(carData);
      setCarData({
        id: undefined,
        brand: "",
        price: "",
        model: "",
        year: "",
      });
    } catch (error) {
      console.error("Failed to add car:", error);
    }
  };

  const handleEditCar = async () => {
    try {
      if (carData.id) {
        await updateCar(currentCar as Cars);
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Failed to edit car:", error);
    }
  };

  useEffect(() => {
    if (currentCar) {
      setCarData({
        id: currentCar.id,
        brand: currentCar.brand,
        price: currentCar.price,
        model: currentCar.model,
        year: currentCar.year,
      });
    }
  }, [currentCar]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalView}>
          <FormInput
            label="Marca"
            value={carData.brand}
            onChangeText={(text) => setCarData({ ...carData, brand: text })}
          />
          <FormInput
            label="Modelo"
            value={carData.model}
            onChangeText={(text) => setCarData({ ...carData, model: text })}
          />
          <FormInput
            label="Preço (Mil / BRL)"
            value={carData.price}
            onChangeText={(text) => setCarData({ ...carData, price: text })}
          />
          <FormInput
            label="Ano fabricação"
            value={carData.year.toString()}
            onChangeText={(text) => setCarData({ ...carData, year: text })}
          />

          <View style={styles.buttonContainer}>
            <FormButtonCreate
              title={isEdit ? "Edit Car" : "Add Car"}
              onPress={isEdit ? handleEditCar : handleAddCar}
            />
            {isEdit && (
              <FormButtonCancel
                title="Cancel"
                onPress={() => setModalVisible(false)}
              />
            )}
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
