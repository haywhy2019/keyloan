import { View, Text } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants";
import { Input } from "../../components/index";
import NumberFormat from "react-number-format";

const InputAmount = (props) => {
  const [focus, setFocus] = useState(false);
  const [amount, setAmount] = useState("");
  return (
    <View>
      <NumberFormat
        value={props.value}
        displayType={"text"}
        thousandSeparator={true}
        // decimalSeparator={'.'}
        // decimalScale={2}
        // isNumericString
        renderText={(value) => (
          <Input
            {...props}
            onChangeText={props.onChangeText}
            value={value}
            keyboardType="numeric"
            icon={
              <Text style={{ color: COLORS.primaryBlue2 }}>{"\u20A6"}</Text>
            }
          />
        )}
      />
    </View>
  );
};

export default InputAmount;
