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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const categories: MenuCategory[] = [
    {
      uid: "1232",
      name: "Coffee",
      imageUrl:
        "https://t3.ftcdn.net/jpg/02/67/56/80/360_F_267568050_gKkcBAI5XkpEHNpipkx2aIarNbwarCRN.jpg",
    },
    {
      uid: "123",
      name: "Fast Food",
      imageUrl:
        "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
    },
    {
      uid: "1213",
      name: "Sea Food",
      imageUrl:
        "https://t3.ftcdn.net/jpg/02/68/22/20/360_F_268222004_kdPmrr5Mg4yrh3kq4Rhway1zNMHUX6d7.jpg",
    },
    {
      uid: "12121333",
      name: "HotPot",
      imageUrl:
        "https://fullofplants.com/wp-content/uploads/2019/10/vegan-thai-hotpot-sweet-and-sour-soup-with-tofu-mushrooms-noodles-thumb-5.jpg",
    },
    {
      uid: "1212123",
      name: "Juice",
      imageUrl:
        "https://i.pinimg.com/564x/91/14/1d/91141dd74b5cca8648ad640fc1391dba.jpg",
    },
    {
      uid: "1212123www",
      name: "Milk tea",
      imageUrl:
        "https://t4.ftcdn.net/jpg/03/02/92/35/360_F_302923519_kByrdVBiLnXclK167x0GpRAGS1Til57L.jpg",
    },
    {
      uid: "1212123ww2w",
      name: "Bakery",
      imageUrl:
        "https://t3.ftcdn.net/jpg/02/94/37/84/360_F_294378459_JJLI1ts6mUTEvXLKhOoUpoQqbchSVbZe.jpg",
    },
  ];
  

  return (
    <SafeAreaView className="flex-1">
      <Header />
      <CartProvider>

      <View className="flex-1 flex-row">
        {/* MenuSidebar takes up 20% of the screen width */}
        <View className="flex-[0.2] h-full">
          <MenuSidebar categories={categories} />
        </View>

        {/* Slot takes up 60% of the screen width */}
        <View className="flex-[0.6]">
            <Slot/>
         
        </View>

        {/* CartSidebar takes up 20% of the screen width */}
        <View className="flex-[0.2]">
          <CartSIdebar />
        </View>
      </View>
      </CartProvider>
    </SafeAreaView>
  );
}
