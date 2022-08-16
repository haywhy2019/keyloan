import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { images, COLORS , FONTS} from "../../../constants";
import { CustomButton, CustomSnackBar, Input, Spinner , SpinnerImage} from "../../components";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { sendOTPAction } from "../../../utilities/redux/keyMobile/actions/resetPasswordAction";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-native-uuid";


const ResetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("")
  const [id, setId] = useState("")
  const [resetErr, setResetErr] = useState("")

  const resetError = useSelector((state) => state.resetPasswordReducer.error);
  const resetLoading = useSelector(state => state.resetPasswordReducer.loading)
  const resetSuccess = useSelector(
    (state) => state.resetPasswordReducer.success
  );


  useEffect(() => {
    if(resetSuccess){
      navigation.navigate("key mobile change password",{username, id})
    }
  },[resetSuccess])
  
  return (
    <View style={styles.container1}>
      <StatusBar style="light" />
      <View style={styles.backgroundImgContainer}>
        <ImageBackground source={images.headerImg} style={styles.backgroundImg}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText1}>Forgot Password</Text>
            <View>
              <Text style={styles.headerText2}>Please enter your </Text>
              <Text style={styles.headerText2}>
                username or phone number for password reset
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.afterBgImage}>
        <Formik
          initialValues={{ username: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Required";
            }
            return errors;
          }}
          onSubmit={(values) => {
          const id = uuid.v4();
          values.id = id
           setUsername(values.username)
           setId(id)
          
            Keyboard.dismiss(), dispatch(sendOTPAction(values));
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
              <Input
                placeholder="Enter your username/number"
                icon={<AntDesign name="user" size={16} color={COLORS.grey} />}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                error={errors.username && touched.username && errors.username}
              />
              <CustomButton
                buttonText={"Reset Password"}
                onPress={handleSubmit}
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
      </View>
      {resetLoading == "pending" && <SpinnerImage />}
      <CustomSnackBar
        show={resetError}
        message={resetError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'white'
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
    fontSize: 30,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginBottom: 20,
  },
  headerText2: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.normal
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
  },
  accountText: {
    color: COLORS.grey,
    fontFamily: FONTS.normal
  },
  loginText: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
    marginLeft: 5,
  },
});
export default ResetPassword;
