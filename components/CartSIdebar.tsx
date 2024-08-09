import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useCart } from "@/app/contexts/cart.context";
import Ionicons from "@expo/vector-icons/Ionicons";
import CartItem from "./CartItem";

const CartSIdebar = () => {
  const { cart } = useCart();

  const onPress = () => {
    console.log("CASH");
  };
  return (
    <View className="p-4 flex justify-between h-full">
      <View className="flex-1">
        <Text className="font-mono font-bold text-lg pb-2 text-gray-700">
          Счёт
        </Text>
        <FlatList
          data={cart}
          renderItem={({ item }) => <CartItem cartItem={item} />}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View className="flex flex-row items-center justify-between border-t-2 border-green-600 py-3 mt-2">
              <Text className="text-gray-700 text-lg font-bold">Всего</Text>
              <Text className="text-lg text-green-600 font-bold">
                {cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </Text>
            </View>
          }
        />
      </View>

      <View className="gap-y-2">
        <TouchableOpacity onPress={onPress}>
          <View className="flex flex-row border-2 rounded border-green-600  py-1 px-4  items-center justify-between">
            <Text className="font-semibold text-xs">Pay By Cash</Text>
            <Ionicons name="cash" size={24} color="green" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <View className="flex flex-row border-2 rounded border-gray-300  py-1 px-4  items-center justify-between">
            <Text className="font-semibold text-xs text-gray-300">
              Pay By Card
            </Text>
            <Ionicons name="card" size={24} color="lightgray" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <View className="flex flex-row border-2 rounded border-green-600 bg-green-600  py-1 px-4 items-center justify-between">
            <Text className="font-semibold text-xs text-white">
              Invoice Printing
            </Text>
            <Ionicons name="print" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartSIdebar;
