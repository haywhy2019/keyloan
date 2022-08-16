import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { images, COLORS, FONTS, GLOBAL_STYLE } from "../../../constants";
import { CustomButton, Input, SpinnerImage, CustomSnackBar } from "../../components";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import {changePasswordAction} from "../../../utilities/redux/keyMobile/actions/resetPasswordAction"
import { useDispatch , useSelector} from "react-redux";
const ChangePassword = ({ route,navigation }) => {
  const dispatch = useDispatch()
  const [secureInput, setSecureInput] = useState(true);
  const { username, id} = route.params;
  const [success, setSuccess] = useState(true)


  const resetError = useSelector((state) => state.resetPasswordReducer.error);
  const resetLoading = useSelector(state => state.resetPasswordReducer.loading)
  const resetSuccess = useSelector(
    (state) => state.resetPasswordReducer.success
  );

  if(resetLoading == "pending"){
    return <SpinnerImage />
  }

  // useEffect(() => {
  //   if(resetSuccess && success){
  //     navigation.navigate("key mobile")
  //   }
  // },[resetSuccess])

  return (
      <ScrollView contentContainerStyle={[GLOBAL_STYLE.scrollViewGlobal, styles.removePadding]}>
      <StatusBar style="light" />
      <View style={styles.backgroundImgContainer}>
        <ImageBackground source={images.headerImg} style={styles.backgroundImg}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText1}>Create New Password</Text>
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
          initialValues={{otp: "", password: "", confirmPassword: "" , pin: ""}}
          validate={(values) => {
            const errors = {};
            // if(!values.username){
            //   errors.username = "Required"
            // }
            if(!values.pin){
              errors.pin = "Required"
            }
            if(!values.otp){
              errors.otp = "Required"
            }
            if (!values.password) {
              errors.password = "Required";
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = "Required";
            }
            if(values.password != values.confirmPassword){
              errors.password = "password must be the same"
              errors.confirmPassword = "password must be the same"
            }
            return errors;
          }}
          onSubmit={(values) => {
            values.username = username
            values.id = id
            Keyboard.dismiss()
            dispatch(changePasswordAction(values))

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
            <View>
                 {/* <Input 
              placeholder="username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              error={errors.username && touched.username && errors.username}
              /> */}
              <Input 
              placeholder="Enter received OTP"
              keyboardType="numeric"
              onChangeText={handleChange("otp")}
              onBlur={handleBlur("otp")}
              value={values.otp}
              error={errors.otp && touched.otp && errors.otp}
              />
                <Input 
              placeholder="Enter transfer pin"
              keyboardType="numeric"
              onChangeText={handleChange("pin")}
              onBlur={handleBlur("pin")}
              value={values.pin}
              error={errors.pin && touched.pin && errors.pin}
              />
              <Input
                placeholder="Enter your password"
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
                placeholder="confirm your password"
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

        <View style={styles.textContainer}>
          <Text style={styles.accountText}>Have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("key mobile");
            }}
          >
            <Text style={styles.loginText}>Login here</Text>
          </TouchableOpacity>
        </View>
        <CustomSnackBar 
        show={resetError || resetSuccess} 
        message={resetError || resetSuccess}
        success={resetSuccess ? true: false}
        />
      </View>
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  removePadding: {
   paddingHorizontal: 0
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
    flex: 2,
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
    marginBottom: 30
  
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
      marginTop: 30
  }
});
export default ChangePassword;
