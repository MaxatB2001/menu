export interface MenuCategory {
    uid: string;
    name: string;    
    imageUrl?: string
    subCategories?: MenuCategory[]
}