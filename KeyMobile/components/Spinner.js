import { View, Text, ActivityIndicator, StyleSheet, Modal } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={COLORS.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: COLORS.primaryBlue,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Spinner;
