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
import { useCart } from "../contexts/cart.context";
import { MenuItemModel } from "@/models/menuItem.model";
import { Ionicons } from "@expo/vector-icons";
import { getFontSize, verticalScale } from "@/utils/getFontSize";

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
    navigation.goBack()
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
      <Image className="w-full" style={{height: verticalScale(208)}} source={{ uri: menuItem.imageUrl }} />
      <View
        style={{
          position: "absolute",
          top: verticalScale(20),
          left: getFontSize(20),
          borderRadius: 50,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          onPress={handleClosePress}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            paddingHorizontal: getFontSize(10),
            paddingVertical: verticalScale(10),
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
        className="bg-white mx-4 flex-1"
        style={{
          paddingHorizontal: getFontSize(24),
          paddingVertical: verticalScale(24),
          borderTopEndRadius: 35,
          borderTopLeftRadius: 35,
          marginTop: -verticalScale(30), // Reduced negative margin
          flexGrow: 1, // Ensures it stretches to fill space
          justifyContent: 'space-between' // Distribute items evenly
        }}
      >
        <View>
          <View className="flex flex-row justify-between items-start" style={{marginBottom: verticalScale(16)}}>
            <View>
              <Text style={{fontSize: getFontSize(24)}} className="font-interbold">{menuItem.name}</Text>
              <Text style={{fontSize: getFontSize(16)}} className="font-inter text-slate-500">
                {menuItem.description}
              </Text>
            </View>
            <Text style={{fontSize: getFontSize(20)}} className="font-interbold">{totalPrice} ₽</Text>
          </View>

          <View style={{marginBottom: verticalScale(24)}}>
            <Text className="font-intersemibold" style={{fontSize: getFontSize(20), marginBottom: verticalScale(16)}}>
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
            paddingHorizontal: getFontSize(20),
            paddingVertical: verticalScale(10),
            borderRadius: 12,
          }}
          className="justify-center items-center bg-green-600 w-full"
          onPress={handleAddToCart}
        >
          <Text style={{fontSize: getFontSize(14)}} className="text-white font-interbold">Добавить в заказ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MenuItemScreen;
