import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS, FONTS } from "../../constants";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";

const CustomDropDown = ({
  data,
  showItem,
  placeholder,
  onSelect,
  buttonTextAfterSelection,
  rowTextForSelection,
  label,
  labelCustomStyle,
  errorText,
  ...props
}) => {
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];
  const [focus, setFocus] = useState(false);
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ ...styles.label, ...labelCustomStyle }}>{label}</Text>
      <SelectDropdown
        data={data}
        onSelect={onSelect}
        buttonTextAfterSelection={buttonTextAfterSelection}
        buttonTextStyle={styles.textStyle}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        buttonStyle={
          focus ? styles.dropDownContainerFocus : styles.dropDownContainer
        }
        defaultButtonText={placeholder}
        rowTextStyle={styles.dropDownText}
        rowTextForSelection={rowTextForSelection}
        rowStyle={styles.dropDownItemStyles}
        dropdownStyle={{ backgroundColor: "black" }}
        renderDropdownIcon={() => (
          <Ionicons name="chevron-down" size={20} color="black" />
        )}
        {...props}
      />
      {errorText && <Text style={styles.formError}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: COLORS.primaryBlue,
    fontSize: 14,
    textAlign: "left",
  },
  dropDownContainerFocus: {
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.primaryBlue,
    marginBottom: 15,
  },
  dropDownContainer: { width: "100%", borderRadius: 5 },
  dropDownText: {
    textAlign: "left",
    fontSize: 16,
    color: COLORS.primaryBlue,
  },
  dropDownItemStyles: { backgroundColor: COLORS.white },

  label: {
    fontFamily: FONTS.normal,
    color: COLORS.primaryBlue,
    fontSize: 15,
  },
  formError: {
    color: "red",
    fontSize: 10,
  },
});

export default CustomDropDown;
