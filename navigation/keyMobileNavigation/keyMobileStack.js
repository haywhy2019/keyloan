import React from "react";
import {Image, Text, TouchableOpacity} from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { isAndroid, images, FONTS, COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import Loan from "../../KeyMobile/screens/loan/Loan";
import HomeTabs from "./keyMobileTab"
import SendMoney from "../../KeyMobile/screens/SendMoney";
import MicroLending from "../../KeyMobile/screens/loan/microLending/MicroLending";
import LoanDashboard from "../../KeyMobile/screens/loan/Dashboard"
import LoanOnBoarding from "../../KeyMobile/screens/loan/LoanOnBoarding";
import SalaryAdvance from "../../KeyMobile/screens/loan/salaryAdvanced/SalaryAdvanced";
import AssetFinancing from "../../KeyMobile/screens/loan/assetFinacing/AssetFinancing";
import { Feedback , Enquires, Complaints, DisputeManagement,Request, EnquiresMenu} from "../../KeyMobile/screens/enquires";
import { LimitCard, LimitPin, LimitToken, LimitIndemnity, LimitMenu, LimitIndemnity1, LimitIndemnity2, LimitIndemnity3 } from "../../KeyMobile/screens/TransactionLimit";
import { ChangePassword , ChangePin} from "../../KeyMobile/screens/profile";
import { BillMenu , BillsPayment} from "../../KeyMobile/screens/bills";
import SelfServiceMenu from "../../KeyMobile/screens/selfService/SelfMenu";
import MobileTopUp from "../../KeyMobile/screens/mobileTopUp/MobileTopUp";
import ComingSoon from "../../KeyMobile/screens/ComingSoon";
const Stack = createNativeStackNavigator();

const KeyMobileStack = ({}) => {
  return (
    <Stack.Navigator
    initialRouteName="Home"
    screenOptions={({navigation}) => ({
      headerShown: true,
      animation: "slide_from_right",
      headerTitleStyle: {
        color: isAndroid ? "white" : COLORS.primaryBlue,
        fontFamily: FONTS.bold,
        marginTop: 7,
        fontSize: SIZES.responsiveHeight("3%")
      },
      headerTitleAlign: "center",
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
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
         onPress={() => navigation.goBack()}
         >
        <Ionicons name="chevron-back" size={20} color={isAndroid ? COLORS.white : COLORS.primaryBlue} />
        <Text style={{color: isAndroid ? COLORS.white : COLORS.primaryBlue}}>Back</Text>
      </TouchableOpacity>
      )
      
    })}
    >
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{headerShown: false, headerBackground: null}}
       
      />
            <Stack.Screen name="SendMoneyScreen" component={SendMoney} options={{title: "Send Money"}}/>
            <Stack.Screen name="MobileTopUpScreen" component={MobileTopUp} options={{title: "Top up"}}/>
      <Stack.Screen name="LoanScreen" component={Loan} options={{title: "Loan Options"}}/>
      <Stack.Screen name="MicroLending" component={MicroLending} options={{title: "Micro Lending"}}/>
      <Stack.Screen name="LoanDashBoard" component={LoanDashboard} options={{title: "Loan Dashboard"}}/>
      <Stack.Screen name="SalaryAdvance" component={SalaryAdvance} options={{title: "Salary Advanced"}}/>
      <Stack.Screen name="AssetFinancing" component={AssetFinancing} options={{title: "Asset Financing"}}/>
      <Stack.Screen name="sendMoneyScreen" component={SendMoney} />
      <Stack.Screen name="loanDashBoard" component={LoanDashboard} />

      <Stack.Screen name="loanOnBoard" component={LoanOnBoarding} options={{title: "Loans"}}/>
      <Stack.Screen name="FeedbackScreen" component={Feedback} options={{title: "FeedBack"}} />
      <Stack.Screen name="ComplaintsScreen" component={Complaints} options={{title: "Complaints"}}/>
      <Stack.Screen name="EnquiresMenu" component={EnquiresMenu} options={{title: "Enquiries"}}/>
      <Stack.Screen name="EnquiresScreen" component={Enquires} options={{title: "Enquiries"}}/>
      <Stack.Screen name="DisputeManagementScreen" component={DisputeManagement} options={{title: "Dispute Management"}}/>
      <Stack.Screen name="RequestScreen" component={Request} options={{title: "Request"}}/>
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{title: "Change Passsword"}}/>
      <Stack.Screen name="ChangePin" component={ChangePin} options={{title: "Change Pin"}}/>
      <Stack.Screen name="ComingSoon" component={ComingSoon} options={{title: "Coming Soon"}}/>
      <Stack.Screen name="TLimitPin" component={LimitPin} options={{title: "Change Limit"}}/>
      <Stack.Screen name="TLimitCard" component={LimitCard} options={{title: "Change Limit"}}/>
      <Stack.Screen name="TLimitToken" component={LimitToken} options={{title: "Change Limit"}}/>
      <Stack.Screen name="TLimitIndemnity" component={LimitIndemnity} options={{title: "Change Limit"}}/>
      <Stack.Screen name="TLimitIndemnity1" component={LimitIndemnity1} options={{title: "Terms and Condition"}}/>
      <Stack.Screen name="TLimitIndemnity2" component={LimitIndemnity2} options={{title: "Limit with Indemnity"}}/>
      <Stack.Screen name="TLimitIndemnity3" component={LimitIndemnity3} options={{title: "Limit with Indemnity"}}/>
      <Stack.Screen name="TLimitMenu" component={LimitMenu} options={{title: "Banking Limit"}}/>
      <Stack.Screen name="BillMenu" component={BillMenu} options={{title: "Bills Payment"}}/>
      <Stack.Screen name="BillPayment" component={BillsPayment} options={{title: "Bills Payment"}}/>
      <Stack.Screen name="SelfService" component={SelfServiceMenu} options={{title: "Self Service"}}/>




    </Stack.Navigator>
  );
};

export default KeyMobileStack;
