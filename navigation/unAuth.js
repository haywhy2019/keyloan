import * as React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import SplashScreen from "../splashScreen/splashScreen";
import KeyMobileSignIn from "../KeyMobile/screens/Login";
import keyMobileQuickLinks from "../KeyMobile/screens/QuickLinks";
import AccountOpening from "../KeyMobile/screens/accountOpening/AccountOpening";
import AccountSummary from "../KeyMobile/screens/accountOpening/AccountSummary";
import {
  keyMobileResetPassword,
  keyMobileOtp,
  keyMobileResetSuccess,
  keyMobileChangePassword,
} from "../KeyMobile/screens/forgotPassword/index";

import { Profile } from "../KeyMobile/screens/profile";




import { isAndroid, images, COLORS, FONTS } from "../constants";

const Stack = createNativeStackNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const UnAuthScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="splashScreen"
      screenOptions={({ navigation }) => ({
        transitionSpec: {
              open: config,
              close: config,
            },
            animation: "slide_from_right",
        headerTitleAlign: "center",
               headerTitleStyle: {
          color: isAndroid ? "white" : COLORS.primaryBlue,
          fontFamily: FONTS.bold,
        },
        headerShown: false,
        headerBackground: () => {
          if (isAndroid) {
            return (
              <Image
                source={images.headerImg}
                style={{ width: "100%", height: "100%" }}
              />
            );
          }
        },
        headerLeft: () => (
          <Pressable style={{  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={24} color={isAndroid ? COLORS.white : COLORS.primaryBlue} />
            <Text style={{color:isAndroid ? COLORS.white : COLORS.primaryBlue}}>Back</Text>
          </Pressable>
        ),
      })}
    >
      <Stack.Screen
        name="splashScreen"
        component={SplashScreen}
        options={{ headerShown: false , headerBackground: null}}
      />

  
      <Stack.Screen
        name="key mobile"
        component={KeyMobileSignIn}
        options={{ headerShown: false , headerBackground: null}}
      />
        <Stack.Screen
        name="account opening"
        component={AccountOpening}
        options={{
          title:"Account opening",
          headerShown: true
        }}
      
      />
          <Stack.Screen
        name="account summary"
        component={AccountSummary}
        options={{
          title:"Account summary",
          headerShown: true
        }}
      
      />
      <Stack.Screen
        name="key mobile reset password"
        component={keyMobileResetPassword}
        options={{ headerShown: false , headerBackground: null}}
      />
      <Stack.Screen
        name="key mobile password otp"
        component={keyMobileOtp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="key mobile reset successful"
        component={keyMobileResetSuccess}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="key mobile change password"
        component={keyMobileChangePassword}
        options={{ headerShown: false , headerBackground: null}}
      />
      <Stack.Screen
        name="key mobile quicklinks"
        component={keyMobileQuickLinks}
        options={{
          title: "Quick Link",
          headerShown: true
        }}

      
      />
       <Stack.Screen
        name="test"
        component={Profile}
        options={{
          title: "test",
          headerShown: true
        }}

      
      />
    </Stack.Navigator>
  );
};

export default UnAuthScreen;
