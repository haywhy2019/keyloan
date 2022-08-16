import React, {useEffect} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Home from "../../KeyMobile/screens/Home";
import Transaction from "../../KeyMobile/screens/Transactions/Transactions";
import {EnquiresMenu} from "../../KeyMobile/screens/enquires";
import {Profile} from "../../KeyMobile/screens/profile";
import {
  BankIcon,
  HistoryIcon,
  EnquiresIcon,
  AvatarIcon,
  NotifcationMesgIcon,
  MenuIcon,
} from "../../constants/icons";
import { COLORS, images, isAndroid, FONTS, SIZES } from "../../constants";
import { transactionAction } from "../../utilities/redux/keyMobile/actions/transactionAction";

const Tab = createBottomTabNavigator();

function KeyMobileTabsNavigator({ navigation }) {
  
  const { CustomerName } = useSelector((state) => state.auth.user);
  const splitName = CustomerName?.split(" ");
  const userName = splitName[0];

  // const userName = "Oluwa";

  const screenOptions = (route, color, focused) => {
    let iconName;

    switch (route.name) {
      case "HomeTab":
        iconName = (
          <BankIcon
            color={focused ? COLORS.primaryBlue : COLORS.secondaryBlue3}
          />
        );
        break;
      case "TransactionsTab":
        iconName = (
          <HistoryIcon
            color={focused ? COLORS.primaryBlue : COLORS.secondaryBlue3}
          />
        );
        break;
      case "EnquiriesTab":
        // color="#77869E"
        iconName = (
          <EnquiresIcon
            color={focused ? COLORS.primaryBlue : COLORS.secondaryBlue3}
          />
        );
        break;
      case "ProfileTab":
        iconName = (
          <AvatarIcon
            color={focused ? COLORS.primaryBlue : COLORS.secondaryBlue3}
          />
        );
        break;
      default:
        break;
    }

    return iconName;
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        headerTitleAlign: "center",
        tabBarActiveTintColor: COLORS.primaryBlue,
        tabBarInactiveTintColor: COLORS.secondaryBlue3,
        headerTitleStyle: {
          color: isAndroid ? "white" : COLORS.primaryBlue,
          fontFamily: FONTS.bold,
          marginTop: 7,
          fontSize: SIZES.responsiveHeight('3%')
        },
      
        tabBarIcon: ({ color, focused }) =>
          screenOptions(route, color, focused),
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
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <View style={{ marginTop: 20, paddingLeft: 10 }}>
              <MenuIcon
                height={40}
                color={isAndroid ? "white" : COLORS.primaryBlue}
              />
            </View>
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: "Home",
          title: `Hi ${userName} `,
          headerRight: () => (
            <View style={{ marginTop: 20, marginRight: 10 }}>
              <NotifcationMesgIcon
                height={40}
                color={isAndroid ? "white" : COLORS.primaryBlue}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TransactionsTab"
        component={Transaction}
        options={{ tabBarLabel: "Transactions", title: "Transactions",
        unmountOnBlur: true
      }}
      />
      <Tab.Screen
        name="EnquiriesTab"
        component={EnquiresMenu}
        options={{ tabBarLabel: "Enquiries", title: "Enquiries" }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{ tabBarLabel: "Profile", title: "Profile" }}
      />
      
    </Tab.Navigator>
  );
}

export default KeyMobileTabsNavigator;
