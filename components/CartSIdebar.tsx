import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useMemo } from "react";
import { useCart } from "@/app/contexts/cart.context";
import Ionicons from "@expo/vector-icons/Ionicons";
import CartItem from "./CartItem";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { sendMessageToTelegram } from "@/api/telegram.api";
import { useRouter } from "expo-router";
import { getFontSize } from "@/utils/getFontSize";

const CartSIdebar = () => {
  const { cart, tableNumber, clearCart, paymentType, setPaymentType } =
    useCart();

  const router = useRouter();

  const handleCartSubmit = async () => {
    if (cart.length > 0) {
      clearCart();
      router.navigate("/success");
      const message = cart
        .map((item) => `${item.name} (Количесвто: ${item.quantity})`)
        .join("\n");
      await sendMessageToTelegram(
        `стол № ${tableNumber} \n Заказ :\n${message} \nОплата ${
          paymentType === "card" ? "картой" : "наличными"
        }`
      );
    }
  };

  const onPress = () => {
    cart.forEach((ci) => {
      console.log(JSON.stringify(ci));
    });
  };
  return (
    <View className="p-4 flex justify-between h-full">
      <View className="flex-1">
        <View className="flex flex-row items-center justify-between pb-2">
          <Text className="font-interbold text-gray-700" style={{fontSize: getFontSize(18)}}>Счёт</Text>
          <TouchableOpacity onPress={() => clearCart()}>
            <Text className="font-intersemibold text-gray-600" style={{fontSize: getFontSize(14)}}>Очистить</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={cart}
          renderItem={({ item }) => <CartItem cartItem={item} />}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View className="flex flex-row items-center justify-between border-t-2 border-green-600 py-3 mt-2">
              <Text className="text-gray-700 font-interbold" style={{fontSize: getFontSize(18)}}>
                Всего
              </Text>
              <Text className="text-green-600 font-interbold" style={{fontSize: getFontSize(18)}}>
                {cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}{" "}
                ₽
              </Text>
            </View>
          }
        />
      </View>

      <View className="gap-y-2">
        <TouchableOpacity onPress={() => setPaymentType("cash")}>
          <View
            className={`flex flex-row border-2 rounded  py-1 px-4  items-center justify-between ${
              paymentType === "cash" ? "border-green-600 " : "border-gray-300"
            }`}
          >
            <Text
            style={{fontSize: getFontSize(12)}}
              className={`font-intersemibold flex-shrink ${
                paymentType === "cash" ? "" : "text-gray-300"
              }`}
            >
              Оплата наличными
            </Text>
            <Ionicons
              name="cash"
              size={getFontSize(24)}
              color={`${paymentType === "cash" ? "green" : "lightgray"}`}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPaymentType("card")}>
          <View
            className={`flex flex-row border-2 rounded  py-1 px-4  items-center justify-between ${
              paymentType === "card" ? "border-green-600" : "border-gray-300"
            }`}
          >
            <Text
            flex-shrink
            style={{fontSize: getFontSize(12)}}
              className={`font-intersemibold ${
                paymentType === "card" ? "" : "text-gray-300"
              }`}
            >
              Оплата картой
            </Text>
            <Ionicons
              name="card"
              size={getFontSize(24)}
              color={`${paymentType === "card" ? "green" : "lightgray"}`}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCartSubmit}>
          <View className="flex flex-row bg-green-600 rounded  py-1 px-4  items-center justify-between">
            <Text className="font-intersemibold text-white flex-shrink" style={{fontSize: getFontSize(12)}}>
              Заказать
            </Text>
            <FontAwesome6 name="bell-concierge" size={getFontSize(24)} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartSIdebar;
