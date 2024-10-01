import { Dimensions, PixelRatio } from "react-native";

// You can tweak these values to suit your design
const guidelineBaseWidth = 1280;
const guidelineBaseHeight = 800;

const { width, height } = Dimensions.get("screen");


export const getFontSize = (fontSize: number) => {
  
  const scale = (size: number) => (width / guidelineBaseWidth) * size;
  const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

  const upd = moderateScale(fontSize);

  return upd;
};

export const verticalScale = (size: number) => height / guidelineBaseHeight * size;
