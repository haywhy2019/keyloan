import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { images, COLORS, FONTS, GLOBAL_STYLE } from "../../../constants";
import {
  CustomButton,
  Input,
  SpinnerImage,
  CustomSnackBar,
} from "../../components";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { thousandOperator } from "../../../utilities/thousandOperator";

const Indemnity = ({ navigation }) => {
  const { accounts, DailyUtilizedLimit, dailytranslimit, bvn } = useSelector(
    (state) => state.auth.user
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <StatusBar style="light" />
      <View style={styles.backgroundImgContainer}>
        <ImageBackground source={images.headerImg} style={styles.backgroundImg}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerText2}>
                Increase your transaction limit{" "}
              </Text>
              <Text style={styles.headerText2}>with Indemnity</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.afterBgImage}>
        <View
          style={{
            marginTop: 10,
            marginBottom: 30,
            borderBottomWidth: 1,
            paddingBottom: 20,
            borderBottomColor: COLORS.grey,
          }}
        >
          <View style={[GLOBAL_STYLE.rowBetween, { marginBottom: 7 }]}>
            <View style={GLOBAL_STYLE.rowBetween}>
              <Text style={GLOBAL_STYLE.h4}>Daily Limit: </Text>
              <Text style={GLOBAL_STYLE.h4Bold}>
                ₦{thousandOperator(dailytranslimit)}
              </Text>
            </View>
            <View
              style={{
                width: 70,
                backgroundColor: COLORS.primaryBlue2,
                borderRadius: 10,
              }}
            >
              <Text
                style={[
                  GLOBAL_STYLE.h4Bold,
                  { color: "white", textAlign: "center" },
                ]}
              >
                Limit
              </Text>
            </View>
          </View>

          <View style={styles.showLimitContainer}></View>
          <View
            style={[styles.showAmountSpentContainer, { width: "5%" }]}
          ></View>

          <View style={GLOBAL_STYLE.rowBetween}>
            <Text style={GLOBAL_STYLE.h4Bold}> spent</Text>
            <Text style={[GLOBAL_STYLE.h4Bold, { color: COLORS.grey }]}>
              ₦{thousandOperator(dailytranslimit - DailyUtilizedLimit)}
            </Text>
          </View>
        </View>

        <Text
          style={[GLOBAL_STYLE.h3, { color: COLORS.grey, marginBottom: 15 }]}
        >
          Please Note That The Default Transaction Limit That You Can Increase
          With Your Transaction PIN is #5,000,000.00 ((Five Million Naira Only)
        </Text>
        <IconText text="No restrictions on transactions up to N5m" />
        <IconText text="Simple, instant and convenient" />
        <IconText text="Safe and secure" />

        <View>
          <Text style={GLOBAL_STYLE.h1Bold}>What you need:</Text>
          <InfoComponent
            header="Valid ID"
            text=" National ID/Permanent Voters ID/Driver's License/International
Passport"
          />
          <InfoComponent
            header="Valid ID"
            text=" National ID/Permanent Voters ID/Driver's License/International
Passport"
          />
        </View>
        <CustomButton
          buttonText="Next"
          onPress={() => navigation.navigate("TLimitIndemnity1")}
          buttonContainerStyle={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const IconText = ({ text, info }) => {
  return (
    <View
      style={[
        GLOBAL_STYLE.rowBetween,
        {
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: 15,
        },
      ]}
    >
      <Ionicons name="checkmark-circle" size={24} color={COLORS.primaryBlue} />
      <Text style={[GLOBAL_STYLE.h3, { marginLeft: 15 }]}>{text}</Text>
    </View>
  );
};

const InfoComponent = ({ header, text }) => {
  return (
    <View
      style={[
        GLOBAL_STYLE.rowBetween,
        {
          justifyContent: "flex-start",
          marginTop: 10,
          borderBottomWidth: 0.5,
          paddingBottom: 20,
          borderBottomColor: COLORS.primaryBlue2,
        },
      ]}
    >
      <FontAwesome5 name="address-card" size={24} color={COLORS.primaryBlue} />
      <View style={{ marginLeft: 15, paddingRight: 5 }}>
        <Text style={GLOBAL_STYLE.h1}>{header}</Text>
        <Text style={[GLOBAL_STYLE.h3, { color: COLORS.grey }]}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  showLimitContainer: {
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.grey,
  },
  showAmountSpentContainer: {
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.primaryBlue,
    marginTop: -5,
  },

  container1: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.white,
  },
  backgroundImg: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  headerContainer: {
    paddingHorizontal: "10%",
    paddingVertical: "5%",
    textAlign: "center",
  },
  headerText1: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginBottom: 20,
  },
  headerText2: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.normal,
  },
  backgroundImgContainer: {
    flex: 1,
  },
  afterBgImage: {
    flex: 3,
    paddingHorizontal: "8%",
    backgroundColor: COLORS.white,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  accountText: {
    color: COLORS.grey,
    fontFamily: FONTS.normal,
  },
  loginText: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
    marginLeft: 5,
  },
  button: {
    marginVertical: 30,
  },
});
export default Indemnity;
