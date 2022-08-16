import { View, Text, StyleSheet , TextInput } from 'react-native'
import React, {useState} from 'react'
import { COLORS, FONTS } from '../../constants';
import CustomButton from './CustomButton';
import * as ImagePicker from "expo-image-picker";



    const CustomFilePicker = ({ label, labelInfo,pickImage,fileName, error }) => {
        return (
          <View style={{marginBottom: 20}}>
            <Text style={styles.label}>
              {label}
              <Text style={styles.labelInfo}>{labelInfo}</Text>
            </Text>
            <View style={styles.dottedContainer}>
              <View style={styles.container}>
                <CustomButton
                  buttonText={"Choose file"}
                  buttonTextStyle={styles.button}
                  buttonContainerStyle={styles.buttonContainer}
                  onPress={pickImage}
                />
                <Text style={styles.fileText}>{fileName ? fileName?.slice(0, 15)  :"No file choosen" }</Text>
              </View>
            </View>
            { error && (<Text style={styles.formError}>{error}</Text>)}

          </View>
        );
      };
  
      export default CustomFilePicker
      const styles = StyleSheet.create({
  
 
        label: {
          color: COLORS.primaryBlue,
          fontFamily: FONTS.normal,
          fontSize: 16,
        },
        labelInfo: {
          color: COLORS.grey,
          fontFamily: FONTS.normal
        },
        dottedContainer: {
      
      paddingHorizontal: 20,
      paddingVertical: 13,
      borderRadius: 5,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: "rgba(30, 31, 32, 0.5)"
        },
        container: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        
        },
        fileText: {
          color: "rgba(30, 31, 32, 0.5)",
          fontSize: 14,
        },
        button: {
          paddingHorizontal: 40,
          color: "rgba(30, 31, 32, 0.5)",
        },
        buttonContainer: {
          height: 35,
          backgroundColor: "#F2F2F2",
          borderWidth: 1,
          borderColor: "rgba(0, 37, 97, 0.2)",
        },
        formError: {
          color: "red",
          fontSize: 10,
        },
      });

