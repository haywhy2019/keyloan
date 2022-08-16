import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { COLORS, FONTS, SIZES, images } from "../../../../constants";
import {
  CustomButton,
  CustomFilePicker,
  Input,
  CustomDropDown,
} from "../../../components";
import * as ImagePicker from "expo-image-picker";
import { AccountFormContext } from ".././accountContext";
import uuid from "react-native-uuid";
import { useDispatch } from "react-redux";
import { createNewAccountAction } from "../../../../utilities/redux/keyMobile/actions/createNewAccountAction";

const Step4 = ({ prev, navigation }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const {
    first: {
      bvn,
      firstName,
      lastName,
      middleName,
      number,
      date,
      bvnToken,
      requestId,
    },
    second: {
      resAddress,
      gender,
      resState,
      resCity,
      resCountry,
      email,
      marital,
    },

    third: {
      branch,
      referralCode,
      acctType,
      passport,
      setPassport,
      utility,
      setUtility,
      signature,
      setSignature,
      id,
      setId,
      file1Name,
      setFile1name,
      file2Name,
      setFile2name,
      file3Name,
      setFile3name,
      file4Name,
      setFile4name,
      
    },
  } = useContext(AccountFormContext);

  const pickImage = async (setImage, setName, name) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    let pattern = /([^\/]+)$/gm;

    const fileName = result.uri.match(pattern);
  

    if (!result.cancelled) {
      setImage(result.base64);
      // setName(fileName[0])
      setName(name);
    }
  };

  const submitHandler = () => {
  
    // if (!passport) {
    //   return setErrors({ passport: "This field is required" });
    // }
    // if (!id) {
    //   return setErrors({ id: "This field is required" });
    // }
    // if (!utility) {
    //   return setErrors({ utility: "This field is required" });
    // }
    // if (!signature) {
    //   return setErrors({ signature: "This field is required" });
    // }
    setErrors({});
    // navigation.navigate("account summary")
   
    const payload =
     {
      lastName: lastName,
      gender: gender,
      accountTitle: `${firstName} ${lastName}`,
      mobileNumber: number,
      countryOfResidence: resCountry,
      branchCode: branch.BranchCode,
      firstName: firstName,
      productCode: acctType.producttype,
      identificationType: { passport, utility, id, signature },
      dob: date,
      residentialAddress: resAddress,
      mnemonic: "",
      middleName: middleName,
      location: "string",
      bvn: bvn,
      state: resState,
      processingMode: "ONLINE",
      maritalStatus: marital,
      email: email,
      daocode: referralCode,
      passport: "string",
      requestid: requestId,
    };
  //   {
  //     "lastName": "FAJUKE",
  // "gender": "M",
  // "accountTitle": "FAJUKE OLUWAJOBA",
  // "mobileNumber": "08035614725",
  // "countryOfResidence": "NG",
  // "branchCode": "NG0010235",
  // "firstName": "OLUWAJOBA",
  // "productCode": "205",
  // "identificationType": null,
  // "dob": "10-Apr-82",
  // "residentialAddress": "7 Aderibigbe Street, Ikosi Ketu 105102, Lagos, Nigeria",
  // "mnemonic": "",
  // "middleName": "MICHAEL",
  // "location": "",
  // "bvn": "22145633268",
  // "state": "10",
  // "processingMode": "ONLINE",
  // "maritalStatus": "",
  // "email": "olumikefajj@gmail.com",
  // "daocode": "",
  // "passport": null,
  // "requestid": "e83ff383-0715-4af6-8060-7594519cf473"
  // }
   
    dispatch(createNewAccountAction(payload));
  };

  useEffect(() => {
    
  },[])
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View>
        <CustomFilePicker
          label="Passport"
          labelInfo={"(optional)"}
          pickImage={() => pickImage(setPassport, setFile1name, "passport")}
          fileName={file1Name}
          error={errors.passport}
        />

        <CustomFilePicker
          label="Valid ID"
          labelInfo={"(optional)"}
          pickImage={() => pickImage(setId, setFile2name, "valid id")}
          fileName={file2Name}
          error={errors.id}
        />
        <CustomFilePicker
          label="Utility bill"
          labelInfo={"(optional)"}
          pickImage={() => pickImage(setUtility, setFile3name, "utility bill")}
          fileName={file3Name}
          error={errors.utility}
        />
        <CustomFilePicker
          label="Signature"
          labelInfo={"(optional)"}
          pickImage={() => pickImage(setSignature, setFile4name, "signature")}
          fileName={file4Name}
          error={errors.signature}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
      >
        <CustomButton
          buttonText={"Previous"}
          onPress={() => prev()}
          buttonContainerStyle={{ width: "40%" }}
        />

        <CustomButton
          buttonText={"Submit"}
          onPress={submitHandler}
          buttonContainerStyle={{ width: "40%" }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
    // height: SIZES.height - 200,
  },
  selfie: {
    alignItems: "center",
  },
  instruction: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    marginTop: 10,
  },
  instruction2: {
    color: COLORS.grey,
    textAlign: "center",
    marginTop: 5,
  },
  loanHeader: {
    width: "100%",
    height: 100,

    borderRadius: 10,

    shadowOffset: { width: 10, height: 10 },
    shadowColor: "#000",
    shadowOpacity: 1,
    elevation: 5,
  },
  loanHeaderImage: {
    borderRadius: 5,
    //  paddingHorizontal: 50
  },
  loanText: {
    color: COLORS.grey,
  },
  loanAmount: {
    fontSize: 20,
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    marginTop: 10,
  },
  loanHeadercontent: {
    marginLeft: 20,
    marginTop: 20,
  },
  noticeText: {
    fontFamily: FONTS.normal,
    textAlign: "center",
  },
  noticeTextColor: {
    color: "red",
  },
});

export default Step4;
