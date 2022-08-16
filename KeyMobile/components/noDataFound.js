import { StyleSheet, Text, View } from "react-native";
import { COLORS, GLOBAL_STYLE } from "../../constants";

import React from "react";

const noDataFound = ({ heading, infoText }) => {
  return (
    <View style={styles.noData}>
      <Text style={[GLOBAL_STYLE.h1Bold, { color: COLORS.error }]}>
        {heading}
      </Text>
      <Text
        style={[GLOBAL_STYLE.h3, { color: COLORS.grey, textAlign: "center" }]}
      >
        {infoText}
      </Text>
    </View>
  );
};

export default noDataFound;

const styles = StyleSheet.create({
  noData: {
   paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: "white",

    marginVertical: 20,

    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});
