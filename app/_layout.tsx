import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function _layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Home",
          title: "Lojas",
        }}
      />

      <Drawer.Screen
        name="createNew"
        options={{
          drawerLabel: "Create New",
          title: "Create New",
        }}
      />

      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Login / Logout",
          title: "LogIn / Logout",
        }}
      />

      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: "About",
          title: "About",
        }}
      />

      <Drawer.Screen
        name="register"
        options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer>
  );
}
