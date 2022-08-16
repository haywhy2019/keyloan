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
  DropDownInput,
} from "../../components";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { tLimitPinAction } from "../../../utilities/redux/keyMobile/axiosService/changeTLimit";
import { useDispatch, useSelector } from "react-redux";
import { thousandOperator } from "../../../utilities/thousandOperator";
import uuid from "react-native-uuid";
import * as Yup from "yup";
import getUserHook from "../../../utilities/hooks/getUserHook";

const TLimitPin = ({ navigation }) => {
  const [user] = getUserHook();
  const [secureInput, setSecureInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  //   const[fieldValue, setFieldValue] = useState("")

  const { accounts, DailyUtilizedLimit, dailytranslimit, bvn ,transactionlimit} = useSelector(
    (state) => state.auth.user
  );


  const validationSchema = Yup.object().shape({
    account: Yup.number().required("Required"),
    singleLimit: Yup.number().required("Required"),
    dailyLimit: Yup.number().required("Required")
    .moreThan(Yup.ref("singleLimit"),"Cumulative limit must be greater than daily limit"),
    tPin: Yup.number().required("Required"),
  });
  if (loading) {
    return <SpinnerImage />;
  }
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
              <Text style={styles.headerText2}>with Transaction PIN</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.afterBgImage}>
        <View style={{ marginTop: 10, marginBottom: 30 }}>
          <View style={[GLOBAL_STYLE.rowBetween, { marginBottom: 7 }]}>
            <View style={GLOBAL_STYLE.rowBetween}>
              <Text style={GLOBAL_STYLE.h4}>Daily Limit: </Text>
              <Text style={GLOBAL_STYLE.h4Bold}>
                ₦{thousandOperator(transactionlimit)}
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

        <Formik
          initialValues={{
            account: "",
            singleLimit: "",
            dailyLimit: "",
            tPin: ""
           
          }}
          validationSchema={validationSchema}

          onSubmit={(values) => {
            const id = uuid.v4();
            const payload = {
              id: 0,
              accountno: values.account,
              SingleTransactionLimit: values.singleLimit,
              RequestID: id,
              username: user,
              cumulativeDailyLimit: values.dailyLimit,
              Tpin: values.tPin,
              "AuthType": "withpin"
            };
    
            Keyboard.dismiss();
            setLoading(true);
            tLimitPinAction(payload)
              .then((res) => {
                if (res.status == 200) {
                  if (res?.data?.ResponseCode == "00") {
                    setSuccess(res.data.ResponseMessage);
                    setTimeout(() => navigation.goBack(), 5000)
                  } else {
                    setError(res.data.ResponseMessage);
                  }
                } else {
                  setError(res.response.data.Message);
                }
              })
              .catch((err) => {
                setError(err.message || "An error occured");
              })
              .finally(() => setLoading(false));
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={{}}>
              <DropDownInput
              
                data={accounts}
                labelCustomStyle={styles.inputLabel}
                labelField="accountno"
                valueField="accountno"
                placeholder="Select account"
                value={values.account}
                onChange={(item) => setFieldValue("account", item.accountno)}
                error={errors.account}
                placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
              />
              <Input
               
                placeholder="Single Transaction Limit"
                keyboardType="numeric"
                onChangeText={handleChange("singleLimit")}
                onBlur={handleBlur("singleLimit")}
                value={values.singleLimit}
                error={
                  errors.singleLimit &&
                  touched.singleLimit &&
                  errors.singleLimit
                }
                placeholderTextColor={COLORS.primaryBlue}
              />
              <Input
               
                placeholder="Cumulative (Daily) Transaction Limit"
                onChangeText={handleChange("dailyLimit")}
                onBlur={handleBlur("dailyLimit")}
                keyboardType="numeric"
                value={values.dailyLimit}
                error={
                  errors.dailyLimit && touched.dailyLimit && errors.dailyLimit
                }
                placeholderTextColor={COLORS.primaryBlue}
              />
              <Input
                placeholder="Enter transaction pin"
                textContentType="newPassword"
                keyboardType="numeric"
                secureTextEntry={secureInput}
                onChangeText={handleChange("tPin")}
                onBlur={handleBlur("tPin")}
                value={values.tPin}
                icon={
                  secureInput ? (
                    <Ionicons
                      name="eye"
                      size={16}
                      color={COLORS.grey}
                      onPress={() => setSecureInput(!secureInput)}
                    />
                  ) : (
                    <Ionicons
                      name="eye-off"
                      size={16}
                      color={COLORS.grey}
                      onPress={() => setSecureInput(!secureInput)}
                    />
                  )
                }
                error={errors.tPin && touched.tPin && errors.tPin}
                placeholderTextColor={COLORS.primaryBlue}
              />

              <CustomButton
                buttonText="Submit"
                onPress={handleSubmit}
                buttonContainerStyle={styles.button}
              />

              <View style={{ marginBottom: 10 }}>
                <Text style={[GLOBAL_STYLE.h4, { color: COLORS.grey }]}>
                  Please Note That The Default Transaction Limit That You Can
                  Increase With Your Transaction PIN is #20,000.00 (Twenty
                  Thousand Naira Only)
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </View>

      <CustomSnackBar
        show={success || error}
        success={success ? true : false}
        message={success || error}
      />
    </ScrollView>
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
export default TLimitPin;
