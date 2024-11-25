import FormModal from "@/components/form/FormModal";
import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";

export default function createNew() {
  return (
    <View>
      <FormModal isEdit={false} currentStore={undefined} modalVisible={true} />
    </View>
  );
}
