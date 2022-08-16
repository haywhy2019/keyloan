import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import StepIndicator from "react-native-step-indicator";
import { Step1, Step2, Step3, Step4 } from "./forms";
import { COLORS } from "../../../constants";
import { useSelector, useDispatch } from "react-redux";
import { getAllBranchAction } from "../../../utilities/redux/keyMobile/actions/allBranchActions";
import { getAccountTypeAction } from "../../../utilities/redux/keyMobile/actions/accountTypeAction";
import {
  SpinnerImage,
  CustomButton,
  CustomSnackBar,
} from "../../components";

import { Provider } from "./accountContext";

const AccountOpening = ({ navigation }) => {
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(1);
  const [showErr, setShowErr] = useState(false);
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

  const accountDetailsLoading = useSelector((state) => state.loan.loading);

  const accountDetailsErr = useSelector((state) => state.loan.error);

  const branchLoading = useSelector((state) => state.allBranch.loading);
  const accountTypeLoading = useSelector((state) => state.accountType.loading);
  const createNewAccountLoading = useSelector(
    (state) => state.createNewAccount.loading
  );
  const createNewAccountSuccess = useSelector(
    (state) => state.createNewAccount.success
  );
  const createNewAccountErr = useSelector(
    (state) => state.createNewAccount.error
  );


  useEffect(() => {
    dispatch(getAllBranchAction());
    dispatch(getAccountTypeAction());
    if(createNewAccountSuccess){
      setTimeout(() => navigation.goBack(), 3000)
    }
  }, []);

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
        <Provider>
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
            <Step4
              next={nextPosition}
              prev={prevPosition}
              navigation={navigation}
            />
          )}
        </Provider>
      </ScrollView>
      {(branchLoading == "pending" ||
        accountTypeLoading == "pending" ||
        createNewAccountLoading == "pending") && <SpinnerImage />}
      <CustomSnackBar show={showErr} message={accountDetailsErr} />
      <CustomSnackBar
        success={createNewAccountSuccess ? true : false}
        show={createNewAccountSuccess || createNewAccountErr}
        message={createNewAccountSuccess.ResponseDescription || createNewAccountErr}
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
    // paddingHorizontal: "5%",
    paddingVertical: 30,
  },
});

export default AccountOpening;
