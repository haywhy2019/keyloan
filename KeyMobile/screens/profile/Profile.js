import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Clipboard,
  Pressable,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS, GLOBAL_STYLE, isAndroid, SIZES } from "../../../constants";
import { images } from "../../../constants";
import { useSelector } from "react-redux";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { setProfileImage } from "../../../utilities/asyncStorageUtils";
import { getItem } from "../../../utilities/asyncStorage";
import Toast from "react-native-toast-message";
import {
  BottomNotification,
  CustomButton,
  CustomSnackBar,
  Input,
  SpinnerImage,
} from "../../components";
import { sendOtpAction } from "../../../utilities/redux/keyMobile/axiosService/sendOtp";
import { userImageAction } from "../../../utilities/redux/keyMobile/actions/userImageAction";
import uuid from "react-native-uuid";
import ToggleSwitch from "toggle-switch-react-native";
import { ChangeProfileImageIcon } from "../../../constants/icons";

// import Clipboard from '@react-native-clipboard/clipboard';
// import {encode, decode} from 'node-base64-image';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.auth.user);
  const [screen, setScreen] = useState({ screen: "", label: "" });
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [otpError, setOtpError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { CustomerName, bvn } = useSelector((state) => state.auth.user);

  const [isEnabled, setIsEnabled] = useState(false);
  const [image, setImage] = useState("");
  const [copy, setCopy] = useState("tol");
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const copyToClipboard = () => {
    Clipboard.setString(bvn);
  };

  const userImage = useSelector((state) => state.userImage.success);
  const userImageErr = useSelector((state) => state.userImage.error);
  const userImageLoading = useSelector((state) => state.userImage.loading);

  const sendPasswordOtp = () => {
    setScreen({ screen: "ChangePassword", label: "Enter password" });
    const id = uuid.v4();
    const payload = {
      username: user,
      action: "ChangePassword",
      requestId: id,
      source: "mobile",
    };
    Keyboard.dismiss();
    setLoading(true);
    sendOtpAction(payload)
      .then((res) => {
        if (res.data.ResponseCode == "00") {
          navigation.navigate("ChangePassword", { user, id });
        } else {
          setOtpError(res.data.ResponseMessage);
        }
      })
      .catch((err) => {
        setOtpError(err.messsage || "An error occured");
      })
      .finally(() => setLoading(false));
  };

  const sendPinOtp = () => {
    setScreen({ screen: "ChangePin", label: "Enter Password" });

    const id = uuid.v4();
    const payload = {
      username: user,
      action: "ChangePin",
      requestId: id,
      source: "mobile",
    };
    Keyboard.dismiss();
    setLoading(true);
    sendOtpAction(payload)
      .then((res) => {
        if (res.data.ResponseCode == "00") {
          navigation.navigate("ChangePin", { user, id });
        } else {
          setOtpError(res.data.ResponseMessage);
        }
      })
      .catch((err) => {
        setOtpError(err.messsage || "An error occured");
      })
      .finally(() => setLoading(false));
  };

  const getUserDetails = async () => {
    const item = await getItem("username");
    const item2 = await getItem("password");
    setUser(item);
    setPassword(item2);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      const payload = {
        username: user,
        Base64ProfilePic: result.base64,
      };
      setImage(result.base64);
      dispatch(userImageAction(payload));
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  if (loading) {
    return <SpinnerImage />;
  }
  return (
    <View style={{ ...GLOBAL_STYLE.background, ...{ paddingHorizontal: 0 } }}>
      <ScrollView>
        <View style={styles.profileaBackground}>
          <View style={styles.centerProfileImage}>
            {userImageLoading == "pending" ? (
              <View style={styles.profileImageLoading}>
                <ActivityIndicator size="small" color={COLORS.primaryBlue} />
              </View>
            ) : (
              <View style={styles.profileIconContainer}>
                <Image
                  source={{ uri: `data:image/png;base64,${userImage}` }}
                  style={styles.profileImage}
                />
                {isAndroid ? (
                  <Pressable style={styles.iconContainer} onPress={pickImage}>
                    <Ionicons
                      name="camera"
                      size={20}
                      color={COLORS.primaryBlue}
                    />
                  </Pressable>
                ) : (

                    <ChangeProfileImageIcon onPress={pickImage} style={{marginLeft: SIZES.responsiveWidth("-12%")}}/>
                
                )}
              </View>
            )}

            <View>
              <Text style={styles.name}>{CustomerName}</Text>
              <TouchableOpacity
                style={styles.bvnContainer}
                onPress={copyToClipboard}
              >
                <Text style={styles.bvn}>{`BVN: ${bvn}`}</Text>
                <Ionicons name="md-copy" size={20} color={COLORS.primaryBlue} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <MenuOptionsCard
            label="Change Password"
            onPress={sendPasswordOtp}
            screen="ChangePassword"
          />
          <MenuOptionsCard
            label="Change Pin"
            onPress={sendPinOtp}
            screen="ChangePin"
          />
          <MenuOptionsCard2
            label="Lock Card"
            icon={
              <ToggleSwitch
                isOn={isEnabled}
                onColor={COLORS.primaryBlue}
                offColor={COLORS.primaryBlue2}
                // label="Save Beneficiary"
                labelStyle={{ color: COLORS.primaryBlue, fontWeight: "900" }}
                size="small"
                onToggle={toggleSwitch}
              />
            }
          />
          <MenuOptionsCard2
            label="Enable 2Fa"
            icon={
              <ToggleSwitch
                isOn={isEnabled}
                onColor={COLORS.primaryBlue}
                offColor={COLORS.primaryBlue2}
                // label="Save Beneficiary"
                labelStyle={{ color: COLORS.primaryBlue, fontWeight: "900" }}
                size="small"
                onToggle={toggleSwitch}
              />
            }
          />
          <CustomSnackBar
            show={userImageErr || otpError}
            message={userImageErr || otpError}
          />
        </View>
      </ScrollView>
      <Text style={styles.version}>version 1.0</Text>
    </View>
  );
};
export default Profile;

const MenuOptionsCard = ({ onPress, label, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuCardContainer}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="lock-closed-sharp"
            size={18}
            color={COLORS.primaryBlue}
          />
          <Text style={styles.menuCardContainerText}>{label}</Text>
        </View>
        {icon ? (
          icon
        ) : (
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color={COLORS.primaryBlue}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const MenuOptionsCard2 = ({ label, icon }) => {
  return (
    <View style={styles.menuCardContainer}>
      <View style={{ flexDirection: "row" }}>
        <Ionicons
          name="lock-closed-sharp"
          size={18}
          color={COLORS.primaryBlue}
        />
        <Text style={styles.menuCardContainerText}>{label}</Text>
      </View>
      {icon ? (
        icon
      ) : (
        <Ionicons
          name="chevron-forward-outline"
          size={20}
          color={COLORS.primaryBlue}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileaBackground: {
    backgroundColor: COLORS.grey2,
  },
  centerProfileImage: {
    alignItems: "center",
    marginTop: "15%",
  },
  profileIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  profileImageLoading: {
    justifyContent: "center",
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: COLORS.grey,
  },
  iconContainer: {
    backgroundColor: "#A3D8F5",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: 35,
    borderRadius: 50,
    marginLeft: -50,
  },
  changeImage: {
    color: COLORS.primaryBlue,
    marginRight: 5,
  },
  name: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 15,
  },
  bvnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "15%",
  },
  bvn: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    fontSize: 16,
    textAlign: "center",
    marginRight: 10,
  },
  menuCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: COLORS.primaryBlue,
    backgroundColor: "white",
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.grey,
    paddingHorizontal: 20,
    fontFamily: FONTS.normal,
  },
  menuCardContainerText: {
    color: COLORS.primaryBlue,
    marginLeft: 10,
    fontFamily: FONTS.normal,
  },
  version: {
    color: "#C4C4C4",
    textAlign: "center",
  },
});
