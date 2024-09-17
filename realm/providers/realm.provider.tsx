import { ReactNode } from "react";
import { RealmProvider } from '@realm/react';
import MenuItem from "../schemas/menu-item.schema";

const schema = [MenuItem]

export const DatabaseProvider = ({children}: {children: ReactNode}) => (
    <RealmProvider schema={schema}>
        {children}
    </RealmProvider>
)