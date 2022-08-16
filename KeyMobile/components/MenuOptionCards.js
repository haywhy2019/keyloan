import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants";

const MenuOptionsCard = ({ navigation, label, screen }) => {
  return (
    <TouchableOpacity 
    onPress={() => navigation.navigate(screen)}
    >
      <View style={styles.container1}>
        <Text style={styles.container1Text}>{label}</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={20}
          color={COLORS.primaryBlue}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: COLORS.primaryBlue,
    backgroundColor: "white",
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.grey,
    paddingHorizontal: 20,
    fontFamily: FONTS.normal,
  },
  container1Text: {
    color: COLORS.primaryBlue,
  },
});
export default MenuOptionsCard;
