import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { ProfileAvatar } from "../../../../../constants/icons";
import { COLORS, FONTS, SIZES, images } from "../../../../../constants";
import {
  CustomButton,
  CustomFilePicker,
  Input,
  CustomDropDown,
  BottomNotification,
  CustomSnackBar
} from "../../../../components";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { removeValue} from "../../../../../utilities/asyncStorage";
import { loanCreateErrReset , loanCreateSuccessReset} from "../../../../../utilities/redux/keyMobile/slice/loanCreateSlice";
import { createLoanDoc } from "../../../../../utilities/redux/keyMobile/actions/loanActions";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Step3 = ({ navigation,tag }) => {
    const dispatch = useDispatch()
  const [strollStart, setScrollStart] = useState("");
  const [period, setPeriod] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [errors, setErrors] = useState({});
  const [workId, setWorkId] = useState("")
  const [validId, setValidId] = useState("")
  const [file1Name, setFile1name] = useState("")
  const [file2Name, setFile2name] = useState("")


  const loanCreateSuccess = useSelector((state) => state.loanCreate.success);

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
  
  console.log(tag, "request tag")
  const payload = [
    {
    "requestTag": tag,
    "documentFile": workId,
    "documenttype": "image",
    "description": file1Name
  },
  {
    "requestTag": tag,
    "documentFile": validId,
    "documenttype": "image",
    "description": file2Name
  }
  ]
  const submitHandler = () => {
    if (!workId) {
      return setErrors({ workId: "This field is required" });
    }
    if (!validId) {
      return setErrors({ validId: "This field is required" });
    }

    setErrors({});
    dispatch(createLoanDoc(payload))
    removeValue("salaryLoan")
  };


  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
        <Text style={styles.noticeText}>
   Please attach documents
      </Text>
      <View>
        <CustomFilePicker
          label="Upload Work ID"
          labelInfo={"(Front and Back)"}
          fileName={file1Name}
          pickImage={() => pickImage(setWorkId, setFile1name, "work id")}
          error={errors.workId}
        />

        <CustomFilePicker
          label="Upload Any Valid ID"
          labelInfo={"(Front and Back)"}
          fileName={file2Name}
          pickImage={() => pickImage(setValidId, setFile2name, "valid id")}
          error={errors.validId}
        />
      </View>
      
      <View style={{ width: "100%", marginVertical: 20 }}>
        <CustomButton
          buttonText={"Submit"}
          onPress={submitHandler}
          buttonContainerStyle={styles.button}
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
    marginBottom: 20,
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
    marginBottom: 20
  },
  noticeTextColor: {
    color: "red",
  },
  inputLabel: {
    fontSize: 14,
  },
});

export default Step3;
