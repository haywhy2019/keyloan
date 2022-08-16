import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SuccessIcon } from "../../../constants/icons";
import { COLORS, FONTS, GLOBAL_STYLE } from "../../../constants";
import { CustomButton } from "../../components";

const AccountSummary = () => {
  return (
    <View style={GLOBAL_STYLE.background}>
      <View style={GLOBAL_STYLE.columnAround}>
        <View style={styles.iconAndTextContainer}>
          <SuccessIcon />
          <Text style={[GLOBAL_STYLE.h3, styles.iconText]}>
            Account created successfully, Kindly find your account details below
          </Text>
        </View>
        <View>
          <View style={styles.margin}>
            <Text style={GLOBAL_STYLE.h2}>Account Details</Text>
            <View style={styles.dashedContainer}>
              <NameAndLabel
                label="Account Name:"
                resp="OLALEKAN BABATUNDE"
                bottom
              />
              <NameAndLabel label="Account Number:" resp="12094830209" bottom />
              <NameAndLabel label="Account Type:" resp="SAVINGS ACCOUNT" />
            </View>
          </View>
          <View style={styles.margin}>
            <Text style={GLOBAL_STYLE.h2}>Account Officer Details</Text>
            <View style={styles.dashedContainer}>
              <NameAndLabel label="Name:" resp="OLALEKAN BABATUNDE" bottom />
              <NameAndLabel label="Number:" resp="08034892890"  />
            </View>
          </View>
          <CustomButton buttonText="Finish"/>
        </View>
      </View>
    </View>
  );
};

const NameAndLabel = ({ label, resp, bottom }) => (
  <View>
    <View
      style={[
        GLOBAL_STYLE.rowBetween,
        bottom ? styles.bottomBorder : styles.noBottomBorder,
      ]}
    >
      <Text style={GLOBAL_STYLE.h3}>{label}</Text>
      <Text style={GLOBAL_STYLE.h3}>{resp} </Text>
    </View>
  </View>
);

export default AccountSummary;

const styles = StyleSheet.create({
  iconAndTextContainer: {
    alignItems: "center",
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderBottomColor: COLORS.primaryBlue,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  noBottomBorder: {
    borderBottomColor: COLORS.primaryBlue,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  iconText: {
    textAlign: "center",
    paddingHorizontal: 10,
  },
  dashedContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.primaryBlue,
    color: COLORS.primaryBlue,
    // marginVertical: 20,
  },
  margin: {
    marginBottom: '20%'
  }
});
