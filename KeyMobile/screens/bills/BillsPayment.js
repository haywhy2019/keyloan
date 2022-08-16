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
import { GLOBAL_STYLE, COLORS, FONTS } from "../../../constants";
import {
  DropDownInput,
  Input,
  CustomButton,
  SpinnerImage,
  CustomSnackBar,
  BottomNotification,
} from "../../components";
import { useSelector } from "react-redux";
import { thousandOperator } from "../../../utilities/thousandOperator";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import ToggleSwitch from "toggle-switch-react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import uuid from "react-native-uuid";
import { BillsReceipt } from "../../components";
import getUserHook from "../../../utilities/hooks/getUserHook";
import { validateTPinAction } from "../../../utilities/redux/keyMobile/axiosService/sendMoney";
import {
  billCategoryOptionAction,
  billItemsAction,
  billPaymentAction,
  billValidateAction,
} from "../../../utilities/redux/keyMobile/axiosService/billsPayment";

const BillsPayment = ({ navigation, route }) => {
  const { id, inputAmount } = route.params;
  console.log(id);
  const [user] = getUserHook();
  const [errors, setErrors] = useState("");

  const [netWork, setNetwork] = useState("");
  const [srcAccount, setSrcAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [billOptions, setBillOptions] = useState("");
  const [billPackage, setBillPackage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPackage, setModalPackage] = useState(false);
  const [selectBill, setSelectBill] = useState("");
  const [selectPackage, setSelectPackage] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [customerName, setCustomerName] = useState("");
const [notice, setNotice]  = useState(false);
const [showReceipt, setShowReceipt]  = useState(false);
  const [saveToBill, setSaveToBill] = useState(false);
  const [billerInfo, setBillerInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [editAmount, setEditAmount]  = useState(false);


  const { accounts, phoneno, email, CustomerName } = useSelector(
    (state) => state.auth.user
  );

  const validationSchema = Yup.object().shape({
    account: Yup.number().required("Required"),
    bill: Yup.object().required("Required"),
    package: Yup.object().required("Required"),
    amount: Yup.string().required("Required"),
    cardNo: Yup.string().required("Required"),
    // transferPin: Yup.number().required("Required"),
  });

  const validationSchema2 = Yup.object().shape({
    account: Yup.number().required("Required"),
    bill: Yup.object().required("Required"),
    package: Yup.object().required("Required"),
    amount: Yup.string().required("Required"),
    cardNo: Yup.string().required("Required"),
    // transferPin: Yup.number().required("Required"),
  });

  const toggleSwitch = () => setSaveToBill(!saveToBill);
  const toggleModal = () => setModalVisible(!modalVisible);
  const toggleModalPackage = () => setModalPackage(!modalPackage);

  const getBillOptions = () => {
    setLoading(true);
    billCategoryOptionAction(id)
      .then((res) => {
        console.log(res, "res");
        if (res.status == 200) {
          setBillOptions(res.data);
        } else {
          setErrors("An error occured");
        }
      })
      .catch((err) => {
        console.log(err, "err");
        setErrors(err.message || "An error occured");
      })
      .finally(() => setLoading(false));
  };
  console.log(billOptions, "bill options", selectBill.billerid);
  const getBillItem = (billerid) => {
    setLoading(true);
    billItemsAction(billerid)
      .then((res) => {
        console.log(res, "item res");
        if (res.status == 200) {
          setBillPackage(res.data.paymentitems);
        } else {
          setError("An error occured. cant't fetch package");
        }
      })
      .catch((err) => {
        setError(err.message || "An error occured. cant't fetch package");
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (id) {
      getBillOptions();
    }
  }, []);

  console.log(billPackage, "package");

  const selectBillOption = (item) => {
    setSelectBill(item);
    setModalVisible(false);
    getBillItem(item.billerid);
  };
  const selectBillPackage = (item) => {
    setModalPackage(false);
    setSelectPackage(item);
  };

  const DisplayBillOptions = (item, index) => {
    return (
      <Pressable
        style={{
          paddingVertical: 15,
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.primaryBlue,
          height: 60,
        }}
        onPress={() => selectBillOption(item)}
      >
        <View
          style={[GLOBAL_STYLE.rowBetween, { justifyContent: "flex-start" }]}
        >
          <Text style={[GLOBAL_STYLE.h2, { color: COLORS.primaryBlue2 }]}>
            {item.billername}
          </Text>
        </View>
      </Pressable>
    );
  };

  const DisplayBillPackage = (item, index) => {
    return (
      <Pressable
        style={{
          paddingVertical: 15,
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.primaryBlue,
          height: 60,
        }}
        onPress={() => selectBillPackage(item)}
      >
        <View
          style={[GLOBAL_STYLE.rowBetween, { justifyContent: "flex-start" }]}
        >
          <Text style={[GLOBAL_STYLE.h2, { color: COLORS.primaryBlue2 }]}>
            {item.paymentitemname}
          </Text>
        </View>
      </Pressable>
    );
  };

  const transactionReceipt = () => {
 setNotice(false)
 setShowReceipt(true)
  }

  useEffect(() => {
if(inputAmount){
  setEditAmount(true)
}
  },[])
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
          bill: selectBill,
          package: selectPackage,
          cardNo: cardNo,
          amount: selectPackage.amount > 0
            ? thousandOperator(selectPackage.amount)
            : amount,
          // transferPin: "",
        }}
        enableReinitialize={true}
        validationSchema={customerName ? validationSchema2 : validationSchema}
        onSubmit={(values) => {
         
          const id = uuid.v4();
          const tPinPayload = {
            ID: 0,
            username: user,
            RequestID: id,
            Tpin: values.transferPin,
          };
          const payload = {
            username: user,
            paymentname: selectPackage.paymetItemName,
            billerName: selectBill.billername,
            billerid: selectBill.billerid,
            Source: "mobile",
            AccountNo: srcAccount,
            customerId: values.cardNo,
            customerMobile: phoneno,
            customerEmail: email,
            amount: selectPackage.amount,
            requestReference: id,
            CustomerName: CustomerName,
          };
          const verifyPayload = {
            customerId: values.cardNo,
            paymentCode: selectBill.paymentCode,
          };
         
          Keyboard.dismiss();
          setLoading(true);
          setError("");
          setSuccess("");
          if (customerName) {
            validateTPinAction(tPinPayload)
              .then((res) => {
              
                if (res?.data?.ResponseCode == "00") {
                  billPaymentAction(payload)
                    .then((res) => {
                     
                      if (res?.data?.responseCode == "00") {
                       
                        setSuccess(res.data.responseMessage);
                        setNotice(true)
                      } else {
                      
                        setError(res.data.responseMessage);
                      }
                    })
                    .catch((err) => {
                   
                      setError(
                        res.data.ResponseDescription || "An error occured"
                      );
                    })
                    .finally(() => setLoading(false));
                } else {
                  setError(res.data.ResponseMessage || "An error occured");
                  setLoading(false);
                }
              })
              .catch((err) => {
                setError(err.message || "An error occured");
                setLoading(false);
              });
          } else {
            billValidateAction(verifyPayload)
              .then((res) => {
              
                if (res.data.ResponseStatus == "00") {
                
                  setCustomerName(res.data);
                } else {
                  setError(res.data.ResponseMsg);
                }
              })
              .catch((err) => {
                setError("An error occured");
              })
              .finally(() => setLoading(false));
          }
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
        }) => {
          return (
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
              <Input
                placeholder="Bill category"
                editable={false}
                onBlur={handleBlur("bill")}
                value={values.bill.billername}
                error={errors.bill && touched.bill && errors.bill}
                placeholderTextColor={COLORS.primaryBlue}
                icon={
                  <FontAwesome
                    name="chevron-down"
                    size={16}
                    color={COLORS.grey}
                    onPress={() => setModalVisible(true)}
                  />
                }
              />
              {selectBill ? (
                <View>
                  <Input
                    placeholder="Biller package"
                    editable={false}
                    onBlur={handleBlur("package")}
                    value={values.package.paymentitemname}
                    error={errors.package && touched.package && errors.package}
                    placeholderTextColor={COLORS.primaryBlue}
                    icon={
                      <FontAwesome
                        name="chevron-down"
                        size={16}
                        color={COLORS.grey}
                        onPress={() => setModalPackage(true)}
                      />
                    }
                  />
                  <Input
                    placeholder="Card number"
                    onChangeText={(text) => setCardNo(text)}
                    onBlur={handleBlur("cardNo")}
                    keyboardType="numeric"
                    value={values.cardNo}
                    error={errors.cardNo && touched.cardNo && errors.cardNo}
                    placeholderTextColor={COLORS.primaryBlue}
                  />
                  <Input
                    placeholder="Amount"
                    onChangeText={(text) => setAmount(text)}
                    onBlur={handleBlur("amount")}
                    keyboardType="numeric"
                    value={values.amount}
                    error={errors.amount && touched.amount && errors.amount}
                    placeholderTextColor={COLORS.primaryBlue}
                    editable={editAmount}
                  />

                  <View
                    style={[
                      GLOBAL_STYLE.rowBetween,
                      { justifyContent: "flex-end" },
                    ]}
                  >
                    <ToggleSwitch
                      isOn={saveToBill}
                      onColor={COLORS.primaryBlue}
                      offColor={COLORS.primaryBlue2}
                      label="Select beneficiary"
                      labelStyle={{
                        color: COLORS.primaryBlue,
                        fontWeight: "900",
                      }}
                      size="small"
                      onToggle={toggleSwitch}
                    />
                  </View>

                  {customerName ? (
                    <View>
                      <Input
                        // placeholder="Amount"
                        value={customerName.FullName}
                        editable={false}
                      />
                      <Input
                        placeholder="Transfer Pin"
                        keyboardType="numeric"
                        onChangeText={handleChange("transferPin")}
                        onBlur={handleBlur("transferPin")}
                        value={values.transferPin}
                        error={
                          errors.transferPin &&
                          touched.transferPin &&
                          errors.transferPin
                        }
                        placeholderTextColor={COLORS.primaryBlue}
                      />
                      <CustomButton
                        buttonText="Confirm"
                        onPress={handleSubmit}
                        buttonContainerStyle={styles.button}
                      />
                    </View>
                  ) : (
                    <CustomButton
                      buttonText="Submit"
                      onPress={handleSubmit}
                      buttonContainerStyle={styles.button}
                    />
                  )}
                </View>
              ) : null}
            </View>
          );
        }}
      </Formik>
      <View>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <View style={{ marginHorizontal: "5%" }}>
            <FlatList
              data={billOptions}
              renderItem={({ item, index }) => DisplayBillOptions(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
      </View>
      <View>
        <Modal
          visible={modalPackage}
          animationType="slide"
          onRequestClose={toggleModalPackage}
        >
          <View style={{ marginHorizontal: "5%" }}>
            <FlatList
              data={billPackage}
              renderItem={({ item, index }) => DisplayBillPackage(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
      </View>
      <BillsReceipt 
      show={showReceipt}
      item={success}
      onPress={() => navigation.replace("Home")}
      />

      <CustomSnackBar show={error} message={error} />
      <BottomNotification 
      show={notice}
      headerText="Transaction Successful"
      infoText={`you have successfully sent ${success.amount} to ${success.CustomerName}`}
      onPress={transactionReceipt}
      buttonText={"Continue"}
      />
     
    </ScrollView>
  );
};

export default BillsPayment;

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
