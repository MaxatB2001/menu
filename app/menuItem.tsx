import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import ExtraOptionsList from "@/components/ExtraOptionsList";
import { useCart } from "./contexts/cart.context";
import { MenuItemModel } from "@/models/menuItem.model";
import { Ionicons } from "@expo/vector-icons";

const MenuItemScreen = () => {
  const { cart, addToCart } = useCart();
  const [selectedOptions, setSelectedOptions] = useState<MenuItemModel[]>([]);
  const navigation = useNavigation();

  useEffect(() => {}, [selectedOptions]);

  const handleOptionChange = (newSelectedOptions: MenuItemModel[]) => {
    setSelectedOptions(newSelectedOptions);
  };

  const { item } = useLocalSearchParams();
  const menuItem = JSON.parse(item as string);

  const handleClosePress = () => {
    navigation.goBack();
  };

  const totalPrice = useMemo(() => {
    const extraPrice = selectedOptions
      .filter((option) => option.checked)
      .reduce((acc, option) => acc + option.price, 0);
    return menuItem.price + extraPrice;
  }, [menuItem.price, selectedOptions]);

  const handleAddToCart = () => {
    addToCart({ ...menuItem, price: totalPrice });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "rgb(248, 248, 248)",
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Image className="w-full h-52" source={{ uri: menuItem.imageUrl }} />
      <View
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          borderRadius: 50,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          onPress={handleClosePress}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: 10,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
          }}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View
        className="bg-white mx-4 p-6 flex-1"
        style={{
          borderTopEndRadius: 35,
          borderTopLeftRadius: 35,
          marginTop: -30, // Reduced negative margin
          flexGrow: 1, // Ensures it stretches to fill space
          justifyContent: 'space-between' // Distribute items evenly
        }}
      >
        <View>
          <View className="flex flex-row justify-between items-start mb-4">
            <View>
              <Text className="text-2xl font-interbold">{menuItem.name}</Text>
              <Text className="text-base font-inter text-slate-500">
                {menuItem.description}
              </Text>
            </View>
            <Text className="text-xl font-interbold">{totalPrice} ₽</Text>
          </View>

          <View className="mb-6">
            <Text className="font-intersemibold text-xl mb-4">
              К этому блюду идеально подойдет:
            </Text>
            <ExtraOptionsList
              options={menuItem.extraOptions}
              onOptionsChange={handleOptionChange}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 12,
          }}
          className="justify-center items-center bg-green-600 w-full"
          onPress={handleAddToCart}
        >
          <Text className="text-white font-interbold">Добавить в заказ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MenuItemScreen;
