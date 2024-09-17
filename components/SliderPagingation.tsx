import { View, Dimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";

type Props = {
  items: { imageUrl: string; title: string }[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");
const w = width * 0.6;

const SliderPagingation = ({ items, paginationIndex, scrollX }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 30,
      }}
    >
      {items.map((_, index) => {
        // Ensure useAnimatedStyle is called for each item
        const pgAnimationStyle = useAnimatedStyle(() => {
          const dotWidth = interpolate(
            scrollX.value,
            [(index - 1) * w, index * w, (index + 1) * w],
            [8, 20, 8],
            Extrapolation.CLAMP
          );
          return { width: dotWidth };
        });

        return (
          <Animated.View
            key={index}
            style={[
              {
                backgroundColor: paginationIndex === index ? "#222" : "#aaa",
                height: 8,
                width: 8,
                marginHorizontal: 2,
                borderRadius: 8,
              },
              pgAnimationStyle, // Apply animated style here
            ]}
          />
        );
      })}
    </View>
  );
};

export default SliderPagingation;
