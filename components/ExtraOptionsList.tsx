import { View, Text, TouchableOpacity, Switch, FlatList } from "react-native";
import React, { FC, useState } from "react";
import ExtraOption from "./ExtraOption";
import { MenuItemModel } from "@/models/menuItem.model";

interface ExtraOptionListProps {
  options: MenuItemModel[];
  onOptionsChange: (selectedOptions: MenuItemModel[]) => void;
}

const ExtraOptionsList: FC<ExtraOptionListProps> = ({
  options,
  onOptionsChange,
}) => {
  const [selectedOptions, setSelectedOptions] =
    useState<MenuItemModel[]>(options);

  const handleSwitchChange = (index: number) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index].checked = !updatedOptions[index].checked;
    setSelectedOptions(updatedOptions);

    // Call the callback to inform the parent about the updated selection
    onOptionsChange(updatedOptions.filter((option) => option.checked));
  };

  return (
    <View>
      <FlatList
        horizontal={true}
        keyExtractor={(item) => item.uid}
        
        data={options}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-2"></View>}
        renderItem={({ item, index }) => (
          <ExtraOption item={item}/>
        )}
      />
      {/* {selectedOptions && selectedOptions.map((option, index) => (
      <View key={index} className="flex-row items-center mb-2">
        <ExtraOption selected={option.checked || false} label={`${option.name} ${option.price}`} onPress={() => handleSwitchChange(index)}/>
      </View>
    ))} */}
    </View>
  );
};

export default ExtraOptionsList;
