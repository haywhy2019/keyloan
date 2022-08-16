import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants";
import moment from "moment";

const DatePicker = ({
  show,
  error,
  value,
  onChange,
  placeholder,
  customStyling,
  inputLabel,
  labelCustomStyle,
}) => {
  const [label, setLabel] = useState("");
  const [focus, setFocus] = useState(false);

  const showDatepicker = () => {
    setShow(true);
  };

  useEffect(() => {
    if (placeholder) {
      setLabel("placeholder");
    }
  }, []);
  return (
    <View>
      <Text style={{ ...styles.label, ...labelCustomStyle }}>{inputLabel}</Text>

      <View
        style={
          focus
            ? { ...styles.datePickerFocus, ...customStyling }
            : { ...styles.datePicker, ...customStyling }
        }
      >
        <Text style={placeholder ? styles.placeholder : styles.date}>
          {placeholder ? placeholder : moment(value).format("DD - MM - YYYY")}
        </Text>
        <View style={styles.icon}>
          <AntDesign
            name="calendar"
            size={18}
            color={placeholder ? COLORS.grey : COLORS.primaryBlue}
          />
        </View>
 
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          mode="date"
          is24Hour={true}
          maximumDate={new Date()}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      )}
             { error && (<Text style={styles.formError}>{error}</Text>)}
    </View>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.grey2,
    paddingHorizontal: 4,
    paddingVertical: 10,
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.grey2,
    marginBottom: 15,
  },
  datePickerFocus: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.primaryBlue,
    paddingHorizontal: 4,
    paddingVertical: 10,
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.grey2,
  },
  icon: {
    marginRight: 6,
  },
  date: {
    // fontSize: 20,
    marginLeft: 10,
    color: COLORS.primaryBlue,
  },
  placeholder: {
    color: "grey",
    marginLeft: 20,
  },
  label: {
    fontFamily: FONTS.normal,
    color: COLORS.primaryBlue,
  },
  formError: {
    color: "red",
    fontSize: 10,
    marginTop: -10
  },
});
export default DatePicker;

// how to use when imported
// const [show, setShow] = useState(false)
// const [placeholder, setPlaceholder] = useState("(DD/MM/YYYY)")
// <Pressable onPress={() => setShow(true)}>
// <DatePicker
//   label="Date of birth"
//   placeholder={placeholder}
//   labelCustomStyle={styles.inputLabel}
//   value={date}
//   onChange = {(event, selectedDate) => {
//       const currentDate = selectedDate || date ;
//       setPlaceholder(null)
//       setDate(currentDate);
//       setShow(false)
//       console.log(date, currentDate, selectedDate, "date 1")
//     }}
//   show={show}
//   // onChangeText={(text) => setDate(text)}
//   error={errors.date}
// />
// </Pressable>
