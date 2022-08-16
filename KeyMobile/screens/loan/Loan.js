import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React from "react";
import { CustomHeader } from "../../components";
import { isAndroid, COLORS, FONTS } from "../../../constants";
import {
  LoanLendindIcon,
  SalaryAdvanceIcon,
  FinancingIcon,
} from "../../../constants/icons";

const iconName = [
  { icon: <LoanLendindIcon />, label: "Micro Lending", screen: "MicroLending" },
  { icon: <SalaryAdvanceIcon />, label: "Salary Advance" , screen: "SalaryAdvance"},
  { icon: <FinancingIcon />, label: "Assest Financing", screen: "AssetFinancing"},
];
const Loan = ({ navigation }) => {
  const MenuIconCard = ({ item}) => (
    <Pressable
      style={styles.menuIconCard}
      onPress={() => navigation.replace(item.screen)}
    >
      <View>{item.icon}</View>

      <Text style={styles.menuText}>{item.label}</Text>
    </Pressable>
  );
  return (
    <View style={styles.mainContainer}>
      {/* <CustomHeader title={"Loan Options"} navigation={navigation}/> */}
      <View style={styles.menuContainer}>
        <FlatList
          data={iconName}
          renderItem={MenuIconCard}
          numColumns={4}
          keyExtractor={(item, index) => index}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  menuIconCard: {
    height: 80,
    width: 80,
    backgroundColor: "white",
    marginHorizontal: isAndroid ? 10 : 5,
    marginVertical: 10,
    elevation: 5,
    // borderWidth: isAndroid? 0 : 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    color: COLORS.primaryBlue,
    paddingHorizontal: 5,
    fontSize: 10,
    fontFamily: FONTS.normal,
    textAlign: "center",
    marginTop: 10,
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
export default Loan;
