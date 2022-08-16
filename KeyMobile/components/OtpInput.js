import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import { COLORS } from '../../constants';


const OtpTextInput = function(props) {
  const {
    containerStyle,
    style,
    LeftComponent,
    RightComponent,
    refCallback,
    ...remainingProps
  } = props;

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {LeftComponent}
      <TextInput
        {...remainingProps}
        style={[styles.textInputStyle]}
        ref={refCallback}
        selectionColor={COLORS.primaryBlue}
      />
      {RightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderColor: COLORS.primaryBlue,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    width: 60,
    height: 60
  },
  textInputStyle: {
    padding: 0,
    color: COLORS.primaryBlue,
    textAlign: 'center',
    fontSize: 30
    
  },
});

  


export default OtpTextInput;
