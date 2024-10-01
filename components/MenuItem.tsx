import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MenuItemModel } from "@/models/menuItem.model";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCart } from "@/app/contexts/cart.context";
import { getFontSize, verticalScale } from "@/utils/getFontSize";

interface Props {
  menuItem: MenuItemModel;
}

const MenuItem = ({ menuItem }: Props) => {
  const { addToCart, isItemInCart, getItemQuantity, removeFromCart } =
    useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    if (menuItem.extraOptions && menuItem.extraOptions.length > 0) {
      router.push({
        pathname: `/menuItem`,
        params: { item: JSON.stringify(menuItem) },
      });
      return;
    }
    addToCart(menuItem);
  };

  const handlePress = () => {
    router.push({
      pathname: `/menuItem`,
      params: { item: JSON.stringify(menuItem) },
    });
  };

  const handleRemove = () => {
    removeFromCart(menuItem.uid);
  };

  const itemInCart = isItemInCart(menuItem.uid);
  const itemQuantity = getItemQuantity(menuItem.uid);

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={{ uri: menuItem.imageUrl }} />
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}>
          {menuItem.name}
        </Text>
      </View>
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
        {menuItem.description}
      </Text>
      <View style={styles.bottomSection}>
        <Text style={styles.price}>{menuItem.price} ₽</Text>

        {itemInCart ? (
          <View style={styles.cartControls}>
            <TouchableOpacity onPress={handleRemove}>
              <Ionicons name="remove-outline" size={getFontSize(24)} color="black" />
            </TouchableOpacity>
            <Text className="font-intersemibold" style={styles.quantity}>
              {itemQuantity}
            </Text>
            <TouchableOpacity onPress={handleAddToCart}>
              <Ionicons name="add-outline" size={getFontSize(24)} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartText}>В корзину</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: "32%",
    paddingHorizontal: 10,
    paddingVertical: 16,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: getFontSize(18),
    marginTop: 10,
  },
  description: {
    fontSize: getFontSize(14),
    color: "slategray",
    marginTop: verticalScale(5),
    marginBottom: verticalScale(15),
  },
  bottomSection: {
    marginTop: "auto",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: getFontSize(10)
  },
  price: {
    fontWeight: "bold",
    fontSize: getFontSize(20),
  },
  cartControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-around',
    backgroundColor: "#dcdcdc",
    borderRadius: 10,
    paddingHorizontal: getFontSize(20),
    paddingVertical: verticalScale(10),
    height: verticalScale(40), // Ensure both cartControls and addToCartButton have the same height
  },
  quantity: {
    fontSize: getFontSize(15),
    marginHorizontal: 10,
  },
  addToCartButton: {
    alignSelf: "flex-start",
    paddingHorizontal: getFontSize(20),
    paddingVertical: verticalScale(10),
    borderRadius: 10,
    backgroundColor: "#28a745",
    height: verticalScale(40), // Ensure the height matches cartControls
    justifyContent: "center", // Align the text vertically
  },
  addToCartText: {
    color: "white",
    fontWeight: "600",
    fontSize: getFontSize(15),
  },
});


export default MenuItem;
