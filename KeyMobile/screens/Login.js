import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Modal,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as LocalAuthentication from "expo-local-authentication";
import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";
import {
  Input,
  Spinner,
  CustomSnackBar,
  SpinnerImage,
} from "../components/index";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { COLORS, images, FONTS, SIZES , GLOBAL_STYLE} from "../../constants";
import {
  KeyMobileLogoSVG,
  BeyondSvg,
  LoginAvatar,
  ZeroDataIcon,
} from "../../constants/icons";
import { loginAction } from "../../utilities/redux/keyMobile/actions/authAction";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getItem, setItem } from "../../utilities/asyncStorage";

let username;
let password;
let resultMessage;

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [fingerprintAvailable, setFingerprintAvailable] = useState(false);
  const [showFingerPrint, setShowFingerPrint] = useState(false);
  const [useFacial, setUseFacial] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [secureInput, setSecureInput] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [authResult, setAuthResult] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUsername] = useState("");

  const checkSupportedAuthentication = async () => {
    username = await getItem("username");
    password = await getItem("password");

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

    setShowFingerPrint(isEnrolled);
    if (types && types.length) {
      setFingerprintAvailable(
        types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
      );
      // setUseFacial(types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION))
    }
  };

  const authenticate = async () => {
    resultMessage = "";
    if (loading) {
      return;
    }

    setLoading(true);

    const results = await LocalAuthentication.authenticateAsync();
    setAuthResult(results);
    if (results.success) {
      if (username && password) {
        const payload = { username, password };
        setResult("SUCCESS");
        dispatch(loginAction(payload));
      } else {
        setResult("USER ERROR");
      }
    } else if (results.error === "unknown") {
      setResult("DISABLED");
    } else if (
      results.error === "user_cancel" ||
      results.error === "system_cancel" ||
      results.error === "app_cancel"
    ) {
      setResult("CANCELLED");
    } else if (results.error === "not_enrolled") {
      setResult("NOT AVAILABLE");
    } else {
      setResult("Error");
    }

    setLoading(false);
  };

  const loginLoading = useSelector((state) => state.auth.loading);
  const loginError = useSelector((state) => state.auth.error);

  let profileImg;
  const getProfileImage = async () => {
    profileImg = await getItem("profileImage");
    setProfilePic(profileImg);
  };
  const toggleRemeberMe = async () => {
    if (!checked) {
      setItem("rememberMe", "true");
      setChecked(true);
      setUsername(username);
      setRememberMe(true);
    } else {
      setItem("rememberMe", "false");
      setChecked(false);
      setUsername("");
      setRememberMe(false);
    }
  };
  const isRememberMe = async () => {
    const item = await getItem("rememberMe");
    if (item == "true") {
      setUsername(username);
      setRememberMe(true);
      setChecked(true);
    } else {
      setUsername("");
      setRememberMe(false);
      setChecked(false);
    }
    
  };
  useEffect(() => {
    checkSupportedAuthentication();
    getProfileImage();
    isRememberMe();
  }, [resultMessage, profileImg]);

  // let resultMessage;
  switch (result) {
    case "CANCELLED":
      resultMessage = "Authentication process has been cancelled";
      break;
    case "DISABLED":
      resultMessage = "Biometric authentication has been disabled";
      break;
    case "ERROR":
      resultMessage = "There was an error in authentication";
      break;
    case "NOT AVAILABLE":
      resultMessage =
        "Biometric authentication has not been set up on this device";
      break;
    case "SUCCESS":
      resultMessage = "Successfully authenticated";
      break;
    case "USER ERROR":
      resultMessage = "Login with username and password the first time";
      break;
    default:
      resultMessage = "";
      break;
  }

  let description;
  if (fingerprintAvailable) {
    description = "Authenticate with touch ID ";
  } else {
    description = "No biometric authentication methods available";
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      {/* <View > */}
      <StatusBar style="light" />
      <View style={styles.backgroundImgContainer}>
        <ImageBackground source={images.headerImg} style={styles.backgroundImg}>
          <View style={styles.container2}>
            <View style={styles.logoContainer}>
              <Ionicons
                name="menu"
                size={24}
                color="white"
                onPress={() => navigation.navigate("key mobile quicklinks")}
              />

              <ZeroDataIcon />
            </View>
            <View style={styles.beyondSvg}>
              <BeyondSvg />
              {profilePic ? (
                <Image
                  source={{ uri: `data:image/png;base64,${profilePic}` }}
                  style={styles.profileImage}
                />
              ) : (
                <LoginAvatar />
              )}
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.afterBgImage}>
        <Formik
          enableReinitialize={true}
          initialValues={{ username: userName, password: "", toggle: false }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Required";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={(values) => {
            Keyboard.dismiss(), dispatch(loginAction(values));
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
                placeholder="Username"
                textContentType="newPassword"
                icon={<AntDesign name="user" size={16} color={COLORS.grey} />}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                buttonContainerStyle={styles.input}
                error={errors.username && touched.username && errors.username}
              />

              <Input
                placeholder="Password"
                textContentType="newPassword"
                secureTextEntry={secureInput}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                autoCapitalize = 'none'
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

              <View style={styles.container3}>
                <Pressable style={styles.container4} onPress={toggleRemeberMe}>
                  <Checkbox
                    style={styles.checkbox}
                    value={checked}
                    // onValueChange={toggleRemeberMe}
                    color={checked ? COLORS.primaryBlue : undefined}
                  />
                  <Text style={GLOBAL_STYLE.h4}>Remember me</Text>
                </Pressable>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("key mobile reset password")
                  }
                >
                  <Text style={GLOBAL_STYLE.h4}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>
              {/* <View>
                      {resultMessage ? (
                        <Text style={styles.container6Text}>
                          {resultMessage}
                        </Text>
                      ) : null}
                    </View> */}
              {fingerprintAvailable && showFingerPrint ? (
                <View style={styles.container5}>
                  <View style={{ width: "100%" }}>
                    <CustomButton
                      buttonText="Login"
                      onPress={handleSubmit}
                      // onPress={() =>
                      //   onPress={handleSubmit}
                      //   chooseApp("keyMobile")
                      // }
                    />
                  </View>
                  <View style={styles.container6}>
                    <Ionicons
                      name="finger-print-sharp"
                      size={50}
                      color={COLORS.primaryBlue}
                      onPress={authenticate}
                    />
                  </View>
                </View>
              ) : (
                <View style={{ width: "100%", paddingTop: 60 }}>
                  <CustomButton
                    buttonText="Login"
                    onPress={handleSubmit}
                    buttonContainerStyle={styles.buttonLogin}
                    // onPress={() =>
                    //   onPress={handleSubmit}
                    //   chooseApp("keyMobile")
                    // }
                  />
                </View>
              )}
            </View>
          )}
        </Formik>
        <View>
          <CustomButton
            buttonContainerStyle={styles.buttonOutline}
            buttonText="Register"
            buttonTextStyle={styles.buttonText}
            // onPress={() => navigation.navigate("test")}
          />
          <Text style={styles.buttonInfo}>New Keymobile User? </Text>
          <CustomButton
            buttonContainerStyle={styles.buttonOutline}
            buttonText="Enroll"
            buttonTextStyle={styles.buttonText}
          />
          <Text style={styles.buttonInfo}>Don’t have an account?</Text>
        </View>
        {/* {loginLoading == "pending" &&  <SpinnerImage />} */}
      </View>

      <CustomSnackBar
      success
        show={resultMessage}
        message={resultMessage}
      />
         <CustomSnackBar
        show={loginError}
        message={loginError}
      />
      {/* </View> */}
      {loginLoading == "pending" && <SpinnerImage />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  backgroundImgContainer: {
    flex: 1,
    // height: 200
  },
  backgroundImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  beyondSvg: {
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  afterBgImage: {
    flex: 3,
    marginTop: -10,
    paddingHorizontal: "8%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.white,
  },
  container2: {
    paddingHorizontal: "8%",
    paddingVertical: 60,
  },
  logo: {
    // height: 40,
    // width: 40,
  },
  container2Text1: {
    marginTop: 40,
    fontSize: 20,
    color: COLORS.white,
    fontFamily: FONTS.normal,
  },
  container2Text2: {
    fontSize: 24,
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  container2Text3: {
    fontSize: 13,
    color: COLORS.grey,
    marginTop: 12,
    marginBottom: 30,
    fontFamily: FONTS.normal,
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container3Text: {
    color: "#002561",
    fontFamily: FONTS.bold,
    fontSize: 13,
  },
  container4: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 6,
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "#002561",
  },
  container5: {
    paddingTop: 60,
    paddingHorizontal: "8%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container6: {
    alignContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  container6Text: {
    paddingTop: 5,
    color: COLORS.danger,
    textAlign: "center",
    fontSize: 10,
    fontFamily: FONTS.normal,
  },
  input: {
    marginBottom: 10,
  },
  buttonLogin: {
    marginBottom: 5,
  },
  buttonOutline: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.primaryBlue,
    marginTop: 25,
  },
  buttonText: {
    color: COLORS.primaryBlue,
  },
  buttonInfo: {
    color: COLORS.grey,
    textAlign: "center",
    fontSize: 10,
    paddingTop: 5,
    fontFamily: FONTS.normal,
  },
});
