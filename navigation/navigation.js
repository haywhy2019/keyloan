import "react-native-gesture-handler";
import React, { useContext, useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import UnAuthScreen from "./unAuth";
import KeyMobileDrawerNavigator from "./keyMobileNavigation/keyMobileDrawer";
import { logout } from "../utilities/redux/keyMobile/slice/authSlice";
import { Dialog } from "react-native-simple-dialogs";
import { View, Text } from "react-native";

function AllNavigation() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [expiryDate, setExpiryDate] = useState(false);
  const userLoggedin = useSelector((state) => state.auth.user);
  const { jWTTokenResponse } = useSelector((state) => state.auth.user);
  const expiryTime = jWTTokenResponse?.TokenExpiryDate;

  const timerRef = useRef(null);
  

  const tokenTime = Date.parse(expiryTime);


  const expiredTime = new Date(tokenTime - (1000 * 60 * 15))

 
  const dismissModal = () => {
    setVisible(false);
    clearInterval(timerRef.current);
    dispatch(logout());
  };

  useEffect(() => {
    if (userLoggedin) {
      timerRef.current = setInterval(() => {
        const now = new Date();
        if (now >= expiredTime) {
          setVisible(true);
         
        }
      }, 1000 * 5);
    }
  }, [userLoggedin]);

  return (
    <NavigationContainer>
      { userLoggedin  ? (
        <KeyMobileDrawerNavigator />
      ) : (
        <UnAuthScreen />
       
      )}
    
      <Dialog
        visible={visible}
        title="Session expired"
        onTouchOutside={dismissModal}
      >
        <View>
          <Text>Session expired. please login to continue</Text>
        </View>
      </Dialog>
    </NavigationContainer>
  );
}

export default AllNavigation;
