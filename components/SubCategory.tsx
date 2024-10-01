import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { MenuCategory } from '@/models/menuCategory.model';
import { usePathname, useRouter } from 'expo-router';
import { getFontSize } from '@/utils/getFontSize';

interface Props {
    category: MenuCategory;
}

const SubCategory = ({ category }: Props) => {
  const router = useRouter();
  const currentRoute = usePathname();
  const currentCategory = currentRoute.slice(1);

  const handlePress = () => {
    // Navigate to the category route, passing the uid as a parameter
    router.replace(`/${category.uid}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="h-24 rounded-lg overflow-hidden">
      <ImageBackground
        className="h-full w-full"
        source={{ uri: category.imageUrl }}
        resizeMode="cover"
      >
        {/* Conditional background overlay */}
        <View style={{paddingHorizontal: getFontSize(5)}} className={`flex-1 items-center justify-center ${currentCategory === category.uid ? 'bg-green-700' : 'bg-black/40'}`}>
          <Text className="font-interbold  text-white" style={{fontSize: getFontSize(18)}}>{category.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default SubCategory;
