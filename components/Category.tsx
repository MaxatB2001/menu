import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { MenuCategory } from '@/models/menuCategory.model'
import { useRouter } from 'expo-router'

interface Props {
    category: MenuCategory
}

const Category = ({category}: Props) => {
  const router = useRouter();

  const handlePress = () => {
    // Navigate to the category route, passing the uid as a parameter
    router.push(`/${category.name}`);
  };
  return (
    <TouchableOpacity onPress={handlePress} className="h-24 rounded-lg overflow-hidden">
      <ImageBackground
        className="h-full w-full"
        source={{ uri: category.imageUrl }}
        resizeMode="cover"
      >
        <View className="flex-1 bg-black/40 items-center justify-center">
          <Text className=" font-inter font-bold text-white text-lg">{category.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default Category