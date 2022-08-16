import { View, Text, StyleSheet } from "react-native";
import React, {useState} from "react";
import { COLORS, FONTS, SIZES } from "../../../../../constants";
import { CustomButton, CustomFilePicker } from "../../../../components";
import { useDispatch } from "react-redux";
import { loanCreateErrReset , loanCreateSuccessReset} from "../../../../../utilities/redux/keyMobile/slice/loanCreateSlice";
import * as ImagePicker from "expo-image-picker";
import { createLoanDoc } from "../../../../../utilities/redux/keyMobile/actions/loanActions";
import { removeValue} from "../../../../../utilities/asyncStorage";



const Step4 = ({navigation, tag}) => {
  const dispatch = useDispatch()
  const [file1Name, setFile1name] = useState("")
  const [file2Name, setFile2name] = useState("")
  const [file3Name, setFile3name] = useState("")
  const [workId, setWorkId] = useState("")
  const [validId, setValidId] = useState("")
  const [otherDoc, setOtherDoc] = useState("")
  const [errors, setErrors] = useState({})

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
  },
  {
    "requestTag": tag,
    "documentFile": otherDoc,
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
    // if(!otherDoc){
    //   return setErrors({ otherDoc: "This field is required" });
    // }

    setErrors({});
    dispatch(createLoanDoc(payload))
    removeValue("assetLoan")
   
  };
  return (
    <View style={styles.mainContainer}>
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

<CustomFilePicker label="Upload Any Valid ID"
 labelInfo={"(Front and Back)"} 
 fileName={file2Name}
 pickImage={() => pickImage(setValidId, setFile2name, "valid id")}
 error={errors.validId}
 />
<CustomFilePicker
 label="Upload Other Document" 
 fileName={file3Name}
 pickImage={() => pickImage(setValidId, setFile3name, "other doc")}
 error={errors.otherDoc}
 />
</View>
      <View style={{ width: "100%" }}>
        <CustomButton
          buttonText={"Submit"}
          onPress={() => submitHandler()}
          buttonContainerStyle={styles.button}
        />
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",

    height: SIZES.height - 200,
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
  noticeText: {
    fontFamily: FONTS.normal,
    textAlign: "center",
  
  },
});

export default Step4;
