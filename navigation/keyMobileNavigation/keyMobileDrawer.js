import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import KeyMobileTabsNavigator from "./keyMobileTab";
import KeyMobileStack from "./keyMobileStack";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, images, FONTS, isAndroid, SIZES} from "../../constants";
import {
  MenuIcon,
  NotifcationMesgIcon,
  SendMoneyDrawerIcon,
  SendMoneyPhoneDrawerIcon,
  RewardsDrawerIcon,
  DrawerIcon2,
  DrawerIcon3,
  MobileBankingLimitDrawerIcon,
  AccountSecurityDrawerIcon,
  LocateUsDrawerIcon,
} from "../../constants/icons";
import CustomDrawer from "../../KeyMobile/components/CustomDrawer";
import { useSelector } from "react-redux";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const KeyMobileDrawerNavigator = ({ navigation }) => {
  const Drawer = createDrawerNavigator();

  // const { CustomerName } = useSelector((state) => state.auth.user);
  // const splitName = CustomerName?.split(" ");
  // const userName = splitName[0]

  const userName = "Oluwa";

  const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    // console.log(routeName, "route name");
    switch (routeName) {
      case "Home":
        return `Hi ${userName} `;
      case "Transactions":
        return "Transactions";
      case "Enquiries":
        return "Enquiries";
      case "Profile":
        return "Profile";
      case "LoanScreen":
        return "Loan Option";
      case "MicroLending":
        return "Personal Details"
      case "SalaryAdvance":
        return "Personal Details"
      case "AssetFinancing":
          return "Personal Details"
      
    }
  };

  const getHeaderRight = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    switch (routeName) {
      case "Home":
        return (
          <View style={{ marginTop: 20, marginRight: 10 }}>
            <NotifcationMesgIcon
              height={40}
              color={isAndroid ? "white" : COLORS.primaryBlue}
            />
          </View>
        );
      default:
        return null;
    }
  };

  const getHeaderLeft = (route, navigation) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    switch (routeName) {
      case "Home":
        return (
          <TouchableOpacity onPress={() => {navigation.toggleDrawer()}}>
            <View style={{ marginTop: 20, paddingLeft: 10 }}>
              <MenuIcon
                height={40}
                color={isAndroid ? "white" : COLORS.primaryBlue}
              />
            </View>
          </TouchableOpacity>
        );
      default:
        return (
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="white" />
            <Text style={{color: "white"}}>Back</Text>
          </TouchableOpacity>
        );
    }
  };


  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={({ navigation, route }) => ({
        drawerActiveBackgroundColor: "white",
        drawerItemStyle: {
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.grey,
          padding: 0,
          marginLeft: 0,
          width: "100%",
        },
        drawerActiveTintColor: COLORS.primaryBlue,
        drawerInactiveTintColor: COLORS.primaryBlue,
        drawerLabelStyle: { marginLeft: -20, fontFamily: FONTS.normal },
        headerTitle: getHeaderTitle(route),
        headerTitleAlign: "center",
        headerShown: true,
        headerTitleStyle: {
          color: isAndroid ? "white" : COLORS.primaryBlue,
          fontFamily: FONTS.bold,
          marginTop: 7,
          // fontSize: SIZES.responsiveHeight("3%")
        },
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
   
      })}
    >
      <Drawer.Screen
        name="HomeStack"
        component={KeyMobileStack}
        options={({ navigation, route }) => ({
          drawerIcon: DrawerIcon3,

          drawerLabel: "Account",
          title: getHeaderTitle(route),
          headerTitleAlign: "center",
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
          headerRight: () => getHeaderRight(route, navigation),
          headerLeft: () => getHeaderLeft(route, navigation)
        })}
      />
      <Drawer.Screen
        name="sendMoneyToAccount"
        component={KeyMobileTabsNavigator}
        options={({ navigation }) => ({
          drawerIcon: SendMoneyDrawerIcon,
          headerTitleStyle: {
            color: isAndroid ? "white" : COLORS.primaryBlue,
            fontFamily: FONTS.bold,
          },
          // headerShown: true,
          drawerLabel: "Send Money To Account",
          // title: `Hi ${userName} 👋`,
          // headerTitleAlign: "center",
          // headerShown: true,
          // headerBackground: () => (
          //   <Image
          //     source={images.headerImg}
          //     style={{ width: "100%", height: "100%" }}
          //   />
          // ),
          // headerRight: () => (
          //   <View style={{ marginTop: 20, marginRight: "10%" }}>
          //     <NotifcationMesgIcon height={40}/>
          //   </View>
          // ),
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          //     <View style={{ marginTop: 20, marginLeft: "10%" }}>
          //       <MenuIcon height={40} />
          //     </View>
          //   </TouchableOpacity>
          // ),
        })}
      />
      <Drawer.Screen
        name="sendMoneyToPhone"
        component={KeyMobileTabsNavigator}
        options={({ navigation }) => ({
          drawerIcon: SendMoneyPhoneDrawerIcon,
          headerTitleStyle: {
            color: isAndroid ? "white" : COLORS.primaryBlue,
            fontFamily: FONTS.bold,
          },
          // headerShown: true,
          drawerLabel: "Send Money To Phone",
          // title: `Hi ${userName} 👋`,
          // headerTitleAlign: "center",
          // headerShown: true,
          // headerBackground: () => (
          //   <Image
          //     source={images.headerImg}
          //     style={{ width: "100%", height: "100%" }}
          //   />
          // ),
          // headerRight: () => (
          //   <View style={{ marginTop: 20, marginRight: "10%" }}>
          //     <NotifcationMesgIcon height={40}/>
          //   </View>
          // ),
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          //     <View style={{ marginTop: 20, marginLeft: "10%" }}>
          //       <MenuIcon height={40} />
          //     </View>
          //   </TouchableOpacity>
          // ),
        })}
      />
      <Drawer.Screen
        name="rewards"
        component={KeyMobileTabsNavigator}
        options={({ navigation }) => ({
          drawerIcon: RewardsDrawerIcon,
          headerTitleStyle: {
            color: isAndroid ? "white" : COLORS.primaryBlue,
            fontFamily: FONTS.bold,
          },
          // headerShown: true,
          drawerLabel: "Rewards",
          // title: `Hi ${userName} 👋`,
          // headerTitleAlign: "center",
          // headerShown: true,
          // headerBackground: () => (
          //   <Image
          //     source={images.headerImg}
          //     style={{ width: "100%", height: "100%" }}
          //   />
          // ),
          // headerRight: () => (
          //   <View style={{ marginTop: 20, marginRight: "10%" }}>
          //     <NotifcationMesgIcon height={40}/>
          //   </View>
          // ),
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          //     <View style={{ marginTop: 20, marginLeft: "10%" }}>
          //       <MenuIcon height={40} />
          //     </View>
          //   </TouchableOpacity>
          // ),
        })}
      />
      <Drawer.Screen
        name="referAFriend"
        component={KeyMobileTabsNavigator}
        options={({ navigation }) => ({
          drawerIcon: DrawerIcon2,
          headerTitleStyle: {
            color: isAndroid ? "white" : COLORS.primaryBlue,
          },
          // headerShown: true,
          drawerLabel: "Refer a Friend",
          // title: `Hi ${userName} 👋`,
          // headerTitleAlign: "center",
          // headerShown: true,
          // headerBackground: () => (
          //   <Image
          //     source={images.headerImg}
          //     style={{ width: "100%", height: "100%" }}
          //   />
          // ),
          // headerRight: () => (
          //   <View style={{ marginTop: 20, marginRight: "10%" }}>
          //     <NotifcationMesgIcon height={40}/>
          //   </View>
          // ),
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          //     <View style={{ marginTop: 20, marginLeft: "10%" }}>
          //       <MenuIcon height={40} />
          //     </View>
          //   </TouchableOpacity>
          // ),
        })}
      />
      <Drawer.Screen
        name="mobileBankingLimit"
        component={KeyMobileTabsNavigator}
        options={({ navigation }) => ({
          drawerIcon: MobileBankingLimitDrawerIcon,
          headerTitleStyle: {
            color: isAndroid ? "white" : COLORS.primaryBlue,
            fontFamily: FONTS.bold,
          },
          // headerShown: true,
          drawerLabel: "Mobile Banking Limits",
          // title: `Hi ${userName} 👋`,
          // headerTitleAlign: "center",
          // headerShown: true,
          // headerBackground: () => (
          //   <Image
          //     source={images.headerImg}
          //     style={{ width: "100%", height: "100%" }}
          //   />
          // ),
          // headerRight: () => (
          //   <View style={{ marginTop: 20, marginRight: "10%" }}>
          //     <NotifcationMesgIcon height={40}/>
          //   </View>
          // ),
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          //     <View style={{ marginTop: 20, marginLeft: "10%" }}>
          //       <MenuIcon height={40} />
          //     </View>
          //   </TouchableOpacity>
          // ),
        })}
      />
      <Drawer.Screen
        name="accountSecurity"
        component={KeyMobileTabsNavigator}
        options={({ navigation }) => ({
          drawerIcon: AccountSecurityDrawerIcon,
          headerTitleStyle: {
            color: isAndroid ? "white" : COLORS.primaryBlue,
            fontFamily: FONTS.bold,
          },
          // headerShown: true,
          drawerLabel: "Account Security",
          // title: `Hi ${userName} 👋`,
          // headerTitleAlign: "center",
          // headerShown: true,
          // headerBackground: () => (
          //   <Image
          //     source={images.headerImg}
          //     style={{ width: "100%", height: "100%" }}
          //   />
          // ),
          // headerRight: () => (
          //   <View style={{ marginTop: 20, marginRight: "10%" }}>
          //     <NotifcationMesgIcon height={40}/>
          //   </View>
          // ),
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          //     <View style={{ marginTop: 20, marginLeft: "10%" }}>
          //       <MenuIcon height={40} />
          //     </View>
          //   </TouchableOpacity>
          // ),
        })}
      />
      <Drawer.Screen
        name="locateUs"
        component={KeyMobileTabsNavigator}
        options={({ navigation }) => ({
          drawerIcon: LocateUsDrawerIcon,
          headerTitleStyle: {
            color: isAndroid ? "white" : COLORS.primaryBlue,
            fontFamily: FONTS.bold,
          },
          drawerLabel: "Locate Us",
          // title: `Hi ${userName} 👋`,
          // headerTitleAlign: "center",
          // headerShown: true,
          // headerBackground: () => (
          //   <Image
          //     source={images.headerImg}
          //     style={{ width: "100%", height: "100%" }}
          //   />
          // ),
          // headerRight: () => (
          //   <View style={{ marginTop: 20, marginRight: "10%" }}>
          //     <NotifcationMesgIcon height={40}/>
          //   </View>
          // ),
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          //     <View style={{ marginTop: 20, marginLeft: "10%" }}>
          //       <MenuIcon height={40} />
          //     </View>
          //   </TouchableOpacity>
          // ),
        })}
      />
      {/* <Drawer.Screen name="logOut" component={KeyMobileTabsNavigator} 
       options={({ navigation }) => ({
        drawerIcon:  () => ( <Entypo name="log-out" size={13} color={COLORS.primaryBlue} />),      
        headerTitleStyle: {
          color: isAndroid ? "white" : COLORS.primaryBlue,
        },
        drawerLabel: "Logout",
        // title: `Hi ${userName} 👋`,
        // headerTitleAlign: "center",
        // headerShown: true,
        headerBackground: () => (
          <Image
            source={images.headerImg}
            style={{ width: "100%", height: "100%" }}
          />
        ),
        headerRight: () => (
          <View style={{ marginTop: 20, marginRight: "10%" }}>
            <NotifcationMesgIcon height={40}/>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <View style={{ marginTop: 20, marginLeft: "10%" }}>
              <MenuIcon height={40} />
            </View>
          </TouchableOpacity>
        ),
      })}
      /> */}
    </Drawer.Navigator>
  );
};


export default KeyMobileDrawerNavigator;
