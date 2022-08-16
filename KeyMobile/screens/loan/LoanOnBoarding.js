import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LoanOnBoardingIcon } from "../../../constants/icons";
import { CustomButton } from "../../components";
import { COLORS } from "../../../constants";

const LoanOnBoarding = ({navigation}) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container1}>
        <View style={styles.container2}>
          <LoanOnBoardingIcon />
          <Text style={styles.text}>
            We offer a variety of lending options from personal loans to credit
            card services with as gamut of features made possible by modern
            technology.
          </Text>
        </View>
        <View>
          <CustomButton buttonText={"Loan Dashboard"} buttonContainerStyle={styles.outlineButton} buttonTextStyle={styles.outlineButtonText} onPress={() => navigation.navigate("LoanDashBoard")}/>
          <CustomButton buttonText={"Loan Request"} onPress={() => navigation.navigate("LoanScreen")}/>  
        </View>
      </View>
    </View>
  );
};

export default LoanOnBoarding;

const styles = StyleSheet.create({
  container1: {
      flex: 1,
flexDirection: "column",
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: 40
  },
  text: {
color: '#77869E',
textAlign: 'center',
marginTop: 30
  },
  container2: {alignItems: 'center'},
  outlineButton: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: COLORS.primaryBlue,
      marginBottom: 20
  },
  outlineButtonText:{
      color: COLORS.primaryBlue
  }

});
