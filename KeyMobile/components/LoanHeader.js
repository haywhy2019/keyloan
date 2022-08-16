import React , {useState} from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { COLORS, SIZES, images } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const LoanHeader = ({ item }) => {
  return (

  <View
  // style={styles.container}
  >
    <Image source={images.sliderBg} style={styles.sliderBg} />
    <View style={styles.content}>
      <View style={styles.container1}>
        <Text style={styles.container1Text}>{item.name}</Text>
        <Ionicons name={item.icon} size={20} color={COLORS.white} />
      </View>
      <Text style={styles.amount}> {"\u20A6"}250,000.00</Text>
      {item && item.type ? (
        <View style={styles.accountInfo}>
          <Text style={styles.accountInfoText}>{item.type}</Text>
          <Text style={styles.accountInfoText2}>{item.number}</Text>
        </View>
      ) : (
        <Text style={styles.label}>TEB WELFARE ACCOUNT </Text>
      )}
    </View>
  </View>
);
      }

const styles = StyleSheet.create({
  sliderBg: {
    width: SIZES.width - 40,
    height: 180,
    marginLeft: 15,
    borderRadius: 10,
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  container1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    paddingVertical: 10,
  },
  container1Text: {
    color: COLORS.white,
    fontSize: 15,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    marginLeft: 30,
    paddingVertical: 10,
  },
  label: {
    color: COLORS.white,
    marginLeft: 30,
    marginTop: 50,
  },
  accountInfo: {
    color: COLORS.white,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accountInfoText: {
    color: COLORS.white,
    fontSize: 14,
  },
  accountInfoText2: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});
export default LoanHeader;
