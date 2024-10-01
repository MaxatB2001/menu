import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import { useCart } from "./contexts/cart.context";

const success = () => {
  const router = useRouter();
  const onPress = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-white justify-between">
      <View className="flex-[0.9] justify-center">
        <LottieView
          style={{ flex: 1 }}
          source={require("../assets/animations/Animation - 1726642979500.json")}
          autoPlay
          loop={false}
        />
        <Text className="text-center font-interbold text-3xl">
          Мы приняли ваш заказ!
        </Text>
      </View>

      <View className="p-4">
        <TouchableOpacity
          onPress={onPress}
          style={{
            paddingHorizontal: 24,
            paddingVertical: 14,
            borderRadius: 12,
          }}
          className="justify-center items-center bg-green-600 w-full"
        >
          <Text className="text-white font-interbold text-lg">
            Сделать ещё один заказ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default success;
