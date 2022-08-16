import { StyleSheet, Dimensions, Platform } from "react-native";
import { FONTS ,SIZES} from "../constants";

// import {BACKGROUND, BTN_COLOR, PRIMARY_COLOR} from '../../constants/colors';
// import { FONT_REG } from '../../constants/fonts';
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: BACKGROUND,
  },
  overlay: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5,
    zIndex: 5,
    backgroundColor: "black",
  },
  container: {
    width: width,
    height: height,
  },
  bottomContainer: {
    height: Platform.OS == "android" ? 55 : 60,
    paddingHorizontal: 10,
    alignItems: "center",
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingBottom: Platform.OS == "android" ? 0 : 20,
  },
  loginMobileBtn: {
    backgroundColor: "#2488FF",
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    // marginHorizontal: width * 0.1,
    // marginHorizontal: 20,
    marginBottom: 10,
    //marginVertical: 5,
  },
  loginKeySwiftBtn: {
    width: "49%",
    backgroundColor: "#F2F2F2",
    minHeight: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
   
    // marginHorizontal: 5,
    marginBottom: 10,
    fontFamily: FONTS.bold,
  },
  loginInternetBankBtn: {
  
    borderWidth: 1.5,
    borderColor: "#F2F2F2",
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,

    marginHorizontal: 20,
    marginBottom: 10,
  
    fontFamily: FONTS.bold,
    fontWeight: "bold",
  },
  newAccountBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  btnMobileText: {
    fontSize: SIZES.responsiveHeight("2%"),
    fontFamily: FONTS.bold,
    // lineHeight: 15,
    color: "white",
  },
  btnKeySwiftText: {
    fontSize: SIZES.responsiveHeight("2%"),
    color: "#002561",
    fontFamily: FONTS.bold,
  },
  btnNewAccountText: {
    fontSize: SIZES.responsiveHeight("2%"),
    color: "white",
    marginLeft: 5,
    fontFamily: FONTS.bold,
  },

  btnText: {
    fontSize: 13,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 15,
    color: "#666565",
    // fontFamily:FONT_REG
  },
  bottomBtn: {
    // backgroundColor: BTN_COLOR,
    height: 36,
    borderRadius: 65,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "45%",
  },
  bottomBtnContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    // marginHorizontal: width * 0.1,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
  },
  socialIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    zIndex: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  socailIconsContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIconsBtn: {
    alignItems: "center",
    paddingHorizontal: 11,
  },
  socialIcons: {
    marginRight: 10,
    // width: 20,
    // height: 20,
  },
  iconText: {
    color: "#002561",
    fontFamily: FONTS.bold,
    fontSize: 13,
  },
  callOpenaccountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  openAcctBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 7,
  },
  contactUsBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 6,
  },
  openAcctContactUsIcons: {
    width: 25,
    height: 25,
  },
  openAcctContactUsText: {
    fontSize: 10,
    // color: PRIMARY_COLOR,
    paddingLeft: 6,
    // fontFamily:FONT_REG
  },
});
