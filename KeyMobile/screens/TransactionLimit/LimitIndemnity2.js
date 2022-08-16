import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { images, COLORS, FONTS, GLOBAL_STYLE, SIZES } from "../../../constants";
import {
  CustomButton,
  Input,
  SpinnerImage,
  CustomSnackBar,
  CustomFilePicker,
} from "../../components";
import { ProfileAvatar } from "../../../constants/icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { thousandOperator } from "../../../utilities/thousandOperator";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { setItem, getItem, removeValue } from "../../../utilities/asyncStorage";

const LimitIndemnity2 = ({ navigation }) => {
  const { accounts, DailyUtilizedLimit, dailytranslimit, bvn } = useSelector(
    (state) => state.auth.user
  );
  let cameraRef = useRef();
  const [errors, setErrors] = useState({});
  const [selfie, setSelfie] = useState("");
  const [workId, setWorkId] = useState("");
  const [signature, setSignature] = useState("");
  const [file1Name, setFile1name] = useState("");
  const [file2Name, setFile2name] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(null);
  const [saveSuccess,setSaveSuccess]  = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [cameraErr, setCameraErr] = useState("");
  const [photo, setPhoto] = useState("");

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
    if (!workId) {
      return setErrors({ workId: "This field is required" });
    }
    if (!validId) {
      return setErrors({ validId: "This field is required" });
    }

    setErrors({});
  };

  const saveInfo = () => {
    setItem("indemnityImage", photo)
    setItem("indemnitySign", signature)
    setItem("indemnityId", workId)
    setSaveSuccess("save successful")
  }



  const getSavedInfo = async() => {
   const photo = await getItem('indemnityImage')
   const signature = await getItem('indemnitySign')
   const id = await getItem('indemnityId')
   setPhoto(photo)
   setSignature(signature)
   setWorkId(id)
  }
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraPermission.status === "granted");
    })();

    getSavedInfo()
  }, []);

  // if (hasPermission == undefined) {
  //   setCameraErr("Requesting permissions...")
  // } else if (!hasPermission) {
  //    setCameraErr("Permission for camera not granted. Please change this in settings.")
  // }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
    setShowCamera(false);
  };


  const nextPage = async () => {
    removeValue("indemnityImage")
    removeValue("indemnitySign")
    removeValue("indemnityId")
    navigation.navigate("TLimitIndemnity3",{photo,workId, signature})
            
  }
 
  if (showCamera) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Camera
          style={styles.camera}
          ref={cameraRef}
          type={type}
        >
          <StatusBar style="auto" />
        </Camera>
        <View>
          <MaterialIcons
            name="camera"
            size={60}
            color={COLORS.primaryBlue}
            onPress={takePic}
          />
        </View>
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "flex-start",
        backgroundColor: "white",
      }}
    >
      <StatusBar style="light" />
      <View style={styles.backgroundImgContainer}>
        <ImageBackground source={images.headerImg} style={styles.backgroundImg}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerText2}>
                First step to no restrictions on all your transactions!
              </Text>
              <Text style={styles.headerText2}> Upload your documents.</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.afterBgImage}>
        <View
          style={{
            marginTop: 10,
            marginBottom: 30,
          }}
        >
          <Text
            style={[
              GLOBAL_STYLE.h3Bold,
              { textAlign: "center", marginBottom: 40 },
            ]}
          >
            Kindly provide the following documents:
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            {photo ? (
              <Pressable onPress={() => setShowCamera(true)}>
              <Image
                source={{ uri: `data:image/png;base64,${photo.base64}` }}
                style={styles.snappedImage}
              />
              </Pressable>
            ) : (
              <View>
              <ProfileAvatar onPress={() => setShowCamera(true)} />

            <Text
              style={[
                GLOBAL_STYLE.h3Bold,
                { textAlign: "center", marginTop: 20 },
              ]}
            >
              Take a Selfie
            </Text>
              </View>
            )}

            <Text
              style={[
                GLOBAL_STYLE.h4,
                { textAlign: "center", color: COLORS.grey },
              ]}
            >
              To VERIFIED/VALIDATED THE INFORMATION SUPPLIED.
            </Text>
          </View>
          <View>
            <CustomFilePicker
              label="Upload Valid ID"
              labelInfo={"(Front and Back)"}
              fileName={file1Name}
              pickImage={() => pickImage(setWorkId, setFile1name, "work id")}
              error={errors.workId}
            />
            <CustomFilePicker
              label="Signature"
              fileName={file2Name}
              pickImage={() => pickImage(setSignature, setFile2name, "work id")}
              error={errors.workId}
            />
          </View>
        </View>
        <CustomButton
          buttonText="Save"
          onPress={saveInfo}
          buttonContainerStyle={styles.buttonBorder}
          buttonTextStyle={{ color: COLORS.primaryBlue }}
        />
        <CustomButton
          buttonText="Next"
          onPress={nextPage}
          buttonContainerStyle={styles.button}
        />
        <CustomSnackBar 
        success
        show={saveSuccess}
        message={saveSuccess}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: SIZES.width,
    height: SIZES.width,
  },
  snappedImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  showLimitContainer: {
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.grey,
  },
  showAmountSpentContainer: {
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.primaryBlue,
    marginTop: -5,
  },

  container1: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.white,
  },
  backgroundImg: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  headerContainer: {
    paddingHorizontal: "10%",
    paddingVertical: "5%",
    textAlign: "center",
  },
  headerText1: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginBottom: 20,
  },
  headerText2: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.normal,
  },
  backgroundImgContainer: {
    flex: 1,
  },
  afterBgImage: {
    flex: 3,
    paddingHorizontal: "8%",
    backgroundColor: COLORS.white,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  accountText: {
    color: COLORS.grey,
    fontFamily: FONTS.normal,
  },
  loginText: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
    marginLeft: 5,
  },
  button: {
    marginVertical: 30,
  },
  buttonBorder: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primaryBlue,
  },
});
export default LimitIndemnity2;
