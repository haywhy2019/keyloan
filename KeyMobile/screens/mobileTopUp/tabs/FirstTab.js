import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Modal,
  FlatList,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GLOBAL_STYLE, COLORS, FONTS } from "../../../../constants";
import {
  DropDownInput,
  Input,
  CustomButton,
  SpinnerImage,
  CustomSnackBar,
} from "../../../components";
import { useSelector } from "react-redux";
import {
  MtnIcon,
  GloIcon,
  EtisalatIcon,
  AirtelIcon,
  AddressBookIcon,
  AvatarIcon,
} from "../../../../constants/icons";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import ToggleSwitch from "toggle-switch-react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import uuid from "react-native-uuid";
import NumberFormat from "react-number-format";

import getUserHook from "../../../../utilities/hooks/getUserHook";
import { validateTPinAction } from "../../../../utilities/redux/keyMobile/axiosService/sendMoney";
import { airTimeAction } from "../../../../utilities/redux/keyMobile/axiosService/mobileTopup";
const billerList = [
  {
    zain: {
      billerid: "901",
      billername: "Airtel Mobile Top-Up",

      shortName: "ZainMTU",
      productCode: "6280510421",
    },
    eti: {
      billerid: "120",
      billername: "Etisalat Recharge Top-Up",

      shortName: "ETILA",

      productCode: "6280510490",
    },

    glo: {
      billerid: "402",
      billername: "Glo QuickCharge",

      shortName: "GLOQCK",

      productCode: "628051045",
    },
    mtn: {
      billerid: "109",
      billername: "MTN e-Charge Prepaid",

      shortName: "MTNVTU",

      productCode: "628051043",
    },
  },
];

const FirstTab = () => {
  const [user] = getUserHook();
  const [errors, setErrors] = useState({});

  const [netWork, setNetwork] = useState("");
  const [srcAccount, setSrcAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [contacts, setContacts] = useState("");
  const [searchContacts, setSearchContacts] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [saveToBill, setSaveToBill] = useState(false);
  const [billerInfo, setBillerInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const { accounts, DailyUtilizedLimit, dailytranslimit, bvn } = useSelector(
    (state) => state.auth.user
  );

  const validationSchema = Yup.object().shape({
    account: Yup.number().required("Required"),
    network: Yup.object().required("Required"),
    phoneNumber: Yup.number().required("Required"),
    amount: Yup.string().required("Required"),
    transferPin: Yup.number().required("Required"),
  });

  const toggleSwitch = () => setSaveToBill(!saveToBill);
  const toggleModal = () => setModalVisible(!modalVisible);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const contact = data;
          setContacts(contact);
          setSearchContacts(contact);
        }
      } else {
        setErrors("permission not granted");
      }
    })();
  }, []);

  const selectLocalContact = (item) => {
    const number =
      item.phoneNumbers == undefined || null
        ? ""
        : item.phoneNumbers[0]?.number;

    
    setPhoneNumber(number);
    setModalVisible(false);
  };
  const DisplayPhoneNumber = (item, index) => {
    return (
      <Pressable
        style={{
          paddingVertical: 15,
          borderTopWidth: 0.5,
          borderTopColor: COLORS.primaryBlue,
          height: 60,
        }}
        onPress={() => selectLocalContact(item)}
      >
        <View
          style={[GLOBAL_STYLE.rowBetween, { justifyContent: "flex-start" }]}
        >
          <AntDesign
            name="user"
            size={20}
            color={COLORS.primaryBlue2}
            style={{ marginRight: 20 }}
          />
          <Text style={[GLOBAL_STYLE.h2, { color: COLORS.primaryBlue2 }]}>
            {item.name}
          </Text>
        </View>
      </Pressable>
    );
  };

  const filterContacts = (textToSearch) => {
    setSearchContacts(
      contacts.filter((item) =>
        item.name.toLowerCase().includes(textToSearch.toLowerCase())
      )
    );
  };

  const selectBiller = (item, biller) => {
    setNetwork(item);
    setBillerInfo(biller);
  };

  if (loading) {
    return <SpinnerImage />;
  }
  return (
    <ScrollView
      contentContainerStyle={[
        GLOBAL_STYLE.scrollViewGlobalNopadding,
        { justifyContent: "flex-start" },
      ]}
    >
      <Formik
        initialValues={{
          account: srcAccount,
          network: billerInfo,
          phoneNumber: phoneNumber,
          amount: amount,
          transferPin: "",
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
        
          const id = uuid.v4();
          const tPinPayload = {
            ID: 0,
            username: user,
            RequestID: id,
            Tpin: values.transferPin,
          };
          const airTimePayload = {
            product_id: billerInfo.productCode,
            billerName: billerInfo.billername,
            uniqueRef: id,
            debitAccount: values.account,
            beneficiaryPhone: phoneNumber.replace(/ /g, ""),
            amount: values.amount,
            telco: netWork,
            source: "mobile",
            username: user,
          };

          Keyboard.dismiss();
          setLoading(true);
          setError("");
          setSuccess("")
          validateTPinAction(tPinPayload)
            .then((res) => {
            
              if (res?.data?.ResponseCode == "00") {
                airTimeAction(airTimePayload)
                  .then((res) => {
                    if (res?.data?.reponseCode == "00") {
                  
                      setSuccess(res.data.responseMsg);
                    } else {
                      setError(res.data.responseMsg || "An error occured");
                    }
                  })
                  .catch((err) => {
                   
                    setError(res.data.ResponseDescription);
                  })
                  .finally(() => setLoading(false));
              } else {
                setError(res.data.ResponseMessage);
                setLoading(false);
              }
            })
            .catch((err) => {
              setError(err.message || "An error occured");
              setLoading(false);
            });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View style={{ marginHorizontal: "5%", marginTop: 20 }}>
            <DropDownInput
              data={accounts}
              labelCustomStyle={styles.inputLabel}
              labelField="accountno"
              valueField="accountno"
              placeholder="Select account"
              value={values.account}
              // onChange={(item) => setFieldValue("account", item.accountno)}
              onChange={(item) => setSrcAccount(item.accountno)}
              error={errors.account}
              placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
            />
            <View style={[GLOBAL_STYLE.rowBetween, { marginVertical: 20 }]}>
              <Pressable
                style={styles.iconBg}
                onPress={() => selectBiller("mtn", billerList[0].mtn)}
              >
                {netWork == "mtn" && (
                  <AntDesign
                    name="checkcircle"
                    size={10}
                    color="green"
                    style={{ marginLeft: 35 }}
                  />
                )}
                <MtnIcon />
              </Pressable>
              <Pressable
                style={styles.iconBg}
                onPress={() => selectBiller("glo", billerList[0].glo)}
              >
                {netWork == "glo" && (
                  <AntDesign
                    name="checkcircle"
                    size={10}
                    color="green"
                    style={{ marginLeft: 35 }}
                  />
                )}
                <GloIcon />
              </Pressable>
              <Pressable
                style={styles.iconBg}
                onPress={() => selectBiller("eti", billerList[0].eti)}
              >
                {netWork == "eti" && (
                  <AntDesign
                    name="checkcircle"
                    size={10}
                    color="green"
                    style={{ marginLeft: 35 }}
                  />
                )}

                <EtisalatIcon />
              </Pressable>
              <Pressable
                style={styles.iconBg}
                onPress={() => selectBiller("zain", billerList[0].zain)}
              >
                {netWork == "zain" && (
                  <AntDesign
                    name="checkcircle"
                    size={10}
                    color="green"
                    style={{ marginLeft: 35 }}
                  />
                )}

                <AirtelIcon />
              </Pressable>
            </View>
            <View>
              <Text style={styles.formError}>
                {" "}
                {errors.network && touched.network && errors.network}{" "}
              </Text>
            </View>
            <Input
              placeholder="Phone number"
              keyboardType="numeric"
              // onChangeText={handleChange("phoneNumber")}
              onChangeText={(text) => setPhoneNumber(text)}
              onBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber}
              error={
                errors.phoneNumber && touched.phoneNumber && errors.phoneNumber
              }
              placeholderTextColor={COLORS.primaryBlue}
              icon={<AddressBookIcon onPress={() => setModalVisible(true)} />}
            />

<NumberFormat
          value={values.amount}
      
        displayType={"text"}
        thousandSeparator={true}
        renderText={(value) => (
          <Input
          placeholder="Amount"
          keyboardType="numeric"
          // onChangeText={handleChange("amount")}
          onChangeText={(text) => setAmount(text)}
          onBlur={handleBlur("amount")}
          value={value}
          error={errors.amount && touched.amount && errors.amount}
          placeholderTextColor={COLORS.primaryBlue}
          icon={
            <Text style={{ color: COLORS.primaryBlue2 }}>{"\u20A6"}</Text>
          }
        />
        )}
      />        

          
            {/* <View
              style={[GLOBAL_STYLE.rowBetween, { justifyContent: "flex-end" }]}
            >
              <ToggleSwitch
                isOn={saveToBill}
                onColor={COLORS.primaryBlue}
                offColor={COLORS.primaryBlue2}
                label="Save beneficiary"
                labelStyle={{ color: COLORS.primaryBlue, fontWeight: "900" }}
                size="small"
                onToggle={toggleSwitch}
              />
            </View> */}
            <Input
              placeholder="Transfer Pin"
              keyboardType="numeric"
              onChangeText={handleChange("transferPin")}
              onBlur={handleBlur("transferPin")}
              value={values.transferPin}
              error={
                errors.transferPin && touched.transferPin && errors.transferPin
              }
              placeholderTextColor={COLORS.primaryBlue}
            />
            <CustomButton
              buttonText="Submit"
              onPress={handleSubmit}
              buttonContainerStyle={styles.button}
            />
            <CustomSnackBar show={error || success} message={error || success} success={success ? success: ""} />
            {/* <CustomSnackBar show={success} message={success} success /> */}
          </View>
        )}
      </Formik>

      <View>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <View style={{ marginHorizontal: "5%" }}>
            <FlatList
              ListHeaderComponent={
                <Input
                  icon={
                    <FontAwesome name="search" size={16} color={COLORS.grey} />
                  }
                  placeholder="search"
                  value={searchContacts}
                  onChangeText={(text) => filterContacts(text)}
                />
              }
              data={searchContacts}
              renderItem={({ item, index }) => DisplayPhoneNumber(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default FirstTab;

const styles = StyleSheet.create({
  iconBg: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 5,
  },
  listHeaderContainer: {
    width: "100%",
    paddingHorizontal: "5%",
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondaryBlue2,
  },
  button: {
    marginVertical: 30,
  },
  formError: {
    color: "red",
    fontSize: 10,
    marginTop: -15,
  },
});
