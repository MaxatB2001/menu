import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MenuItemModel } from "@/models/menuItem.model";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCart } from "@/app/contexts/cart.context";

interface Props {
  menuItem: MenuItemModel;
}

const MenuItem = ({ menuItem }: Props) => {
  const { addToCart, isItemInCart, getItemQuantity, removeFromCart } = useCart();

  const handleAddToCart = () => {
    addToCart(menuItem);
  };

  const handleRemove = () => {
    removeFromCart(menuItem.uid);
  };

  const itemInCart = isItemInCart(menuItem.uid);
  const itemQuantity = getItemQuantity(menuItem.uid);

  return (
    <View
      style={{ maxWidth: "50%" }}
      className="flex-1 mx-2 mb-4 p-2 bg-white rounded-lg shadow-md gap-y-2"
    >
      <Image
        className="w-full h-32 rounded-lg"
        source={{ uri: menuItem.imageUrl }}
      />
      <Text>{menuItem.price} р</Text>
      <Text className="font-inter">{menuItem.name}</Text>
      {itemInCart ? (
          <View className="flex-row justify-center items-center bg-stone-200 rounded-lg">
            <TouchableOpacity onPress={handleRemove}>
              <Ionicons name="remove-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text className="mx-2">{itemQuantity}</Text>
            <TouchableOpacity onPress={handleAddToCart} >
              <Ionicons name="add-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            className="w-full justify-center items-center bg-stone-200 rounded-lg"
            onPress={handleAddToCart}
          >
            <Ionicons name="add-outline" size={24} color="black" />
          </TouchableOpacity>
        )}
      
    </View>
  );
};

export default MenuItem;
