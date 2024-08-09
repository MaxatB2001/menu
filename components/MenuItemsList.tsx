import { View, Text, FlatList, Button } from "react-native";
import React from "react";
import { MenuItemModel } from "../models/menuItem.model";
import MenuItem from "./MenuItem";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/app/contexts/cart.context";

interface Props {
  menuItems: MenuItemModel[];
}

const MenuItemsList = ({ menuItems }: Props) => {

    return (
   <View className="bg-gray-100">
     <FlatList
      data={menuItems}
      renderItem={({ item }) => <MenuItem key={item.uid} menuItem={item} />}
      keyExtractor={(item) => item.uid}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }} // Tailwind styles for column wrapper
      contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 20  }}
      showsVerticalScrollIndicator={false}
    />
   </View>
  );
};

export default MenuItemsList;
