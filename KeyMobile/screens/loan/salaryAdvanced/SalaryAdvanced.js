import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import StepIndicator from "react-native-step-indicator";
import { Step1, Step2, Step3, Step4 } from "./forms";
import { COLORS } from "../../../../constants";
import { useSelector, useDispatch } from "react-redux";
import { loanErrReset } from "../../../../utilities/redux/keyMobile/slice/loanAccountDetailsSlice";
import {
  loanCreateErrReset,
  loanCreateSuccessReset,
} from "../../../../utilities/redux/keyMobile/slice/loanCreateSlice";
import { setItem, getItem } from "../../../../utilities/asyncStorage";
import {
  SpinnerImage,
  CustomButton,
  CustomSnackBar,
  BottomNotification,
} from "../../../components";
const SalaryAdvanced = ({ navigation }) => {
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(1);
  const [showErr, setShowErr] = useState(false);
  const [existingRequest, setExistingRequest] = useState("");
  const [docSuccess, setDocSuccess] = useState(false);
  const [loanSuccess, setLoanSuccess]  = useState(false);

  const nextPosition = () => {
    if (currentPosition > 0 && currentPosition < 4) {
      setCurrentPosition(currentPosition + 1);
    }
  };
  const prevPosition = () => {
    if (currentPosition > 1 && currentPosition <= 4) {
      setCurrentPosition(currentPosition - 1);
    }
  };
  const accountDetails = useSelector((state) => state.loan.success);

  const accountDetailsLoading = useSelector((state) => state.loan.loading);

  const accountDetailsErr = useSelector((state) => state.loan.error);
  const loanCreateSuccess = useSelector((state) => state.loanCreate.success);

  const loanCreatePending = useSelector((state) => state.loanCreate.loading);
  const loanCreateError = useSelector((state) => state.loanCreate.error);

  const getRequestTag = async () => {
    const item = await getItem("salaryLoan");
    setExistingRequest(item);
    if (item) {
      setCurrentPosition(4);
    }
  };
  useEffect(() => {
    if (accountDetailsErr) {
      setShowErr(true);
      setTimeout(() => {
        dispatch(loanErrReset());
        dispatch(loanCreateErrReset());
        setShowErr(false);
      }, 3000);
    }
    if (loanCreateSuccess.status == "00") {
      setLoanSuccess(true)
      setItem("salaryLoan", loanCreateSuccess.requesttag);
      setCurrentPosition(4);
    }
    getRequestTag();
  }, [accountDetailsErr, loanCreateSuccess]);

  useEffect(() => {
    if (
      loanCreateSuccess[0]?.status == "00" &&
      loanCreateSuccess[1].status == "00"
    ) {
      setDocSuccess(true);
      setTimeout(() => {
        navigation.replace("LoanDashBoard"), dispatch(loanCreateSuccessReset());
      }, 3000);
    }
  }, [loanCreateSuccess]);

  const submitHandler = () => {
    setLoanSuccess("")
    dispatch(loanCreateSuccessReset());
    setCurrentPosition(4);

  };

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
            stepCount={4}
          />
        </View>
        {currentPosition == 1 && (
          <Step1 next={nextPosition} prev={prevPosition} />
        )}

        {currentPosition == 2 && (
          <Step2 next={nextPosition} prev={prevPosition} />
        )}
        {currentPosition == 3 && (
          <Step3
            next={nextPosition}
            prev={prevPosition}
            navigation={navigation}
          />
        )}
        {currentPosition == 4 && (
          <Step4 navigation={navigation} tag={existingRequest} />
        )}
      </ScrollView>
      {(accountDetailsLoading == "pending" ||
        loanCreatePending == "pending") && <SpinnerImage />}
      <CustomSnackBar
        show={accountDetailsErr || loanCreateError}
        message={accountDetailsErr || loanCreateError}
      />

      <BottomNotification
        show={loanSuccess}
        headerText=" Application in Process"
        infoText="Please attach required documets to complete your registration"
        buttonText="Continue"
        onPress={submitHandler}
      />
      <CustomSnackBar
        show={docSuccess}
        success
        message={"Application Successful, Once approved, we’ll contact you"}
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

export default SalaryAdvanced;
