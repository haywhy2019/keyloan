import { StyleSheet, Text, View, Pressable } from "react-native";
import { GLOBAL_STYLE, FONTS, COLORS, SIZES } from "../../constants";
import { TelIcon, CableBillsIcon } from "../../constants/icons";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import React from "react";

const MenuThreeRows = ({
  firstIcon,
  firstText,
  secondIcon,
  secondText,
  thirdIcon,
  thirdText,
  onPress1,
  onPress2,
  onPress3
}) => {
  return (
    <View style={{ marginHorizontal: "10%", marginTop: 20 }}>
      <View style={[GLOBAL_STYLE.rowBetween, { marginVertical: 7 }]}>
        <Pressable
          style={styles.iconBg}
          onPress={onPress1}
        >
          {firstIcon}
          <Text style={styles.menuText}>{firstText}</Text>
        </Pressable>
        <Pressable
          style={styles.iconBg}
          onPress={onPress2}
        >
          {secondIcon}

          <Text style={styles.menuText}>{secondText}</Text>
        </Pressable>
        <Pressable
          style={styles.iconBg}
          onPress={onPress3}
        >
          {thirdIcon}

          <Text style={styles.menuText}>{thirdText}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MenuThreeRows;

const styles = StyleSheet.create({
  iconBg: {
    width: SIZES.width / 4,
    height: SIZES.width / 4,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 5,
  },
  menuText: {
    color: COLORS.primaryBlue,
    paddingHorizontal:  SIZES.responsiveHeight("1.5"),
    fontSize: SIZES.responsiveHeight("1.5"),
    fontFamily: FONTS.normal,
    textAlign: "center",
    marginTop: 10,
  },
});
