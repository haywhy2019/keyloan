import { View, Text, ActivityIndicator, StyleSheet, Modal } from "react-native";
import React, {useState, useEffect} from "react";
import { COLORS, FONTS, GLOBAL_STYLE } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { Input, CustomButton } from "../components";
import 'intl';
import 'intl/locale-data/jsonp/en';
const PaymentSummary = ({ 
  show,
  buttonText,
navigation, screen, action, close, onPress ,
accountName,
accountNo,
bankName,
amount,
narration,
...props
}) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if(show){
      setVisible(true)
    }
    
  },[show, onPress])

  const closeSummary = () => {
    close()
    setVisible(false)
  }
  let amountNum = parseInt(amount.replace(",",""));
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amountNum)
  return (
    <View style={visible ? styles.container : {display: "none"}}>
      <View style={styles.bottom}>
        <View style={styles.bottomContainer}>
          <View
            style={{
              width: "100%",
              paddingTop: 20,
              paddingBottom: 30,
              backgroundColor: COLORS.primaryBlue,
            }}
          >
            <View
              style={{
                ...GLOBAL_STYLE.rowBetween,
                ...{
                  backgroundColor: COLORS.primaryBlue,
                  marginHorizontal: "5%",
                },
              }}
            >
              <Text style={[GLOBAL_STYLE.h2Bold, { color: "white" }]}>
                Confirm details
              </Text>
              <MaterialIcons name="cancel" size={24} color={COLORS.white} onPress={closeSummary}/>
            </View>
          </View>

          <View style={{ marginHorizontal: "5%", marginTop: 30 }}>
            <TextComponent label="Beneficiary" resp={accountName?.slice(0, 20)} />
            <TextComponent label="Bank Name" resp={bankName}/>
            <TextComponent label="Acc. Number" resp={accountNo} />
            <TextComponent label="Amount" resp={formattedAmount} />
            <TextComponent label="Narration" resp={narration} />

            <Input  placeholder="Enter pin" 
            keyboardType="numeric" 
            textContentType="newPassword"
            secureTextEntry={true}
            {...props}
            />

            <View style={{ width: "100%" }}>
              <CustomButton
                onPress={onPress}
                buttonText="Confirm"
                buttonTextStyle={styles.buttonText}
                buttonContainerStyle={styles.buttonContainer}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const TextComponent = ({ label, resp }) => (
  <View
    style={{
      ...GLOBAL_STYLE.rowBetween,
      ...{ width: "100%", marginBottom: 20 },
    }}
  >
    <Text style={GLOBAL_STYLE.h2Bold}>{label}</Text>
    <Text
      style={{
        ...GLOBAL_STYLE.h3,
        ...{ color: COLORS.grey },
      }}
    >
      {resp}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "30%",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    overflow: "hidden",
  },
  bottomContainer: {
    position: "relative",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // paddingHorizontal: "10%",
    // flex: 1,
    // flexDirection: "column",
    // justifyContent: "space-around",
    // alignItems: "center",
  },
  header: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.primaryBlue,
  },
  infoText: {
    color: "#979797",
    fontFamily: FONTS.normal,
    fontSize: 16,
    textAlign: "center",
  },
  buttonText: {
    // color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
  },
  buttonContainer: {
    // backgroundColor: "white",
    // borderWidth: 1,
    // borderColor: COLORS.primaryBlue,
    marginBottom: 20,
  },
});
export default PaymentSummary;
