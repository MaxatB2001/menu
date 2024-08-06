import { View, Text } from 'react-native'
import React from 'react'
import { MenuCategory } from '@/models/menuCategory.model'

export interface Props {
    categories: MenuCategory[]
}

const MenuSidebar = ({categories}: Props) => {
  return (
    <View>
      <Text>MenuSidebar</Text>
    </View>
  )
}

export default MenuSidebar