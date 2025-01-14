import FormModal from "@/components/form/FormModal";
import { View } from "react-native";

export default function createNew() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FormModal
        currentStore={undefined}
        modalVisible={true}
        onClose={() => {}}
      />
    </View>
  );
}
