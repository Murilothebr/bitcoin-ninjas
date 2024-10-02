import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ActionSheetIOS } from "react-native";
import { router } from "expo-router"; // Assuming you're using expo-router for navigation

type HeaderWithTitleProps = {
  title: string;
  actionSheetOptions: string[];
  HideThisPage: boolean;
};

const HeaderWithTitle = ({ title, actionSheetOptions, HideThisPage }: HeaderWithTitleProps) => {
  const onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actionSheetOptions,
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // Cancel button action
        } else if (buttonIndex === 1) {
          if (HideThisPage) {
            router.push(`/home`);
          } else {
            router.push(`/about`);
          }
        } else if (buttonIndex === 2) {
          router.replace("/");
        }
      },
    );
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <TouchableOpacity
        onPress={onPress}
        testID="header-left-button"
      >
        <Ionicons name="menu-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>
        {title}
      </Text>
    </View>
  );
};

export default HeaderWithTitle;
