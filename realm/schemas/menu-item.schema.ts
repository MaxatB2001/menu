import {Realm} from '@realm/react';

class MenuItem extends Realm.Object<MenuItem> {
    uid!: string
    name!: string
    price!: number
    imageUrl!: string
    extraOptions!: Realm.List<MenuItem>

    static schema: Realm.ObjectSchema = {
        name: "MenuItem",
        primaryKey: 'uid',
        properties: {
            uid: 'string',
            name: 'string',
            price: 'number',
            imageUrl: 'string',
            extraOptions: 'MenuItem[]'
        }
    }
}

export default MenuItem