import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, images, FONTS,SIZES } from "../../constants";
import { ProfileIcon } from "../../constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSelector, useDispatch } from "react-redux";
import { getItem } from "../../utilities/asyncStorage";
import { logout } from "../../utilities/redux/keyMobile/slice/authSlice";
// import { chooseApp } from "../../utilities/redux/allApps/slice/appSlice";

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState("");
  const customerDetails = useSelector((state) => state.auth.user);

  const userImage = useSelector((state) => state.userImage.success);

  const logoutFunction = () => {
    dispatch(logout());
  };
  var profileImage = `data:image/png;base64,${profilePic}`;
  const getProfileImage = async () => {
    setProfilePic(userImage);
  };
  useEffect(() => {
    getProfileImage();
  }, [userImage]);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={images.headerImg}
        style={{ width: "100%", padding: 0 }}
        resizeMode="cover"
      >
        <SafeAreaView>
          <View style={styles.profile}>
            {userImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <ProfileIcon />
            )}

            <View style={styles.container1}>
              <View style={styles.container2}>
                <View>
                  <Text style={styles.container2Text}>
                    {customerDetails?.CustomerName?.slice(0, 16) ||
                      "error occured"}
                  </Text>
                  <Text
                    style={styles.container2Text2}
                  >{`BVN: ${customerDetails.bvn}`}</Text>
                </View>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => props.navigation.closeDrawer()}
                >
                  <Feather name="x" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <DrawerContentScrollView {...props}>
        <View style={styles.container3}>
          <DrawerItemList {...props} />
          <TouchableOpacity style={styles.logout} onPress={logoutFunction}>
            <Entypo name="log-out" size={13} color={COLORS.primaryBlue} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      <View style={styles.socialsContainer}>
        <Text style={styles.socialText}>Like & Follow Us</Text>
        <View style={styles.socialsIcon}>
          <Feather
            name="facebook"
            size={20}
            color={COLORS.primaryBlue}
            onPress={() => console.log("facebook")}
            style={styles.icons}
          />
          <Feather
            name="instagram"
            size={20}
            color={COLORS.primaryBlue}
            onPress={() => console.log("facebook")}
            style={styles.icons}
          />
          <Feather
            name="twitter"
            size={20}
            color={COLORS.primaryBlue}
            style={styles.icons}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  profile: {
    paddingHorizontal: "6%",
    paddingVertical: "6%",
    alignContent: "center",
    flexDirection: "row",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  container1: {
    marginHorizontal: 10,
  },
  container2: {
    flexDirection: "row",
  },
  container2Text: {
    color: "white",
    fontFamily: FONTS.normal,
  },
  container2Text2: {
    color: "white",
    fontSize: 10,
    marginTop: 10,
    fontFamily: FONTS.normal,
  },
  container3: {
    paddingBottom: "70%",
  },
  icon: {
    // marginLeft: "15%",
    marginLeft: SIZES.responsiveWidth("10%")
  },
  logout: {
    flexDirection: "row",
    padding: 15,
    paddingLeft: 12,
    alignItems: "center",
    borderBottomWidth: 0.8,
    borderBottomColor: COLORS.grey,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 14,
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
  },
  socialsContainer: {
    paddingHorizontal: 10,
  },
  socialText: {
    fontFamily: FONTS.bold,
    color: COLORS.primaryBlue,
  },
  socialsIcon: {
    flexDirection: "row",
  },
  icons: {
    paddingVertical: 20,
    paddingRight: 10,
  },
});
export default CustomDrawer;
