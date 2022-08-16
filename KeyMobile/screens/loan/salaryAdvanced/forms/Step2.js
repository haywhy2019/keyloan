import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { CustomButton, Input, DropDownInput } from "../../../../components";
import Checkbox from "expo-checkbox";
import { FONTS, COLORS } from "../../../../../constants";
import { useSelector } from "react-redux";

const Step2 = ({ next, prev }) => {
  const [checked, setChecked] = useState(false);
  const [checkErr, setCheckErr] = useState("");
  const [errors, setErrors] = useState({});
  const [selectIndustry, setSelectIndustry] = useState("");
  const [selectCompany, setSelectCompany] = useState("");
  const [selectIncome, setSelectIncome] = useState("");
  const toggleChecked = () => {
    setChecked(!checked);
  };

  const accountDetails = useSelector((state) => state.loan.success);
  const nextPage = () => {
    if (!selectIndustry) {
      
      return setErrors({ selectIndustry: "This field is required" });
    }
    if (!selectCompany) {
      
      return setErrors({ selectCompany: "This field is required" });
    }
    if (!selectIncome) {
      
      return setErrors({ selectIncome: "This field is required" });
    }
    setErrors({})
    if (checked == false) {
      return setCheckErr("please agree to the terms");
    }
   
    next();
  };

  const income = [
    { income: "50000 - 150000" },
    { income: "150000 - 300000" },
    { income: "300000 - 500000" },
  ];
  const industry = [
    { industry: "agro" },
    { industry: "banking" },
    { industry: "govt" },
  ];
  const company = [
    { company: "Mtn" },
    { company: "Glo" },
    { company: "Aitel" },
  ];
  return (
    <View>
      <DropDownInput
        label="Industry"
        data={industry}
        labelCustomStyle={styles.inputLabel}
        labelField="industry"
        valueField="industry"
        placeholder="Select industry"
        value={selectIndustry}
        onChange={(item) => {
          setSelectIndustry(item.industry);
        }}
        error={errors.selectIndustry}
      />

      <DropDownInput
        label="Company"
        data={company}
        labelCustomStyle={styles.inputLabel}
        labelField="company"
        valueField="company"
        placeholder="Select company"
        value={selectCompany}
        onChange={(item) => {
          setSelectCompany(item.company);
        }}
        error={errors.selectCompany}
      />

      <DropDownInput
        label="Income"
        data={income}
        labelCustomStyle={styles.inputLabel}
        labelField="income"
        valueField="income"
        placeholder="Select income range"
        value={selectIncome}
        onChange={(item) => {
          setSelectIncome(item.income);
        }}
        error={errors.selectIncome}
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
