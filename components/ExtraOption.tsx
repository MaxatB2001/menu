import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MenuItemModel } from "@/models/menuItem.model";
import { useCart } from "@/app/contexts/cart.context";

interface ExtraOptionProps {
  item: MenuItemModel;
}

const ExtraOption: React.FC<ExtraOptionProps> = ({ item }) => {
  const { isItemInCart, addToCart ,removeFromCart } = useCart();
  const itemInCart = isItemInCart(item.uid);

  // Animation values
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;

  // Effect to run animation when the item is added to the cart
  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: itemInCart ? 1 : 0,
      duration: 300,
      useNativeDriver: false, // Color changes do not support native driver
    }).start();

    Animated.timing(iconOpacity, {
      toValue: itemInCart ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [itemInCart]);

  // Interpolating background color
  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#f5f5f5", "#16a34a"], // Neutral to green
  });

  const addItemToCart = () => {
    addToCart(item);
  };

  const removeItemFromCart = () => {
      removeFromCart(item.uid)
  }

  return (
    <TouchableWithoutFeedback
      onPress={itemInCart ? removeItemFromCart : addItemToCart}
    >
      <Animated.View
        style={{
          borderRadius: 20,
          width: 160, // 40*4, same as w-40
          height: 240, // 60*4, same as h-60
          justifyContent: "space-between",
          padding: 16, // same as p-4
          backgroundColor: interpolatedBackgroundColor,
        }}
        className="flex justify-between"
      >
        <View>
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              borderRadius: 20,
              width: "100%",
              height: 128, // same as h-32
              objectFit: "cover",
            }}
          />
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className={`${itemInCart ? 'text-neutral-200' : 'text-gray-700'} text-center text-lg font-intersemibold`}
          >
            {item.name}
          </Text>
        </View>
        {itemInCart ? (
          <Animated.View
            style={{
              alignItems: "center",
              justifyContent: "center",
              opacity: iconOpacity,
            }}
          >
            <Ionicons name="checkmark" size={24} color="white" />
          </Animated.View>
        ) : (
          <Text className="text-gray-700 text-center text-lg font-intersemibold">
            {item.price} ₽
          </Text>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ExtraOption;
