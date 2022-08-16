import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { sendStatement } from "../../../../utilities/redux/keyMobile/axiosService/accountStatement";
import { GLOBAL_STYLE, COLORS } from "../../../../constants";
import {
  SpinnerImage,
  DatePicker,
  CustomButton,
  BottomNotification,
  CustomSnackBar,
} from "../../../components";
import { useSelector } from "react-redux";
import { Dialog } from "react-native-simple-dialogs";

const ThirdTab = () => {
  const [errors, setErrors] = useState({});
  const [showDialogue, setShowDialogue] = useState(false);
  const [showSuccessDialogue, setShowSuccessDialogue] = useState(false);

  const [loading, setLoading] = useState(false);
  const [startDateSment, setStartDateSment] = useState(new Date());
  const [showStartDateSment, setShowStartDateSment] = useState(false);
  const [endDateSment, setEndDateSment] = useState(new Date());
  const [showEndDateSment, setShowEndDateSment] = useState(false);
  const [startDateSPlaceHolder, setStartDateSPlaceholder] =
    useState("DD/MM/YYYY");
  const [endDateSPlaceHolder, setEndDateSPlaceholder] = useState("DD/MM/YYYY");

  const selectedAccount = useSelector(
    (state) => state.selectedAccount.accountDetails.accountno
  );
  const submitHandlerStatement = () => {
    if (startDateSPlaceHolder) {
      return setErrors({ startDateSment: "This field is required" });
    }
    if (endDateSPlaceHolder) {
      return setErrors({ endDateSment: "This field is required" });
    }

    setErrors({});

    const payload = {
      startdate: startDateSment,
      enddate: endDateSment,
      accountno: selectedAccount,
    };
    setLoading(true);
    sendStatement(payload)
      .then((res) => {
        if ((res.data.status = "00")) {
          setShowSuccessDialogue(true);
        } else {
          setLoading(false);
          setShowDialogue(true);
        }
      })
      .catch((err) => {

        setShowDialogue(true);
      })
      .finally(() => setLoading(false));
  };
  if (loading) {
    return <SpinnerImage bgColor={"white"} />;
  }
  return (
    <View
      style={{
        marginTop: 40,
        flexDirection: "column",
        // justifyContent: "space-evenly",
        flex: 1,
      }}
    >
      <View>
        <Pressable onPress={() => setShowStartDateSment(true)}>
          <DatePicker
            inputLabel="Enter Start Date"
            placeholder={startDateSPlaceHolder}
            show={showStartDateSment}
            value={startDateSment}
            onChange={(event, date) => {
              setShowStartDateSment(false);
              setStartDateSPlaceholder(false);
              setStartDateSment(date);
            }}
            error={errors.startDateSment}
          />
        </Pressable>

        <Pressable
          onPress={() => setShowEndDateSment(true)}
          style={{ marginVertical: 20 }}
        >
          <DatePicker
            inputLabel="Enter End Date"
            placeholder={endDateSPlaceHolder}
            show={showEndDateSment}
            value={endDateSment}
            onChange={(event, date) => {
              setShowEndDateSment(false);
              setEndDateSment(date);
              setEndDateSPlaceholder(false);
            }}
            error={errors.endDateSment}
          />
        </Pressable>
      </View>
      <CustomSnackBar
        show={showDialogue || showSuccessDialogue}
        success={showSuccessDialogue ? true : false}
        message={
          showSuccessDialogue
            ? "Please check your registered email address for your requested statement"
            : "An error occured, kindly contact our customer service representative"
        }
        customStyle={{ top: 0 }}
      />
      <CustomButton
        buttonText={"Download Transaction"}
        onPress={submitHandlerStatement}
      />
    </View>
  );
};

export default ThirdTab;

const styles = StyleSheet.create({});
