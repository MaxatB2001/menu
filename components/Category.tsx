import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import React from "react";
import { MenuCategory } from "@/models/menuCategory.model";
import { useRouter } from "expo-router";
import SubCategory from "./SubCategory";

interface Props {
  category: MenuCategory;
}

const Category = ({ category }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    // Navigate to the category route, passing the uid as a parameter
    router.replace(`/${category.name}`);
  };
  return (
    <View>
      <Text className="font-interbold text-gray-700 text-lg py-3">{category.name}</Text>
      <FlatList
        data={category.subCategories}
        ItemSeparatorComponent={() => <View className="h-3"></View>}
        renderItem={({ item }) => <SubCategory category={item} />}
        keyExtractor={(item) => item.uid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Category;
