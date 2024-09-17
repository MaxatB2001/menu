import { useFonts } from "expo-font";
import { Link, Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View, Text, TouchableOpacity } from "react-native";
import { MenuItemModel } from "@/models/menuItem.model";
import { CartProvider } from "./contexts/cart.context";
import { MenuCategory } from "@/models/menuCategory.model";
import MenuSidebar from "@/components/MenuSidebar";
import CartSIdebar from "@/components/CartSIdebar";
import Header from "@/components/Header";
import { getDataFromStorage } from "@/utils/storage";
import Modal from "@/components/Modal";
import TableChoose from "@/components/TableChoose";
import { SearchProvider } from "./contexts/search.context";
import { fetchAndStoreCategories, fetchAndStoreData } from "@/utils/fetchAndStoreData";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("../assets/fonts/InterVariable.ttf"),
    GreyQo: require("../assets/fonts/GreyQo-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Semi-Bold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  });

  const [tables, setTables] = useState([
    {
      uid: "1",
      tableNumber: 1,
    },
    {
      uid: "2",
      tableNumber: 2,
    },
    {
      uid: "3",
      tableNumber: 3,
    },
    {
      uid: "5",
      tableNumber: 4,
    },
    {
      uid: "7",
      tableNumber: 5,
    },
  ]);

  useEffect(() => {
    
    fetchAndStoreCategories()
      .then((res) => {
        console.log("DATA LOADED");
        setCategories(res)
      })
      .catch((err) => {
        console.log(err);
      });
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1">
      <SearchProvider>
        <CartProvider>
          <Header setIsOpen={setIsOpen} />
          <View className="flex-1 flex-row">
            {/* MenuSidebar takes up 20% of the screen width */}
            <View className="flex-[0.2] h-full">
              <MenuSidebar categories={categories} />
            </View>

            {/* Slot takes up 60% of the screen width */}
            <View className="flex-[0.6]">
              {/* <Slot/> */}
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="[category]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="menuItem"
                  options={{
                    presentation: "card",
                    gestureEnabled: true,
                    gestureDirection: "vertical",
                    animationDuration: 400,
                    headerShown: false,
                    animation: "slide_from_bottom",
                    animationTypeForReplace: "push",
                  }}
                />
              </Stack>
            </View>

            {/* CartSidebar takes up 20% of the screen width */}
            <View className="flex-[0.2]">
              <CartSIdebar />
            </View>
          </View>
          <Modal isOpen={isOpen}>
            <TableChoose tables={tables} setIsOpen={setIsOpen} />
          </Modal>
        </CartProvider>
      </SearchProvider>
    </SafeAreaView>
  );
}
