import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { MenuCategory } from '@/models/menuCategory.model'
import Category from './Category'

export interface Props {
    categories: MenuCategory[]
}

const MenuSidebar = ({categories}: Props) => {
  console.log("MENU SIDEVAR")
  return (
    <View className='bg-white h-full px-4 pb-4'>
      <FlatList showsVerticalScrollIndicator={false}  data={categories} keyExtractor={(item) => item.uid} renderItem={({item}) => <Category category={item}/>}/>
    </View>
  )
}

export default MenuSidebar