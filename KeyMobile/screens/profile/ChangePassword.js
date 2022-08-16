import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  ScrollView,
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
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { changePasswordAction } from "../../../utilities/redux/keyMobile/axiosService/changePassword";
import { useDispatch } from "react-redux";
import uuid from "react-native-uuid";
import { logout } from "../../../utilities/redux/keyMobile/slice/authSlice";
import { Dialog } from "react-native-simple-dialogs";

const ChangePassword = ({ route, navigation }) => {
  const { user ,id} = route.params;
  
  const dispatch = useDispatch();
  const [secureInput, setSecureInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  if (loading) {
    return <SpinnerImage />;
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <StatusBar style="light" />
      <View style={styles.backgroundImgContainer}>
        <ImageBackground source={images.headerImg} style={styles.backgroundImg}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerText2}>Your new password must</Text>
              <Text style={styles.headerText2}>
                be different from your old password
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.afterBgImage}>
        <Formik
          initialValues={{
            otp: "",
            oldPassword: "",
            password: "",
            confirmPassword: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.otp) {
              errors.otp = "Required";
            }
            if (!values.oldPassword) {
              errors.oldPassword = "Required";
            }
            if (!values.password) {
              errors.password = "Required";
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = "Required";
            }
            if (values.password != values.confirmPassword) {
              errors.password = "password must be the same";
              errors.confirmPassword = "password must be the same";
            }
            return errors;
          }}
          onSubmit={(values) => {
          
            const payload = {
              source: "mobile",
              otp: values.otp,
              RequestID: id,
              username: user,
              Oldpassword: values.oldPassword,
              NewPassword: values.password,
            };
            Keyboard.dismiss();
            setLoading(true);
            changePasswordAction(payload)
              .then((res) => {
              
                if (res.data.ResponseCode == "00") {
                  setSuccess(res.data.ResponseMessage);
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                     
                      resolve()
                    },3000);
                  }).then(() =>  {setShowDialog(true)
                    setTimeout(() => dispatch(logout()), 4000);
                  })
                } else {
                  setError(res.data.ResponseMessage);
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
            values,
            errors,
            touched,
          }) => (
            <View style={{ marginTop: 20 }}>
              <Input
                label="Enter otp"
                placeholder="Enter otp"
                keyboardType="numeric"
                onChangeText={handleChange("otp")}
                onBlur={handleBlur("otp")}
                value={values.otp}
                error={errors.otp && touched.otp && errors.otp}
              />
              <Input
                label="Enter old password"
                placeholder="Enter old password"
                textContentType="newPassword"
                secureTextEntry={secureInput}
                onChangeText={handleChange("oldPassword")}
                onBlur={handleBlur("oldPassword")}
                value={values.oldPassword}
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
                error={
                  errors.oldPassword &&
                  touched.oldPassword &&
                  errors.oldPassword
                }
              />
              <Input
                label="Enter new password"
                placeholder="Enter new password"
                textContentType="newPassword"
                secureTextEntry={secureInput}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
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
                error={errors.password && touched.password && errors.password}
              />
              <Input
                label="confirm your new password"
                placeholder="confirm your new password"
                textContentType="newPassword"
                secureTextEntry={secureInput}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
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
                error={errors.password && touched.password && errors.password}
              />

              <CustomButton
                buttonText="Reset password"
                onPress={handleSubmit}
                buttonContainerStyle={styles.button}
              />
            </View>
          )}
        </Formik>
      </View>
      <CustomSnackBar
        show={success || error}
        success={success ? true : false}
        message={success || error}
      />
      <Dialog
        visible={showDialog}
        title={"Password Reset"}
        onTouchOutside={() => setShowDialog(false)}
      >
        <View>
          <Text style={GLOBAL_STYLE.h2}>{"You would be logged out. please login to continue"}</Text>
        </View>
      </Dialog>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  headerContainer: {
    paddingHorizontal: "10%",
    paddingVertical: "20%",
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
    justifyContent: "space-around",
    marginTop: -10,
    paddingHorizontal: "8%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
export default ChangePassword;
