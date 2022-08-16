import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Snackbar } from "react-native-paper";
import { COLORS , SIZES} from "../../constants";

const CustomSnackBar = ({ show, message , customStyle, success}) => {
  
  const [visible, setVisible] = useState("");
  const onDismissSnackBar = () => setVisible(false)

  useEffect(() => {
  if(show){
    setVisible(show)
  }
  }, [show]);
  return (
    <View style={visible ? styles.container : styles.hide}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        // action={{
        //   label: 'Undo',
        //   onPress: () => {
        //     // Do something
        //   },
        // }}
        duration={2000}
        wrapperStyle={customStyle}
        style={{ backgroundColor: success ? COLORS.primaryBlue : COLORS.error}}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  

  },
  hide: {
    display: "none",
  },
});

export default CustomSnackBar;
