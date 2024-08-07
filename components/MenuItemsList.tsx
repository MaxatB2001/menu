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
    const { cart } = useCart();

    return (
   <View>
     <FlatList
      ListHeaderComponent={
        <View className="h-4">
          <Text>header</Text>
          <Link href="/cart">
            <Ionicons name="cart-outline" size={24} color="black" />
          </Link>
        </View>
      }
      data={menuItems}
      renderItem={({ item }) => <MenuItem key={item.uid} menuItem={item} />}
      keyExtractor={(item) => item.uid}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }} // Tailwind styles for column wrapper
      contentContainerStyle={{ paddingHorizontal: 8 }}
      stickyHeaderIndices={[0]}
      ListFooterComponent={ cart.length > 0 ? <View className='h-14' /> : <View></View>}
    />
        {cart.length > 0 && (
        <Link href='/cart' className='absolute p-4 bottom-0 right-0 left-0 bg-orange-400'>
            Корзина
        </Link>
      )}
   </View>
  );
};

export default MenuItemsList;
