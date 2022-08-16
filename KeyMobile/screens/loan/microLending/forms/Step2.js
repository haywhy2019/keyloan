import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { CustomButton, Input, CustomDropDown, DropDownInput } from "../../../../components";
import Checkbox from "expo-checkbox";
import { FONTS, COLORS } from "../../../../../constants";
import { useSelector } from "react-redux";

const Step2 = ({ next, prev }) => {
  const [checked, setChecked] = useState(false);
  const [checkErr, setCheckErr] = useState("");
  const [salary, setSalary] = useState("")
  const [monthlyIncome, setMonthlyIncome] = useState("")
  const [errors, setErrors] = useState({})

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const accountDetails = useSelector((state) => state.loan.success);

  const nextPage = () => {
    if(!monthlyIncome){
      return setErrors({monthlyIncome:"field is required"});
    }
    if (checked == false) {
      return setCheckErr("please agree to the terms");
    }
    next();
  };
  const income = [{label:"50000 - 150000",value:"50000 - 150000"}, {label:"150000 - 300000", value:"150000 - 300000"}, {label:"300000 - 500000",value:"150000 - 300000"}];
  return (
    <View>
      <Input
        label="Employer"
        placeholder="Work address (Not P.O.BOX)"
        labelCustomStyle={styles.inputLabel}
        value={
          accountDetails?.EMPLOYER ? accountDetails?.EMPLOYER : "Not Available"
        }
        editable={false}
      />
      <Input
        label="Work address"
        placeholder="Work address (Not P.O.BOX)"
        labelCustomStyle={styles.inputLabel}
        value={
          accountDetails?.EMPLOYERADDRESS
            ? accountDetails?.EMPLOYERADDRESS
            : "Not Available"
        }
        editable={false}
      />

<DropDownInput 
 label="Monthly income"
 labelCustomStyle={styles.inputLabel}
 data={income}
 labelField= "label"
 valueField= "value"
 placeholder={monthlyIncome ? monthlyIncome : "Select monthly income"}
 onChange={(item) => {setMonthlyIncome(item.value)}}
 error={errors.monthlyIncome}
/>

      <Input
        label="Next of kin name"
        value={"Not sent from backend"}
        labelCustomStyle={styles.inputLabel}
      />
      <Input
        label="Next of kin address"
        value={"Not sent from backend"}
        labelCustomStyle={styles.inputLabel}
      />
      <Input
        label="Next of Kin phone number"
        value={"Not sent from backend"}
        labelCustomStyle={styles.inputLabel}
      />

      <Pressable onPress={toggleChecked} style={styles.checkContainer}>
        <Checkbox
          style={styles.checkbox}
          value={checked}
          onValueChange={toggleChecked}
          color={checked ? COLORS.primaryBlue : undefined}
        />
        <Text style={styles.checkText}>
          By Checking on the box, you are agree to the Global Standing
          Instruction (GSI)
        </Text>
      </Pressable>
      <Text style={styles.checkError}>{checkErr}</Text>
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
  checkText: {
    color: COLORS.primaryBlue,
    marginLeft: 10,
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkError: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
  },
});

export default Step2;
