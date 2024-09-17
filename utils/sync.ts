import { getMenuItems } from "@/api/menu.api"
import { storeData } from "./storage"
import { getAllCategories } from "@/api/category.api"

export const fetchAndStoreData = async () => {
  try {
    const menuItems = await getMenuItems()
    const categories = await getAllCategories()
    console.log("MEN", menuItems);
    
    storeData('MenuItems', menuItems)
    storeData("Categories", categories)
  } catch (error) {
    console.log(error)
  }
    
}