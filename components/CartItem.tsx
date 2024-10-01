import { View, Text } from "react-native";
import React from "react";
import { CartItemModel } from "@/models/cart-item.model";
import { getFontSize } from "@/utils/getFontSize";

interface Props {
  cartItem: CartItemModel;
}

const CartItem = ({ cartItem }: Props) => {
  return (
    <View className="border-t-2 border-gray-200 py-3">
      <View className="flex flex-row items-center justify-between pb-2">
        <View className="flex-[0.8]">
          <Text style={{fontSize: getFontSize(14)}} className="font-semibold text-gray-600 flex-wrap">{cartItem.name}</Text>
        </View>
        <Text style={{fontSize: getFontSize(14)}} className="text-green-600 font-semibold">{cartItem.price} ₽</Text>
      </View>
      <View className="flex flex-row items-center justify-between">
        <Text style={{fontSize: getFontSize(14)}} className="font-normal text-gray-500">Количество</Text>
        <Text style={{fontSize: getFontSize(14)}} className="font-normal text-gray-500">{cartItem.quantity}</Text>
      </View>
    </View>
  );
};

export default CartItem;
