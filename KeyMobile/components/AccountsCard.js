import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Modal,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { COLORS, SIZES, images, FONTS } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { getItem, setItem } from "../../utilities/asyncStorage";
import {  defaultAccount } from "../../utilities/redux/keyMobile/slice/selectAccountSlice";
import { useDispatch, useSelector } from "react-redux";
import {getAccountBalanceAction} from "../../utilities/redux/keyMobile/actions/accountBalanceAction"

let showBalance;
const getView = async () => {
  showBalance = await getItem("showBalance");
};

const AccountCard = ({ data }) => {
  const dispatch = useDispatch();
  const [view, setView] = useState(showBalance);
  const [selected, setSelected] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const displayAccount = data[selected];

  const selectHandler = (index) => {
    setSelected(index);
    setModalVisible(false);
    dispatch( defaultAccount(data[index]));
    dispatch(getAccountBalanceAction(data[index]?.accountno))
  };

  const {FormatedAccountBalance} = useSelector(state => state.accountBalance.success)
  const accountBalanceLoading = useSelector(state => state.accountBalance.loading)
  const accountBalanceErr = useSelector(state => state.accountBalance.error)

  

  const AllAccountCard = (item, index) => {
    return (
      <Pressable onPress={() => selectHandler(index)}>
        <View>
          <View style={styles.allAccountCardContainer}>
            <Image
              source={images.keyMobileLogoRound}
              style={styles.logoImage}
            />
            <View>
              <Text style={styles.accountNameText}>{item.accountname}</Text>
              <View style={styles.accountDetailsContainer}>
                <Text style={styles.accountTypeText}>{item.acctype}</Text>
                <Text style={styles.accountNoText}>{item.accountno}</Text>
               
              </View>
              <View style={styles.accountDetailsContainer}>
                <Text style={styles.accountTypeText}>{item.accccy}</Text>
                <Text style={styles.accountNoText}>{item.FormatedAccountBalance}</Text>
               
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const toggleView = async () => {
    if (view == "show") {
      setView("hide");
    } else {
      setView("show");
    }

    await setItem("showBalance", view);

    getView();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    getView();
    dispatch(getAccountBalanceAction(displayAccount.accountno))
    dispatch(defaultAccount(data[0]))
  }, []);

  let accountType = displayAccount.acctype.split(" ");
  accountType = accountType[0];

  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={images.headerImg}
        style={styles.sliderBg}
        imageStyle={styles.sliderImage}
      >
        <View style={styles.content}>
          <View style={{ ...styles.container1, ...{ marginBottom: 15 } }}>
            <View style={styles.container2}>
              <Text style={styles.accountTypeLabel}>{accountType || ""}</Text>
              <Text style={styles.accountNumberLabel}>
                {displayAccount?.accountno}
              </Text>
            </View>
            <View style={styles.iconBg}>
              <Ionicons
                name="chevron-down"
                size={20}
                color={COLORS.white}
                onPress={toggleModal}
              />
            </View>
          </View>
          <View style={styles.container1}>
            <View>
              <Text style={styles.balanceLabel}>Account Balance</Text>
              {(view == "show") && (accountBalanceLoading == "pending") ?
             ( <ActivityIndicator size="small" color="white" />) :
             view == "show" && FormatedAccountBalance
              ? (
                <Text style={styles.amountLabel}>
                  {" "}
                  {"NGN"}{" "}
                  {FormatedAccountBalance}
                </Text>
              ) 
              :
             view == "show" && accountBalanceErr
              ? (
                <Text style={styles.amountLabelErr}>
                 Not available
                </Text>
              ) 
              : 
              
              (
                <Text style={styles.amountLabelHidden}>**********</Text>
              )}
            </View>
            <View style={styles.iconBg}>
              <Ionicons
                name={view == "show" ? "ios-eye-off-sharp" : "ios-eye"}
                size={20}
                color={COLORS.white}
                onPress={toggleView}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
      <View>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={toggleModal}

          // transparent={true}
        >
          {/* <SafeAreaView /> */}
          <FlatList
            ListHeaderComponent={
              <Text style={styles.listHeaderText}>Select Source Account</Text>
            }
            ListHeaderComponentStyle={{
              ...styles.allAccountCardContainer,
              ...{ borderBottomWidth: 0 },
            }}
            data={data}
            renderItem={({ item, index }) => AllAccountCard(item, index)}
            keyExtractor={(item, index) => index}
          />
          {/* {data.map((items, index) => (<Text
         key={index}
         >{items.FormatedAccountBalance}</Text>))} */}
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  sliderBg: {
    width: "100%",

    height: 120,
    borderRadius: 40,
  },
  sliderImage: {
    borderRadius: 5,
    paddingHorizontal: 50,
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  container1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  container1Text: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: FONTS.normal,
  },
  balanceLabel: {
    fontFamily: FONTS.normal,
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 5,
  },
  amountLabel: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  amountLabelErr: {
    fontSize: 12,
    fontFamily: FONTS.normal,
    color: COLORS.white,
    marginLeft: 10
  },
  amountLabelHidden: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginLeft: 5,
  },

  accountTypeLabel: {
    color: COLORS.white,
    fontFamily: FONTS.normal,
    fontSize: 16,
    marginLeft: 5,
  },
  accountNumberLabel: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 16,
    marginLeft: 6,
  },
  container2: {
    flexDirection: "row",
  },
  iconBg: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: COLORS.primaryBlue2,
    borderRadius: 20,
    opacity: 0.25,
  },
  accountInfo: {
    color: COLORS.white,
    fontFamily: FONTS.normal,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accountInfoText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.normal,
  },
  accountInfoText2: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  allAccountCardContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondaryBlue2,
  },
  accountDetailsContainer: {
    flexDirection: "row",
  },
  accountNameText: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
    fontSize: 16,
  },
  accountTypeText: {
    color: COLORS.grey,
    fontFamily: FONTS.normal,
    marginRight: 5,
  },
  accountNoText: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
    marginRight: 5,
  },

  listHeaderText: {
    fontFamily: FONTS.bold,
    color: COLORS.primaryBlue,
    fontSize: 16,
  },
});
export default AccountCard;
