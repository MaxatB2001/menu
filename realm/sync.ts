import { getMenuItems } from "@/api/menu.api"
import { MenuItemModel } from "@/models/menuItem.model"
import { useRealm } from "@realm/react"

export const fetchAndStoreData = async () => {
    const realm = useRealm()
    try {
        const menuItems = await getMenuItems() 
        console.log(menuItems)
        realm.write(() => {
            realm.delete(realm.objects("MenuItem"))

            menuItems.forEach((item: MenuItemModel) => {
                const menuItem = realm.create('MenuItem', {
                    ...item,
                })
            });            
        })
        
    } catch(e) {

    }
}