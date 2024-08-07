import MenuItemsList from "@/components/MenuItemsList";
import { MenuItemModel } from "@/models/menuItem.model";
import { useState } from "react";
import {SafeAreaView} from "react-native"

const mockMenuItems: MenuItemModel[] = [
  {uid: "123",name: "Бургер", price: 400, imageUrl: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"},
  {uid: "1234",name: "Бургер2", price: 400, imageUrl: "https://img.freepik.com/premium-photo/amazing-delicious-cheese-burger_727939-299.jpg"},
  {uid: "12344",name: "Бургер2", price: 400, imageUrl: "https://img.freepik.com/premium-photo/amazing-delicious-cheese-burger_727939-299.jpg"},
  {uid: "123464",name: "Бургер2", price: 400, imageUrl: "https://img.freepik.com/premium-photo/amazing-delicious-cheese-burger_727939-299.jpg"},
  {uid: "1234621",name: "Бургер2", price: 400, imageUrl: "https://img.freepik.com/premium-photo/amazing-delicious-cheese-burger_727939-299.jpg"},
  {uid: "1234216",name: "Бургер2", price: 400, imageUrl: "https://img.freepik.com/premium-photo/amazing-delicious-cheese-burger_727939-299.jpg"},
  {uid: "1233346",name: "Бургер2", price: 400, imageUrl: "https://img.freepik.com/premium-photo/amazing-delicious-cheese-burger_727939-299.jpg"},
  {uid: "12346421",name: "Бургер2", price: 400, imageUrl: "https://img.freepik.com/premium-photo/amazing-delicious-cheese-burger_727939-299.jpg"},
  {uid: "12312346",name: "Бургер2", price: 400, imageUrl: "https://img.freepik.com/premium-photo/amazing-delicious-cheese-burger_727939-299.jpg"}
]


export default function HomeScreen() {
  const [menuItems, setMenuItems] = useState<MenuItemModel[]>(mockMenuItems)

  return (
    <SafeAreaView >
      <MenuItemsList menuItems={menuItems} />
    </SafeAreaView>
  );
}
