import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { images, COLORS,isAndroid } from "../../../constants";
import { CustomButton, Input, OtpTextInput } from "../../components";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const OtpScreen = ({ navigation }) => {
  const [otpArray, setOtpArray] = useState(["", "", "", ""]);
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);

 

  const refCallback = (textInputRef) => (node) => {
    textInputRef.current = node;
  };

  const onOtpChange = (index) => {
    return (value) => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== "") {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        }
      }
     
    };
  };
  const onOtpKeyPress = (index) => {
    
    return ({ nativeEvent: { key: value } }) => {

      // auto focus to previous InputText if value is blank and existing value is also blank
      // if (value === "Backspace" && otpArray[index] == "")
      if (value === "Backspace") {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
           secondTextInputRef.current.focus();
        } else if (index === 3) {
           thirdTextInputRef.current.focus();
        }

        /**
         * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
         * doing this thing for us
         * todo check this behaviour on ios
         */
    
        if (isAndroid && index > 0) {
         
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ""; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

 
  return (
    <View style={styles.container1}>
      <StatusBar style="light" />
      <View style={styles.backgroundImgContainer}>
        <ImageBackground source={images.headerImg} style={styles.backgroundImg}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText1}>OTP Verification</Text>
            <View>
              <Text style={styles.headerText2}>Please enter the OTP </Text>
              <Text style={styles.headerText2}>
                sent to your registered mobile number
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.afterBgImage}>
       
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {[
            firstTextInputRef,
            secondTextInputRef,
            thirdTextInputRef,
            fourthTextInputRef,
          ].map((textInputRef, index) => (
            <OtpTextInput
              value={otpArray[index]}
              onKeyPress={onOtpKeyPress(index)}
              onChangeText={onOtpChange(index)}
              keyboardType={"numeric"}
              maxLength={1}
              style={[styles.otpText]}
              autoFocus={index === 0 ? true : undefined}
              refCallback={refCallback(textInputRef)}
              key={index}
            />
          ))}
        </View>

        <CustomButton buttonText={"Submit"} onPress={() => {Keyboard.dismiss(),navigation.navigate("key mobile change password")}}  />
        <View style={styles.textContainer}>
          <Text style={styles.accountText}>Didnt receive OTP?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
          >
            <Text style={styles.loginText}>Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  headerText2: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 14,
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
  },
  loginText: {
    color: COLORS.primaryBlue,
    marginLeft: 5,
  },

  ////////
  container: {
    padding: 16,
    flex: 1,
  },
  submitButtonText: {
    // color: colors.WHITE,
  },
  otpResendButton: {
    alignItems: "center",
    width: "100%",
    marginTop: 16,
  },
  otpResendButtonText: {
    textTransform: "none",
    textDecorationLine: "underline",
  },
  otpText: {
    fontWeight: "bold",
    color: COLORS.primaryBlue,
    fontSize: 18,
    width: "100%",
  },
});

export default OtpScreen;
