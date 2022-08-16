import { View, Text, StyleSheet, ImageBackground, ScrollView ,  Dimensions,} from "react-native";
import React, {useState, useEffect, useContext} from "react";
import { COLORS, FONTS, SIZES, images } from "../../../../constants";
import { CustomButton, CustomFilePicker, Input , 
  CustomDropDown,
DropDownInput } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { AccountFormContext } from ".././accountContext";

const Step3 = ({ prev , navigation, next}) => {
  
  const [selectBranch, setSelectBranch] = useState("")
  const [branchCode, setBranchCode] = useState("")
  const [errors, setErrors] = useState({});
  
  const {
    third: {
      branch,
      setBranch,
      referralCode,
      setReferralCode,
      acctType,
      setAcctType,
    }
  } = useContext(AccountFormContext);
  

  const nextPage = () => {
    if (!branch) {
      return setErrors({ branch: "This field is required" });
    }
    if (!acctType) {
      return setErrors({ accountType: "This field is required" });
    }
    setErrors({})
    next();
  };

  const branchList = useSelector(state => state.allBranch.success)
  const accountType =   useSelector(state => state.accountType.success)
 

  

  // useEffect(() => {
  //   if(branch) {
  //     setBranchList(branch)
  //   }else{
  //     setBranchList("")
  //   }
  // }, [branch])
  return (
    <ScrollView  contentContainerStyle={styles.mainContainer}>
     
      <View>
      <DropDownInput 
     label="Select bank branch"
     labelCustomStyle={styles.inputLabel}
     data={branchList ? branchList : [{BranchName: 'an error occured', BranchCode: "an error occured"}]}
   
     labelField={'BranchName'}
     valueField={"BranchCode"}
     onChange={(item) => {
  
      // setSelectBranch(item.BranchName)
    setBranch(item)
    }}
      
     placeholder={branch ? branch.BranchName : "Select bank branch"}
     search={true}
     error={errors.branch}
     />
     <Input 
     label="Dao code"
     placeholder="Referal code"
     optional="(optional)"
     value={referralCode}
     onChangeText={(text) => setReferralCode(text)}
    
     />
       <DropDownInput 
     label="Select account type"
     labelCustomStyle={styles.inputLabel}
     data={accountType ? accountType : [{productname: 'an error occured', producttype: "an error occured"}]}
    //  value={selectBranch}
     labelField={'productname'}
     valueField={"producttype"}
     onChange={(item) => {
  
      setAcctType(item)}}
     placeholder={acctType ? acctType.productname : "Select account type"}
    //  search={true}
    error={errors.accountType}
     />
    
      </View>
      
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
      >
        <CustomButton
          buttonText={"Previous"}
          onPress={() => prev()}
          buttonContainerStyle={{ width: "40%" }}
        />

        <CustomButton
          buttonText={"Next"}
          onPress={nextPage}
          buttonContainerStyle={{ width: "40%" }}
        />
      </View>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
backgroundColor: 'white',
    // height: SIZES.height - 200,
  },
  selfie: {
    alignItems: "center",
  },
  instruction: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    marginTop: 10,
  },
  instruction2: {
    color: COLORS.grey,
    textAlign: "center",
    marginTop: 5,
  },
  loanHeader: {
    width: "100%",
    height: 100,

    borderRadius: 10,

    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#000',
    shadowOpacity: 1,
    elevation: 5,
  },
  loanHeaderImage: {
    borderRadius: 5,
    //  paddingHorizontal: 50
  },
  loanText: {
    color: COLORS.grey,
  },
  loanAmount: {
    fontSize: 20,
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    marginTop: 10,
  },
  loanHeadercontent: {
    marginLeft: 20,
    marginTop: 20,
  },
  noticeText: {
    fontFamily: FONTS.normal,
    textAlign: "center",
  },
  noticeTextColor: {
    color: "red",
  },
});





export default Step3;
