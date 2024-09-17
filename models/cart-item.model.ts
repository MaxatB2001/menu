import { ExtraOptionModel } from "./extra-option.model";
import { MenuItemModel } from "./menuItem.model";

export interface CartItemModel extends MenuItemModel {
    quantity: number;
  }
  