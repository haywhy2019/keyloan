import { Text, TouchableOpacity, StyleSheet, View, Keyboard } from "react-native";
import React from "react";
import { COLORS , FONTS} from "../../constants";

export default function CustomButton({
  buttonText,
  buttonTextStyle,
  buttonContainerStyle,
  onPress,
  icon,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.defaultButton, ...buttonContainerStyle }}
    >
      <Text style={{ ...styles.label, ...buttonTextStyle }}>{buttonText}</Text>
      <View style={icon ? styles.icon : styles.hideIcon}>{icon}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: COLORS.primaryBlue,
    height: 50,
    borderRadius: 5,
    justifyContent: "space-around",
  },
  label: {
    textAlign: "center",
    color: COLORS.white,
   fontFamily: FONTS.bold
  },
  icon: {},
  hideIcon: {
    display: "none",
  },
});
