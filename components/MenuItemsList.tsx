import { View, Text, FlatList, Button } from "react-native";
import React, { ReactElement } from "react";
import { MenuItemModel } from "../models/menuItem.model";
import MenuItem from "./MenuItem";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/app/contexts/cart.context";

interface Props {
  menuItems: MenuItemModel[];
  headerComponent?: ReactElement
}

const MenuItemsList = ({ menuItems, headerComponent }: Props) => {

    return (
   <View className="h-full">
     <FlatList
      data={menuItems}
      ListHeaderComponent={headerComponent}
      renderItem={({ item }) => <MenuItem key={item.uid} menuItem={item} />}
      keyExtractor={(item) => item.uid}
      numColumns={3}
      columnWrapperStyle={{ justifyContent:"center" }} 
      showsVerticalScrollIndicator={false}
    />
   </View>
  );
};

export default MenuItemsList;
