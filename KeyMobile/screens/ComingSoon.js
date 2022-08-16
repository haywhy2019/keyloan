import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ComingSoonIcon } from "../../constants/icons";
import { COLORS, GLOBAL_STYLE } from "../../constants";
import { CustomButton } from "../components";

const ComingSoon = ({ navigation }) => {
  return (
    <View
      style={[
        GLOBAL_STYLE.background,
        {
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        },
      ]}
    >
      {/* <Text>coming soon</Text> */}
      <ComingSoonIcon />
      <View>
        <Text style={[GLOBAL_STYLE.h1Bold, , styles.h1]}>Coming Soon</Text>
        <Text style={[GLOBAL_STYLE.h3, styles.h3]}>
          Dear Customer,This feature is currently not available, visit any of
          our branch or call us on +234 700 2000 3000 for more information
        </Text>
      </View>
      <View style={{ width: "100%" }}>
        <CustomButton
          buttonText={"Home"}
          onPress={() => navigation.replace("Home")}
        />
      </View>
    </View>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  h1: { fontSize: 25, textAlign: "center", marginBottom: 20 },
  h3: { color: COLORS.grey, textAlign: "center" },
});
