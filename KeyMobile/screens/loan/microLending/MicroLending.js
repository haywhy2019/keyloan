import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../../../constants";
import {
  SpinnerImage,
  CustomButton,
  CustomSnackBar,
  BottomNotification,
} from "../../../components";
import StepIndicator from "react-native-step-indicator";
import { Step1, Step2, Step3 } from "./forms";
import { useSelector, useDispatch } from "react-redux";
import { loanErrReset } from "../../../../utilities/redux/keyMobile/slice/loanAccountDetailsSlice";
import {
  loanCreateErrReset,
  loanCreateSuccessReset,
} from "../../../../utilities/redux/keyMobile/slice/loanCreateSlice";

const MoneyLending = ({ navigation }) => {
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(1);
  const [showErr, setShowErr] = useState(false);
  const nextPosition = () => {
    if (currentPosition > 0 && currentPosition < 3) {
      setCurrentPosition(currentPosition + 1);
    }
  };

  const prevPosition = () => {
    if (currentPosition > 1 && currentPosition <= 3) {
      setCurrentPosition(currentPosition - 1);
    }
  };

  const accountDetailsLoading = useSelector((state) => state.loan.loading);

  const loanCreateSuccess = useSelector((state) => state.loanCreate.success);

  const loanCreatePending = useSelector((state) => state.loanCreate.loading);
  const loanCreateError = useSelector((state) => state.loanCreate.error);

  const accountDetailsErr = useSelector((state) => state.loan.error);
  useEffect(() => {
    if (accountDetailsErr) {
      setShowErr(true);
      setTimeout(() => {
        dispatch(loanErrReset());
        dispatch(loanCreateErrReset());
      }, 3000);
    }
  }, [accountDetailsErr]);

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: COLORS.primaryBlue,
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: COLORS.primaryBlue,
    stepStrokeUnFinishedColor: COLORS.primaryBlue,
    separatorFinishedColor: COLORS.primaryBlue,
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: COLORS.primaryBlue,
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#aaaaaa",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#aaaaaa",
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainPadding}>
        <View style={styles.indicator}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            stepCount={3}
          />
        </View>
        {currentPosition == 1 && (
          <Step1 next={nextPosition} prev={prevPosition} />
        )}
        {currentPosition == 2 && (
          <Step2 next={nextPosition} prev={prevPosition} />
        )}
        {currentPosition == 3 && (
          <Step3 next={nextPosition} prev={prevPosition} />
        )}
      </ScrollView>
      {(accountDetailsLoading == "pending" ||
        loanCreatePending == "pending") && <SpinnerImage />}
      <CustomSnackBar
        show={accountDetailsErr || loanCreateError}
        message={accountDetailsErr || loanCreateError}
      />

      <BottomNotification
        show={loanCreateSuccess?.status == "00"}
        headerText=" Application in Process"
        infoText="  Once approved, we’ll contact you shortly and deposit your loan into your Keystone Account. Thank you!"
        buttonText="Continue"
        onPress={() => {
          navigation.replace("LoanDashBoard"),
            dispatch(loanCreateSuccessReset());
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainPadding: {
    paddingHorizontal: "5%",
  },
  indicator: {
    paddingHorizontal: "10%",
    paddingVertical: 30,
  },
});

export default MoneyLending;
