import { View, Text, ActivityIndicator, StyleSheet, Moda,KeyboardAvoidingView , Pressable} from "react-native";
import React, {useState, useEffect} from "react";
import { COLORS, FONTS } from "../../constants";
import { SuccessIcon } from "../../constants/icons";
import CustomButton from "./CustomButton";
import Input from "./Inputs";


const BottomNotification = ({
  show,
  hide,
    headerText,
    infoText,
    buttonText,
    onPress,
    input,
    customStyle,
    ...props
}) => {
  const [visible, setVisible] = useState(false)

useEffect(() => {
  if(show){
    setVisible(true)
  }
  
},[show, onPress])
  return (
<Pressable style={visible ? styles.container : {display: 'none'}} onPress={hide ? hide : () => setVisible(false)}>
<Pressable style={{...styles.bottom,...customStyle}} pointerEvents="box-none"
onPress={(e) => e.stopPropagation()}
>
<View style={styles.bottomContainer}>
<SuccessIcon />
    <Text style={styles.header}>
   {headerText}
    </Text>
    <Text style={styles.infoText}>
  {infoText}
    </Text>
    {input ? 
      <View style={{width: "100%"}}>
    <Input {...props}/> 
    </View>: 
    null}
    <View style={{width: "100%"}}>
  
    <CustomButton 
    onPress={() => {
      onPress();
    setVisible(false)
    }}
    buttonText={buttonText}
    buttonTextStyle={styles.buttonText}
    buttonContainerStyle={styles.buttonContainer}
    />
    </View>

</View>


</Pressable>
    </Pressable>
  );
};

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
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    paddingVertical: 20
  },
  bottomContainer: {
    paddingHorizontal: '5%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  header: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.primaryBlue
  },
  infoText: {
color: '#979797',
fontFamily: FONTS.normal,
fontSize: 16,
textAlign: 'center',
paddingHorizontal: '10%'
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONTS.normal
  },
  buttonContainer: {
    backgroundColor: COLORS.primaryBlue,
    borderWidth: 1,
    borderColor: COLORS.primaryBlue
  }
});
export default BottomNotification;
