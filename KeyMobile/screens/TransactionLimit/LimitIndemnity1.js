import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { COLORS, GLOBAL_STYLE } from "../../../constants";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
const LimitIndemnity1 = ({ navigation }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingHorizontal: "5%",
      }}
    >
    <View>
    <Text
        style={[
          GLOBAL_STYLE.h4Bold,
          { color: COLORS.grey, paddingVertical: 10 },
        ]}
      >
        KEYSTONE MOBILE SERVICES TERMS AND CONDITIONS
      </Text>
      <Text style={[GLOBAL_STYLE.h4Bold, { color: "black" }]}>
        Thank you for using our mobile banking services. By participating in the
        service or using the software, you are agreeing to these Mobile Banking
        Service Terms and Conditions. Please read these terms and conditions
        carefully before using these services, and keep a copy for your records.
        Thank you for using our mobile banking services. By participating in the
        service or using the software, you are vagreeing to these Mobile Banking
        Service Terms and Conditions. Please read these terms and conditions
        carefully before using these services, and keep a copy for your records.
        Thank you for using our mobile banking services. By participating in the
        service or using the software, you are vagreeing to these Mobile Banking
        Service Terms and Conditions. Please read these terms and conditions
        carefully before using these services, and keep a copy for your records.
        Thank you for using our mobile banking services. By participating in the
        service or using the software, you are vagreeing to these Mobile Banking
        Service Terms and Conditions. Please read these terms and conditions
        carefully before using these services, and keep a copy for your records.
        Thank you for using our mobile banking services. By participating in the
        service or using the software, you are vagreeing to these Mobile Banking
        Service Terms and Conditions. Please read these terms and conditions
        carefully before using these services, and keep a copy for your records.
        Thank you for using our mobile banking services. By participating in the
        service or using the software, you are vagreeing to these Mobile Banking
        Service Terms and Conditions. Please read these terms and conditions
        carefully before using these services, and keep a copy for your records.
        Thank you for using our mobile banking services. By participating in the
        service or using the software, you are vagreeing to these Mobile Banking
        Service Terms and Conditions.
      </Text>
    </View>
    

      <View style={[GLOBAL_STYLE.rowBetween, { marginVertical: 10 }]}>
        <ConfirmComponent
          text="Decline"
          icon={<Feather name="x-circle" size={30} color={"#EB5757"} />}
          IconBg="rgba(235, 87, 87, 0.2)"
          navigation={navigation}
          action={"TLimitIndemnity"}
        />
        <ConfirmComponent
          text="Accept"
          icon={<FontAwesome5 name="check-circle" size={30} color="#6FCF97" />}
          IconBg="rgba(111, 207, 151, 0.2)"
          navigation={navigation}
          action="TLimitIndemnity2"
        />
      </View>
    </ScrollView>
  );
};

const ConfirmComponent = ({ icon, IconBg, text, navigation, action }) => {
  return (
    <Pressable
      style={[
        GLOBAL_STYLE.rowBetween,
        { justifyContent: "flex-start", alignItems: "center" },
      ]}
      onPress={() => navigation.navigate(action)}
    >
      <View
        style={{
          backgroundColor: IconBg,
          height: 45,
          width: 45,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 40,
        }}
      >
        <Text>{icon}</Text>
      </View>

      <Text
        style={[
          GLOBAL_STYLE.h1Bold,
          { fontSize: 25, marginLeft: 10, color: COLORS.grey },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};
export default LimitIndemnity1;

const styles = StyleSheet.create({});
