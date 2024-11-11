import FormModal from "@/components/form/FormModal";
import { View } from "react-native";

export default function createNew() {
  return (
    <View>
      <FormModal isEdit={false} currentCar={undefined} modalVisible={true} />
    </View>
  );
}
