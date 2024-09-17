
export interface MenuItemModel {
    name: string;
    price: number;
    categoryUid?: string;
    imageUrl: string;
    uid: string
    extraOptions?: MenuItemModel[]
    checked?: boolean
    mealType?: "dinner" | "lunch" | "breakfast"
    description: string
}