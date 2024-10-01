import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  item: { imageUrl: string; title: string };
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");
const w = width * 0.6;
console.log("SCREEN WI ", width)

const SliderItem = ({ item, index, scrollX }: Props) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * w, index * w, (index + 1) * w],
            [0, 0, 0],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * w, index * w, (index + 1) * w],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          width: w,
        },
        rnAnimatedStyle,
      ]}
    >
      <Image
        source={{ uri: item.imageUrl }}
        className="rounded-lg"
        style={{ height: 200, width: "94%" }}
      />
    </Animated.View>
  );
};

export default SliderItem;
