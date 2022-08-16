import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Modal,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { COLORS, SIZES, images, FONTS } from "../../../constants";
import { Ionicons } from "@expo/vector-icons";
import { CustomButton, Input , DatePicker, SpinnerImage} from "../../components";
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import { allLoans } from "../../../utilities/redux/keyMobile/actions/loanActions";
import { LoanDashboardCard, HistoryCard, NoDataFound } from "../../components";
import { useDispatch, useSelector } from "react-redux";

function Dashboard({navigation}) {
  const dispatch = useDispatch()
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'History' },
    { key: 'second', title: 'Range' },
    { key: 'third', title: 'Statement' },
  ]);

  const selectedAccount = useSelector(
    (state) => state.selectedAccount.accountDetails.accountno
  );
  const allLoan = useSelector(state => state.loanAll.success)
  const allLoanFailure = useSelector(state => state.loanAll.error)
  const allLoanLoading = useSelector(state => state.loanAll.loading)
  useEffect(() => {
    dispatch(allLoans(selectedAccount))
  },[])
  const transactionData = [
    {
      ref: "oguns segunl",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "Ogunsola segun",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
  ];
  const FirstRoute = () => (
<View style={{marginTop: 20}}>
  {transactionData.map((item, index) =>( <HistoryCard item={item} key={index} />))}

  </View>
  );
  
  const SecondRoute = () => (
    <View style={{marginTop: 20, flexDirection: 'column', justifyContent: 'space-evenly', flex: 1}} >
<View>
<DatePicker 
 inputLabel="Enter Start Date"
  placeholder={"DD/MM/YYYY"} />

<DatePicker 
 inputLabel="Enter End Date"
  placeholder={"DD/MM/YYYY"} />
</View>
<CustomButton buttonText={"Show Transaction"} />
  </View>
  );

  const ThirdRoute = () => (
    <View style={{marginTop: 20, flexDirection: 'column', justifyContent: 'space-evenly', flex: 1}} >
    <View>
    <DatePicker 
     inputLabel="Enter Start Date"
      placeholder={"DD/MM/YYYY"} />
    
    <DatePicker 
     inputLabel="Enter End Date"
      placeholder={"DD/MM/YYYY"} />
    </View>
    <CustomButton buttonText={"Download Transaction"} />
      </View>
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
  });  

  const renderTabBar = props => (
  	<TabBar
     	 {...props}
      	activeColor={'white'}
      	inactiveColor={COLORS.primaryBlue}
        style={{
        marginTop:10,
        backgroundColor: 'rgba(242, 242, 242, 0.25)',
        height: 50,
        shadowOffset: { height: 0, width: 0 }, 
        shadowColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0 ,
        borderWidth: 1,
        borderColor: COLORS.primaryBlue,
        borderRadius: 5,
      
      
      }}
     
        indicatorContainerStyle={{ alignItems: 'center' }}
        indicatorStyle={{ backgroundColor: COLORS.primaryBlue , height: '100%' }}
        labelStyle={{textTransform: 'capitalize', fontFamily: FONTS.bold}}
       
  	/>
  );
  if(allLoanLoading == "pending"){
    return <SpinnerImage />
  }
  console.log(allLoan, "all loan")
  return (
   
    <ScrollView       contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between", backgroundColor: 'white' }}>
   {
    allLoan ? ( <LoanDashboardCard data={allLoan} />)
    : <View style={{marginHorizontal: '5%'}}>
 <NoDataFound heading={"No Loan!"} infoText="Dear Customer, You currently do not have any loan portfolio"/>
 <CustomButton buttonText={"Loan Request"} onPress={() => navigation.replace("LoanScreen")}/>
    </View>
   
   }
     
      {/* <View style={{ height: 500 ,paddingHorizontal: "5%"}}>
      <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: SIZES.width}}
          renderTabBar={renderTabBar}
      />
      </View> */}

    
    </ScrollView>
   
  );
}


export default Dashboard;

