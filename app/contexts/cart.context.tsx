// src/context/CartContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { MenuItemModel } from "@/models/menuItem.model";
import { CartItemModel } from "@/models/cart-item.model";

interface CartContextProps {
  cart: CartItemModel[];
  addToCart: (item: MenuItemModel) => void;
  isItemInCart: (itemUid: string) => boolean;
  getItemQuantity: (itemUid: string) => number;
  removeFromCart: (itemUid: string) => void;
  tableNumber: number | undefined;
  setTableNumber: (tableNumber: number) => void;
  clearCart: () => void;
  paymentType: "card" | "cash";
  setPaymentType: (paymentType: "card" | "cash") => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItemModel[]>([]);
  const [tableNumber, setTableNumber] = useState<undefined | number>(undefined);
  const [paymentType, setPaymentType] = useState<"cash" | "card">("cash");

  const addToCart = (item: MenuItemModel) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.uid === item.uid
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemUid: string) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (cartItem) => cartItem.uid === itemUid
      );

      if (itemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity -= 1;
        console.log("UPDATED ", updatedCart[itemIndex].quantity);
        if (updatedCart[itemIndex].quantity < 1) {
          return prevCart.filter((item) => item.uid !== itemUid);
        }
        return updatedCart;
      }
      return prevCart.filter((item) => item.uid !== itemUid);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const isItemInCart = (itemUid: string) => {
    const item = cart.find((item) => item.uid === itemUid);
    if (item && item.quantity > 0) return true;
    return false;
  };

  const getItemQuantity = (itemUid: string) => {
    const item = cart.find((item) => item.uid === itemUid);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        isItemInCart,
        getItemQuantity,
        removeFromCart,
        tableNumber,
        setTableNumber,
        clearCart,
        paymentType, 
        setPaymentType
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
