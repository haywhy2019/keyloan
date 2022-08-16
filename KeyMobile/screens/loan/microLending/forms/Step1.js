import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {
  CustomButton,
  Input,
  DropDownInput,
} from "../../../../components";
import { COLORS, FONTS } from "../../../../../constants";
import { loanAccountDetailAction } from "../../../../../utilities/redux/keyMobile/actions/loanActions";
import { useDispatch, useSelector } from "react-redux";

const Step1 = ({ next, prev }) => {
  const dispatch = useDispatch();
  const [acctNo, setAcctNo] = useState("");
  const [selectedAcct, SetSelectedAcct] = useState("");
  let accountdigit = /^\d{10}$/;

  const { accounts } = useSelector((state) => state.auth.user);
  const accountDetails = useSelector((state) => state.loan.success);

 
  // useEffect(() => {
  //   if (acctNo.match(accountdigit)) {
  //     dispatch(loanAccountDetailAction(acctNo));
  //     console.log("working");
  //   }
  // }, [acctNo]);

   useEffect(() => {
  if(accountDetails){
    SetSelectedAcct(accountDetails.NUBANACCOUNTNO)
  }
  }, [accountDetails]);



  return (
    <View>

      

      <DropDownInput
        label="Account number"
        data={accounts}
        labelCustomStyle={styles.inputLabel}
        labelField= "accountno"
        valueField= "accountno"
        placeholder={accountDetails ? accountDetails.accountno : "Select account"}
        value={selectedAcct}
        onChange={(item) => {
          dispatch(loanAccountDetailAction(item.accountno));
        }}
      />
    
      {/* <Input
        label="test account fetch"
        placeholder="Aminu"
        labelCustomStyle={styles.inputLabel}
        value={acctNo}
        onChangeText={(text) => setAcctNo(text)}
      /> */}
      {accountDetails ? (
        <View>
          <Input
            label="Bvn"
            placeholder="22134892821"
            labelCustomStyle={styles.inputLabel}
            value={accountDetails?.BVN}
            editable={false}
          />

          <Input
            label="Email address"
            placeholder="samueltbankole@gmail.com"
            labelCustomStyle={styles.inputLabel}
            value={accountDetails?.CUSTOMEREMAIL}
            editable={false}
          />
          <Input
            label="Phone number"
            placeholder="+234 812 374 1286"
            labelCustomStyle={styles.inputLabel}
            value={accountDetails?.TELEPHONE}
            editable={false}
          />
          <Input
            label="Name of applicant"
            placeholder="Olaken Aminu"
            labelCustomStyle={styles.inputLabel}
            value={accountDetails?.ACCOUNTNAME}
            editable={false}
          />
          <Input
            label="Applicant address "
            placeholder="Home address (NOT P.O.BOX)"
            labelCustomStyle={styles.inputLabel}
            value={accountDetails?.ADDRESS}
            editable={false}
          />
          <Input
            label="Date of birth"
            placeholder="(DD/MM/YYYY)"
            labelCustomStyle={styles.inputLabel}
            value={accountDetails?.CUSTONMERDOB}
            editable={false}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          >
            <CustomButton
              buttonText={"Previous"}
              // onPress={() => prev()}
              buttonContainerStyle={{
                width: "40%",
                backgroundColor: COLORS.grey,
              }}
            />

            <CustomButton
              buttonText={"Next"}
              onPress={() => next()}
              buttonContainerStyle={{ width: "40%" }}
            />
          </View>

        
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 15,
  },
  button: {
    marginVertical: 20,
  },
  noticeText: {
    fontFamily: FONTS.normal,
    textAlign: "center",
  },
  noticeTextColor: {
    color: "red",
  },
});

export default Step1;
