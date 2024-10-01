import MenuItemsList from "@/components/MenuItemsList";
import Slider from "@/components/Slider";
import { MenuItemModel } from "@/models/menuItem.model";
import { filterMenuItemsByMeal } from "@/utils/current-meal-time";
import { fetchAndStoreMenuItems } from "@/utils/fetchAndStoreData";
import { getDataFromStorage } from "@/utils/storage";
import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useSearch } from "../contexts/search.context";

export default function HomeScreen() {
  const [menuItems, setMenuItems] = useState<MenuItemModel[]>([]);
  const { searchText } = useSearch();

  const testdata = [
    {
      title: "title 1",
      imageUrl:
        "https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png",
    },
    {
      title: "Title [2",
      imageUrl:
        "https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png",
    },
    {
      title: "Title [2",
      imageUrl:
        "https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png",
    },
    
  ];

  useEffect(() => {
    console.log(searchText)
    fetchAndStoreMenuItems().then((menuItems: MenuItemModel[]) => {
      const filteredItems = filterMenuItemsByMeal(menuItems)
      const items = searchText
      ? filteredItems.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : filteredItems;

    setMenuItems(items);
    });
  }, [searchText]);

  return (
    <SafeAreaView>
      <MenuItemsList headerComponent={<Slider items={testdata}/>} menuItems={menuItems} />
    </SafeAreaView>
  );
}
