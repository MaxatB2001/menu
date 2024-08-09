import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { MenuCategory } from '@/models/menuCategory.model'
import Category from './Category'

export interface Props {
    categories: MenuCategory[]
}

const MenuSidebar = ({categories}: Props) => {
  return (
    <View className='bg-white h-full p-3'>
      <FlatList showsVerticalScrollIndicator={false} ItemSeparatorComponent={() => <View className="h-3" />} data={categories} keyExtractor={(item) => item.uid} renderItem={({item}) => <Category category={item}/>}/>
    </View>
  )
}

export default MenuSidebar