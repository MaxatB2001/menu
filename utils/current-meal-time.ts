import { MenuItemModel } from "@/models/menuItem.model";

export const getCurrentMeal = () => {
    const currentHour = new Date().getHours();
    console.log(currentHour)
    if (currentHour >= 6 && currentHour < 11) {
      return 'dinner';
    } else if (currentHour >= 11 && currentHour < 16) {
      return 'lunch';
    } else if (currentHour >= 16 && currentHour < 21) {
      return 'dinner';
    } else {
      return 'dinner'; // Default if it's outside regular hoursdd
    }
  };


export const filterMenuItemsByMeal = (menuItems: MenuItemModel[]) => {
    const currentMeal = getCurrentMeal();
    return menuItems.filter(item => item.mealType === currentMeal);
  };