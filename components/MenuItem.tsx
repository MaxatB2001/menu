import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MenuItemModel } from "@/models/menuItem.model";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCart } from "@/app/contexts/cart.context";

interface Props {
  menuItem: MenuItemModel;
}

const MenuItem = ({ menuItem }: Props) => {
  const { addToCart, isItemInCart, getItemQuantity, removeFromCart } = useCart();
  const router = useRouter();
  
  const handleAddToCart = () => {
    if (menuItem.extraOptions && menuItem.extraOptions.length > 0) {
      router.push({pathname: `/menuItem`, params: { item: JSON.stringify(menuItem)}});
      return;
    }
    addToCart(menuItem);
  };

  const handlePress = () => {
    router.push({pathname: `/menuItem`, params: { item: JSON.stringify(menuItem)}});
  }

  const handleRemove = () => {
    removeFromCart(menuItem.uid);
  };

  const itemInCart = isItemInCart(menuItem.uid);
  const itemQuantity = getItemQuantity(menuItem.uid);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: menuItem.imageUrl }}
      />
      <Text style={styles.name}>{menuItem.name}</Text>
      <Text style={styles.description}>{menuItem.description}</Text>
      
      <View style={styles.bottomSection}>
        <Text style={styles.price}>{menuItem.price} ₽</Text>
        {itemInCart ? (
          <View style={styles.cartControls}>
            <TouchableOpacity onPress={handleRemove}>
              <Ionicons name="remove-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text className="font-intersemibold" style={styles.quantity}>{itemQuantity}</Text>
            <TouchableOpacity onPress={handleAddToCart}>
              <Ionicons name="add-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text  style={styles.addToCartText}>В корзину</Text>
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
    justifyContent: 'space-between',  // Ensure content is spaced evenly
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: 'slategray',
  },
  bottomSection: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    padding: 7,
  },
  quantity: {
    marginHorizontal: 10,
  },
  addToCartButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#28a745',
  },
  addToCartText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default MenuItem;
