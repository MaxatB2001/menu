import { View, Modal as RNModal, ModalProps } from "react-native";
import React from "react";

type Props = ModalProps & {
  isOpen: boolean;
};

const Modal = ({ isOpen, children, ...rest }: Props) => {
  return (
    <RNModal
      visible={isOpen}
      transparent
      supportedOrientations={['portrait', 'landscape']}
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {/* Center the modal content */}
      <View
        style={{
          flex: 1,
          justifyContent: "center", // Center vertically
          alignItems: "center",      // Center horizontally
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            // padding: 20,
            borderRadius: 10,
            width: "30%", // Adjust width as needed
          }}
        >
          {children}
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;
