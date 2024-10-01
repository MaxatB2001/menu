import { View, Text, FlatList, ViewToken } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SliderItem from "./Slider-item";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import SliderPagingation from "./SliderPagingation";
import { getCurrentMeal } from "@/utils/current-meal-time";
import { getFontSize } from "@/utils/getFontSize";

type Prop ={
    items: {title: string, imageUrl: string}[]
}

const mealTypeAliases = {
  dinner: "Ужин",
  lunch: "Обед",
  breakfast: "Завтрак "
}

const Slider = ({items}: Prop) => {
    const [paginationIndex, setPaginationIndex] = useState(0 )
    const [data, setData ] = useState(items)
    const scrollX = useSharedValue(0)

    const [currentMeal, setCurrentMeal] = useState<"dinner" | "lunch" | "breakfast">("dinner")

    useEffect(() => {
      setCurrentMeal(getCurrentMeal())
    }, [])

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => { 
            scrollX.value = e.contentOffset.x
         }
    })

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }

    const onViewableItemsChanged = ({viewableItems}: {viewableItems: ViewToken[]}) => {
        if (viewableItems && viewableItems.length > 0 && viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
            setPaginationIndex(viewableItems[0].index)
        }
    }

    const viewabilityConfigCallbackPairs = useRef([{viewabilityConfig, onViewableItemsChanged}])

  return (
    <View style={{paddingTop: 16}}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal
        pagingEnabled
        renderItem={({ item, index }) => (
          <SliderItem index={index} item={item} scrollX={scrollX} />
        )}
        onScroll={onScrollHandler}
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <SliderPagingation paginationIndex={paginationIndex} scrollX={scrollX} items={data}/>
      <Text className="font-interbold font-bold" style={{marginLeft: 20, fontSize: getFontSize(30)}}>Идеально на {mealTypeAliases[currentMeal]}</Text>
    </View>
  );
};

export default Slider;
