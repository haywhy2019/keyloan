import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Dropdown } from "react-native-element-dropdown";
import { FONTS, COLORS } from "../../constants/index";

const DropDownInput = (props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  
  return (
    <View style={{ marginBottom: 15 }}>
            <Text style={{ ...styles.label, ...props.labelCustomStyle }}>{props.label}</Text>
    <View >
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: COLORS.primaryBlue }]}
                placeholderStyle={{...styles.placeholderStyle,...props.placeholderStyle}}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={props.data}
                maxHeight={500}
                labelField={props.labelField}
                valueField={props.valueField}
                placeholder={props.placeholder}
                searchPlaceholder="Search..."
                value={props.value}
                selectionColor="red"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                containerStyle={{color: 'red'}}
          
                onChange={(item) => {props.onChange(item), setIsFocus(false)}}
                fontFamily={FONTS.normal}
               
                {...props}
              />
            </View>
            {props.error && <Text style={styles.formError}>{props.error}</Text>}
            </View>
  )
}

export default DropDownInput

const styles = StyleSheet.create({
  label: {
    fontFamily: FONTS.normal,
    color: COLORS.primaryBlue, 
  },
  dropdown: {
    height: 50,
    borderColor: COLORS.grey2,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: COLORS.grey2,
    paddingHorizontal: 8,
   
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  placeholderStyle: {
    color: "#C4C4C4",
    fontSize: 12,
    textAlign: "left",
  },
 
  selectedTextStyle: {
    fontSize: 14,
    color: COLORS.primaryBlue,
  },
 
  inputSearchStyle: {
    height: 50,
    fontSize: 14,
  
  },
  formError: {
    color: "red",
    fontSize: 10,
  },
})