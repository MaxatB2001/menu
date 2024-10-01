import { View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { MenuItemModel } from "@/models/menuItem.model";
import MenuItemsList from "@/components/MenuItemsList";
import { getDataFromStorage } from "@/utils/storage";
import { useSearch } from "../contexts/search.context";
import { fetchAndStoreMenuItems } from "@/utils/fetchAndStoreData";

const CurrentCategory = () => {
  const { category } = useLocalSearchParams();
  const { searchText } = useSearch();
  const [menuItems, setMenuItems] = useState<MenuItemModel[]>([]);

  useEffect(() => {
    console.log(searchText)
    fetchAndStoreMenuItems().then((menuItems: MenuItemModel[]) => {
      const categoryItems = menuItems.filter(
        (item) => item.categoryUid === category
      );

      // Apply search filter only if searchText is present
      const filteredItems = searchText
        ? categoryItems.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )
        : categoryItems;

      setMenuItems(filteredItems);
    });
  }, [searchText, category]); // Make sure to add `category` to dependencies

  return (
    <SafeAreaView style={{ backgroundColor: "rgb(248, 248, 248)" }}>
      <View>
        <MenuItemsList menuItems={menuItems} />
      </View>
    </SafeAreaView>
  );
};

export default CurrentCategory;
