import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import MenuThreeRows from "../../components/MenuThreeRows";
import {
  CableBillsIcon,
  TelIcon,
  InternetBillsIcon,
  GamingBillsIcon,
  DealerBillsIcon,
  ReligionBillsIcon,
  TransportBillsIcon,
  TravelBillsIcon,
  SchoolBillsIcon,
  BillBillsIcon,
  DangoteBillsIcon,
  EnquiresIcon,
  DisputeManagementIcon,
  MobileLimitIcon
} from "../../../constants/icons";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { GLOBAL_STYLE, COLORS, FONTS } from "../../../constants";

const SelfServiceMenu = ({navigation}) => {
  return (
    <ScrollView
      contentContainerStyle={[
        GLOBAL_STYLE.scrollViewGlobalNopadding,
        { justifyContent: "flex-start" },
      ]}
    >
      <MenuThreeRows
        firstIcon={<DisputeManagementIcon />}
        firstText={"Dispute Management"}
        secondIcon={<MobileLimitIcon />}
        secondText={"Mobile Banking Limit"}
        thirdIcon={
 <EnquiresIcon />
        }
        thirdText={"Enquiries & Complaints"}
        onPress1={() => navigation.navigate("DisputeManagementScreen")}
        onPress2={() =>  navigation.navigate("TLimitMenu")}
        onPress3={() =>  navigation.navigate("EnquiresMenu")}
      />
      {/* <MenuThreeRows
        firstIcon={<InternetBillsIcon />}
        firstText={"Internet Services"}
        secondIcon={<GamingBillsIcon />}
        secondText={"Betting & Gaming"}
        thirdIcon={<TransportBillsIcon />}
        thirdText={"Transport & Toll"}
        onPress1={() =>  navigation.navigate("BillPayment", {id: 9})}
        onPress2={() =>  navigation.navigate("BillPayment", {id: 2})}
        onPress3={() =>  navigation.navigate("BillPayment", {id: 16})}
      /> */}
      {/* <MenuThreeRows
        firstIcon={<DealerBillsIcon />}
        firstText={"Dealer Payment"}
        secondIcon={<ReligionBillsIcon />}
        secondText={"Religion"}
        thirdIcon={<TravelBillsIcon />}
        thirdText={"Travel & Hotel"}
        onPress1={() =>  navigation.navigate("ComingSoon")}
        onPress2={() =>  navigation.navigate("ComingSoon")}
        onPress3={() =>  navigation.navigate("BillPayment", {id: 15})}
      /> */}
      {/* <MenuThreeRows
        firstIcon={<SchoolBillsIcon />}
        firstText={"School & Association"}
        secondIcon={<BillBillsIcon />}
        secondText={"Bills Payment Beneficiary"}
        thirdIcon={
          <DangoteBillsIcon />
        }
        thirdText={"Dangote Payment"}
        onPress1={() =>  navigation.navigate("ComingSoon")}
        onPress2={() =>  navigation.navigate("ComingSoon")}
        onPress3={() =>  navigation.navigate("ComingSoon")}
      /> */}
    </ScrollView>
  );
};

export default SelfServiceMenu;

const styles = StyleSheet.create({
  iconBg: {
    width: 80,
    height: 80,
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
    paddingHorizontal: 5,
    fontSize: 10,
    fontFamily: FONTS.normal,
    textAlign: "center",
    marginTop: 10,
  },
});
