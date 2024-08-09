import { View, Text } from "react-native";
import React from "react";
import { CartItemModel } from "@/models/cart-item.model";

interface Props {
  cartItem: CartItemModel;
}

const CartItem = ({ cartItem }: Props) => {
  return (
    <View className="border-t-2 border-gray-200 py-3">
      <View className="flex flex-row items-center justify-between pb-2">
        <Text className="font-semibold text-gray-600">- {cartItem.name}</Text>
        <Text className="text-green-600 font-semibold">{cartItem.price}</Text>
      </View>
      <View className="flex flex-row items-center justify-between">
        <Text className="font-normal text-gray-500">Количество</Text>
        <Text className="font-normal text-gray-500">{cartItem.quantity}</Text>
      </View>
    </View>
  );
};

export default CartItem;
