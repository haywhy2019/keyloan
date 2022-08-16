import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  SafeAreaView,
  BackHandler,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  COLORS,
  FONTS,
  isAndroid,
  isIOS,
  SIZES,
  GLOBAL_STYLE,
} from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { setItem, getItem } from "../../utilities/asyncStorage";
import {
  HomeSendIcon,
  TelIcon,
  HomeHomeIcon,
  LoanIcon,
  SelfServiceIcon,
  DepositIcon,
  ExpenseIcon,
  BankIcon,
  EnquiresIcon,
  CardIcon,
  LifeStyleIcon,
  ScanIcon,
  WarningIcon,
  ArrowRight,
  InsuranceIcon,
  RewardIcon,
} from "../../constants/icons";

import { CustomButton, AccountCard } from "../components";
import { transactionAction } from "../../utilities/redux/keyMobile/actions/transactionAction";
import { userImageSuccess } from "../../utilities/redux/keyMobile/slice/userImageSlice";
import { accountBalanceSuccess } from "../../utilities/redux/keyMobile/slice/accountBalanceSlice";
import { logout } from "../../utilities/redux/keyMobile/slice/authSlice";
const iconName = [
  { icon: <HomeSendIcon />, label: "Send Money", screen: "SendMoneyScreen" },
  { icon: <TelIcon />, label: "Buy Airtime/Data", screen: "MobileTopUpScreen" },
  { icon: <HomeHomeIcon />, label: "Pay Bills", screen: "BillMenu" },
  { icon: <ScanIcon />, label: "NQR payment", screen: "ComingSoon" },
  { icon: <LoanIcon />, label: "Loans", screen: "loanOnBoard" },
  {
    icon: <DepositIcon />,
    label: "Fixed Deposit/Investment",
    screen: "ComingSoon",
  },
  // { icon: <InsuranceIcon />, label: "Insurance", screen: "ComingSoon" },
  // { icon: <ExpenseIcon />, label: "Wealth Management", screen: "ComingSoon" },
  { icon: <SelfServiceIcon />, label: "Self Service", screen: "SelfService" },
  { icon: <CardIcon />, label: "Cardless Service", screen: "ComingSoon" },
  { icon: <RewardIcon />, label: "My Rewards/Referals", screen: "ComingSoon" },
  // { icon: <LifeStyleIcon />, label: "Lifestyle", screen: "ComingSoon" },
];

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );

    return () => backHandler.remove();
  }, []);

  const handleBackButton = React.useCallback(() => {
    if (navigation.isFocused()) {
      Alert.alert(
        "Exit From KeyMobile",
        "Do you want to Exit From KeyMobile?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel"),
            style: "cancel",
          },
          //  {text: 'OK', onPress: () => RNExitApp.exitApp()},
          {
            text: "OK",
            onPress: () => {
              dispatch(logout());
              BackHandler.exitApp();
            },
          },
        ],
        {
          cancelable: false,
        }
      );

      return true;
    }
  }, []);

  const customerDetails = useSelector((state) => state.auth.user);
  const { CustomerName } = useSelector((state) => state.auth.user);
  const splitName = CustomerName?.split(" ");
  const userName = splitName[0];

  const profileImage = useSelector((state) => state.auth.user.ProfilePix);

  const getUserName = async () => {
    const item = await getItem("username");
    setUser(item);
  };

  const saveProfileImage = async () => {
    await setItem("profileImage", profileImage);

    dispatch(userImageSuccess(profileImage));
  };

  const MenuIconCard = ({ item }) => (
    <Pressable
      style={styles.MenuIconCard}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={styles.menuIconText}>
        <View>{item.icon}</View>

        <Text
          style={[
            GLOBAL_STYLE.h5,
            {
              textAlign: "center",
              marginTop: SIZES.responsiveHeight("1%"),
              paddingHorizontal: SIZES.responsiveWidth("2%"),
            },
          ]}
        >
          {item.label}
        </Text>
      </View>
    </Pressable>
  );

  const transactionPayload = {
    username: user,
    pageNumber: 1,
    pageSize: 10,
  };

  useEffect(() => {
    saveProfileImage();
    getUserName();
    if (user) {
      dispatch(transactionAction(transactionPayload));
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginVertical: 10 }}>
          <AccountCard data={customerDetails.accounts} />
        </View>

        <View
          style={{
            // marginVertical: 10,
            flexDirection: "column",
            justifyContent: "space-between",

            flexGrow: 1,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              flexGrow: 1,
            }}
          >
            <View>
              {/* <Text style={styles.heading}>Top Operations</Text> */}
              <View style={styles.menuContainer}>
                <FlatList
                  data={iconName}
                  renderItem={MenuIconCard}
                  // numColumns={SIZES.width < 350 ? 3 : 4}
                  numColumns={3}
                  keyExtractor={(item, index) => index}
                  showsHorizontalScrollIndicator={false}
                  scrollEnabled={false}
                />
              </View>
            </View>
            {/* <View>
            <CustomButton
              buttonText="Expand"
              icon={
                <Entypo
                  name="chevron-down"
                  size={24}
                  color={COLORS.primaryBlue}
                />
              }
              buttonContainerStyle={styles.buttonContainerStyle}
              buttonTextStyle={{ color: COLORS.primaryBlue }}
            />
          </View> */}
            <View style={styles.noticeCard}>
              <View style={styles.noticeCardHeading}>
                <WarningIcon color={COLORS.primaryBlue} />
                <Text style={[GLOBAL_STYLE.h2,{ marginLeft: "10%",}]}>
                  CHANNELS RESTORED
                </Text>
                <View style={styles.noticeCardHeadingIcon}>
                  <ArrowRight color={COLORS.primaryBlue} />
                </View>
              </View>
              <Text style={[GLOBAL_STYLE.h4,{ paddingHorizontal: 14,
    fontSize: 12,
    paddingBottom: 20,}]}>
                You can now carry out transactions seamlessly on our E-channels
                (Mobile App, USSD and Internet Banking). We apologize for any
                inconvenience experienced.....Read more
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  indicator: {
    backgroundColor: COLORS.grey,
    height: 7,
    width: 7,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  indicator2: {
    backgroundColor: COLORS.primaryBlue,
    height: 7,
    width: 7,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  MenuIconCard: {
    height: SIZES.width / 4,
    width: SIZES.width / 4,
    marginHorizontal: isAndroid ? 3 : 5,
    marginVertical: 6,
    elevation: 5,
    // borderWidth: isAndroid ? 0 : 5,
    backgroundColor: "white",
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  menuIconText: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: "5%",
  },
  heading: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    paddingLeft: "6%",
    paddingVertical: 10,
  },
  noticeCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 5,
    borderTopWidth: 1,
    borderTopColor: COLORS.grey,
  },
  noticeCardHeading: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: "center",
  },
  noticeCardHeadingText: {
    color: COLORS.primaryBlue,
    marginLeft: "10%",
    fontFamily: FONTS.normal,
  },
  noticeCardHeadingIcon: {
    marginLeft: "auto",
  },
  // noticeCardText: {
  //   color: COLORS.primaryBlue,
  //   paddingHorizontal: 14,
  //   fontSize: 12,
  //   paddingBottom: 20,
  //   fontFamily: FONTS.normal,
  // },
  buttonContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.primaryBlue,
    height: 40,
    marginTop: 10,
    marginHorizontal: 20,
  },
});

export default Home;
