import { getMenuItems } from "@/api/menu.api";
import { getDataFromStorage, storeData } from "./storage";
import { getAllCategories } from "@/api/category.api";

export const fetchAndStoreData = async () => {
  try {
    // Check if data exists in AsyncStorage
    const storedMenuItems = await getDataFromStorage("MenuItems");
    const storedCategories = await getDataFromStorage("Categories");

    if (!storedMenuItems || !storedCategories) {
      // If not, fetch from the server
      const menuItems = await getMenuItems();
      const categories = await getAllCategories();

      console.log("Fetched from server", menuItems);

      // Store the data in AsyncStorage
      await storeData("MenuItems", menuItems);
      await storeData("Categories", categories);

      // Return fetched data so you can use it immediately in your component
      return { menuItems, categories };
    } else {
      console.log("Loaded from storage");
      // Return stored data if it exists
      return { menuItems: storedMenuItems, categories: storedCategories };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchAndStoreMenuItems = async () => {
  const storedMenuItems = await getDataFromStorage("MenuItems");

  if (!storedMenuItems) {
    // If not, fetch from the server
    const menuItems = await getMenuItems();


    await storeData("MenuItems", menuItems);

    return menuItems;
  } else {
    return storedMenuItems;
  }
};

export const fetchAndStoreCategories = async () => {
  const storedCategories = await getDataFromStorage("Categories");
  if (!storedCategories) {
    // If not, fetch from the server
    const categories = await getAllCategories();

    await storeData("Categories", categories);
    console.log("CAT FROM ", categories)
    return categories;
  } else {
    return storedCategories;
  }
};
