import { View, Text, ActivityIndicator, StyleSheet, Modal } from "react-native";
import React from "react";
import { COLORS, FONTS, GLOBAL_STYLE } from "../../constants";
import { SuccessIcon } from "../../constants/icons";
import CustomButton from "./CustomButton";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

const BottomSummary = ({
  headerText,
  infoText,
  buttonText,
  navigation,
  screen,
  action,
}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.bottom}>
        <View style={styles.bottomContainer}>
          <View
            style={{
              ...GLOBAL_STYLE.rowBetween,
              ...{ width: "100%", paddingTop: 20, paddingBottom: 30 },
            }}
          >
            <Text style={GLOBAL_STYLE.h2Bold}>Confirm details</Text>
            <MaterialIcons name="cancel" size={24} color={COLORS.grey} />
          </View>
          <TextComponent label="Date" resp="  2022-03-29 05:17 PM" />
          <TextComponent label="Sender" resp="Olalekan Andrew" />
          <TextComponent label="Source Account" resp="101****477" />
          <TextComponent label="Amount" resp="₦1000.00" />
          <TextComponent label="Mobile Number" resp="08146525623" />

          <Text style={styles.header}>{headerText}</Text>
          <Text style={styles.infoText}>{infoText}</Text>
          <View style={{ width: "100%" }}>
            <CustomButton
              onPress={() => {
                navigation.replace(screen);
                dispatch(action());
              }}
              buttonText={buttonText}
              buttonTextStyle={styles.buttonText}
              buttonContainerStyle={styles.buttonContainer}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const TextComponent = ({ label, resp }) => (
  <View style={{ ...GLOBAL_STYLE.rowBetween, ...{ width: "100%" , marginBottom: 20} }}>
    <Text style={GLOBAL_STYLE.h2Bold}>{label}</Text>
    <Text
      style={{
        ...GLOBAL_STYLE.h3,
        ...{ color: COLORS.grey },
      }}
    >
      {resp}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "60%",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
  },
  bottomContainer: {
    position: 'relative',
    paddingHorizontal: "10%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  header: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.primaryBlue,
  },
  infoText: {
    color: "#979797",
    fontFamily: FONTS.normal,
    fontSize: 16,
    textAlign: "center",
  },
  buttonText: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
  },
  buttonContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.primaryBlue,
    marginBottom: 20
  },
});
export default BottomSummary;
