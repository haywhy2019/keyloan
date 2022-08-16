import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  Modal,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  CustomButton,
  AccountCard,
  Input,
  DropDownInput,
  BottomNotification,
  SpinnerImage,
  CustomSnackBar,
  InputAmount,
} from "../components";
import NumberFormat from "react-number-format";
import { PaymentSummary, PaymentReceipt } from "../components";
import { COLORS, GLOBAL_STYLE, FONTS, images, SIZES } from "../../constants";
import { useSelector } from "react-redux";
import { ChangeLimitIcon } from "../../constants/icons";
import { beneficiaryListAction } from "../../utilities/redux/keyMobile/axiosService/beneficiaryList";
import { bankListAction } from "../../utilities/redux/keyMobile/axiosService/bankList";
import { accountNameAction } from "../../utilities/redux/keyMobile/axiosService/accountNameEnq";
import getUserHook from "../../utilities/hooks/getUserHook";
import uuid from "react-native-uuid";
import { thousandOperator } from "../../utilities/thousandOperator";
import ToggleSwitch from "toggle-switch-react-native";
import {
  sendMoneyKeyStoneAction,
  sendMoneyOthersAction,
  validateTPinAction,
} from "../../utilities/redux/keyMobile/axiosService/sendMoney";
import Cleave from "cleave.js/react";

const transferTypeData = [
  { label: "Own Account", value: "Own Account" },
  { label: "Keystone Bank", value: "Keystone Bank" },
  { label: "Other Banks", value: "Other Banks" },
  // { label: "Multiple Transfer", value: "Multiple Transfer" },
  // { label: "Phone Number", value: "Phone Number" },
  // { label: "Foriegn Transfer", value: "Foriegn Transfer" },
];

const SendMoney = ({ navigation }) => {
  const [user] = getUserHook();
  const [crAccountName, setCrAccountName] = useState("");
  const [drAccountName, setDrAccountName] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [transferType, setTransferType] = useState("");
  const [selectedOwnAcct, SetSelectedOwnAcct] = useState("");
  const [sourceAcct, SetSourceAcct] = useState("");
  const [beneficiaryAcct, SetBeneficiaryAcct] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [formatedAmount, setFormatedAmount] = useState(null);
  const [narration, setNarration] = useState("");
  const [addBeneficiary, setAddBeneficiary] = useState(false);
  const [useBeneficiary, setUseBeneficiary] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [beneficiary, setBeneficiary] = useState([]);
  const [beneficaryLoading, setBeneficiaryLoading] = useState(false);
  const [beneficaryErr, setBeneficiaryErr] = useState(false);
  const [transferPin, setTransferPin] = useState("");
  const [transferSuccess, setTransferSuccess] = useState("");
  const [transferErr, setTransferErr] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPaymentReceipt, setShowPaymentReceipt] = useState(false);
  const [errors, setErrors] = useState({});

  const amountRef = useRef(null).current;
  // const customerDetails = useSelector((state) => state.auth.user);
  const {
    accounts,
    DailyUtilizedLimit,
    dailytranslimit,
    bvn,
    transactionlimit,
  } = useSelector((state) => state.auth.user);

  const selectedAccount = useSelector(
    (state) => state.selectedAccount.accountDetails
  );

  const toggleAddBeneficiary = () => setAddBeneficiary(!addBeneficiary);
  const toggleModal = () => {
    if (useBeneficiary) {
      setUseBeneficiary(false);
      setTransferType("");
      SetBeneficiaryAcct("");
      setCrAccountName("");
      setBankName("");
    } else {
      setUseBeneficiary(true);
      setModalVisible(!modalVisible);
    }
  };

  const hidePaymentSummary = () => {
    setShowPaymentSummary(false);
  };
  const selectHandler = (index, item) => {
    setModalVisible(false);
    if (item.accountname !== "An Error occured") {
      SetBeneficiaryAcct(beneficiary[index].accountnumber);
      setBankDetails();
      setBankName(beneficiary[index]);
      setUseBeneficiary(true);
      setCrAccountName(beneficiary[index].accountname);
    } else {
      setUseBeneficiary(false);
    }
  };

  const handleShowReceipt = () => {
    setSuccess(false);
    setShowPaymentReceipt(true);
  };

  const AllAccountCard = (item, index) => {
    // item.accountname == "An Error occured" ? setModalVisible(false) :
    return (
      <Pressable onPress={() => selectHandler(index, item)}>
        <View>
          <View style={styles.allAccountCardContainer}>
            <Image
              source={images.keyMobileLogoRound}
              style={styles.logoImage}
            />
            <View>
              <Text style={styles.accountNameText}>{item.accountname}</Text>
              <View style={styles.accountDetailsContainer}>
                <Text style={styles.accountTypeText}>{item.bankname}</Text>
                <Text style={styles.accountNoText}>{item.accountnumber}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  const id = uuid.v4();
  const transactionSummaryHandler = () => {
    if (useBeneficiary) {
      if (bankName.bankname == "Keystone Bank") {
        setTransferType("Keystone Bank");
      } else {
        setTransferType("Other Bank");
      }
    }

    if (!selectedAccount) {
      return setErrors({ sourceAcct: "Required" });
    }
    if (!transferType) {
      return setErrors({ transferType: "Required" });
    }
    if (!beneficiaryAcct) {
      return setErrors({ beneficiaryAcct: "Required" });
    }
    if (!bankName && transferType == "Other Banks") {
      return setErrors({ bankName: "Required" });
    }
    if (!amount) {
      return setErrors({ amount: "Required" });
    }
    setErrors({});
    setShowPaymentSummary(true);
  };

  const sendTransactionHandler = () => {
    let payload;
    if (transferType == "Other Banks") {
      payload = {
        sendername: selectedAccount.accountname,
        amount: amount,
        crbvn: "string",
        beneaccount: beneficiaryAcct,
        benename: crAccountName,
        savebene: addBeneficiary,
        source: "mobile",
        sessionid: "string",
        benebank: bankName,
        senderbvn: bvn,
        transactiontype: transferType,
        transref: id,
        tconfirm: transferPin,
        requestid: id,
        accountno: selectedAccount.accountno,
        narration: narration,
        bvn: "string",
        sourceoffunds: "string",
        bankcode: bankDetails.BankCode,
        username: user,
      };
    } else {
      payload = {
        craccountno: beneficiaryAcct,
        requestid: id,
        billerId: "string",
        amount: amount,
        draccountno: selectedAccount.accountno,
        billerItemid: "string",
        source: "mobile",
        userName: user,
        billerName: "string",
        transactionType: transferType,
        charges: 0,
        transref: id,
        narration: narration,
        craccountname: crAccountName,
        customerIdentifier: "string",
        draccountname: selectedAccount.accountname,
        billerItemName: "string",
        telco: "string",
        Usernetwork: "string",
        savebene: addBeneficiary,
      };
    }

    const validatePayload = {
      ID: 0,
      username: user,
      RequestID: id,
      Tpin: transferPin,
    };
    setLoading(true);
    validateTPinAction(validatePayload)
      .then((res) => {
        if (res.data.ResponseCode == "00") {
          setTransferErr("");
          if (transferType == "Other Banks") {
            sendMoneyOthersAction(payload)
              .then((res) => {
                if (res.data.ResponseCode == "00") {
                  setTransferSuccess(res.dat);
                  hidePaymentSummary(true);
                  setSuccess(true);
                } else {
                  setTransferErr(res.data.statusmessage);
                  setTransferPin("");
                
                }
              })
              .catch((err) => {
                setTransferErr(err.message || "An erro occured");
                setTransferPin("");
                setCrAccountName("");
              })
              .finally(() => setLoading(false));
          } else {
            sendMoneyKeyStoneAction(payload)
              .then((res) => {
                if (res.data.status == "00") {
                  setTransferSuccess(res.data);
                  hidePaymentSummary(true);
                  setSuccess(true);
                } else {
                  hidePaymentSummary(true);
                  setTransferErr(res.data.statusmessage);
                  setCrAccountName("");
                  setTimeout(() => {
                    setTransferPin("");
                    setTransferErr("");
                  }, 4000);
                }
              })
              .catch((err) => {
                setTransferErr(err.message || "An erro occured");
                setCrAccountName("");
                setTransferPin("");
              })
              .finally(() => setLoading(false));
          }
        } else {
          setLoading(false);
          setTransferErr(res.data.ResponseDescription);
          setTransferPin("");
          setCrAccountName("");
        }
      })
      .catch((err) => {
        setLoading(false);
        setTransferErr(err.message || "An error occured");
        setTransferPin("");
      });
  };

  const getBenficiary = () => {
    setBeneficiaryLoading(true);
    beneficiaryListAction(user)
      .then((res) => {
        if (res.status == 200) {
          setBeneficiary(res.data);
        } else {
          setBeneficiary([
            { accountname: "An Error occured", bankname: "Try again" },
          ]);
        }
      })
      .catch((err) => {
        setBeneficiary([
          { accountname: "An Error occured", bankname: "Try again" },
        ]);
      })
      .finally(() => setBeneficiaryLoading(false));
  };

  const getBank = () => {
    bankListAction()
      .then((res) => {
        if (res.status == 200) {
          setBankList(res.data);
        } else {
          setBankList([
            { BankName: "An error occured", BankCode: "An error occured" },
          ]);
        }
      })
      .catch((err) => {
        setBankList([
          { BankName: "An error occured", BankCode: "An error occured" },
        ]);
      });
  };
  let checkAccountNo = /^\d{10}$/;
  const getAccountName = () => {
    const payload = {
      requestid: id,
      accountno: beneficiaryAcct,
      source: "mobile",
      bankcode: transferType == "Other Banks" ? bankName?.BankCode : "082",
      username: user,
    };
    setLoading(true);
    accountNameAction(payload)
      .then((res) => {
        if (res.data.status == "00") {
          setCrAccountName(res.data.accountname);
        } else {
          setCrAccountName("An error occured");
        }
      })
      .catch((err) => {
        console.log(err, "errorrr")
        setCrAccountName("An error occured");
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (user) {
      getBenficiary();
    }

    if (beneficiaryAcct.match(checkAccountNo)) {
      if (!useBeneficiary && bankName) {
        getAccountName();
      }
      if (!useBeneficiary && transferType == "Keystone Bank") {
        getAccountName();
      }
    }
  }, [user, beneficiaryAcct, useBeneficiary, bankName]);

  useEffect(() => {
    getBank();
  }, []);

  if (loading) {
    return <SpinnerImage />;
  }
  return (
    <ScrollView contentContainerStyle={GLOBAL_STYLE.scrollViewGlobalNopadding}>
      <View style={{ marginVertical: 10 }}>
       
        <AccountCard data={accounts} />
        {!selectedAccount && (
          <Text style={styles.formError}>Please select source account</Text>
        )}
      </View>
      <View style={{ paddingHorizontal: "5%", marginBottom: 20 }}>
        <View style={{ marginTop: 10, marginBottom: 30 }}>
          <View style={[GLOBAL_STYLE.rowBetween, { marginBottom: 7 }]}>
            <View style={GLOBAL_STYLE.rowBetween}>
              <Text style={GLOBAL_STYLE.h4}>Daily Limit: </Text>
              <Text style={GLOBAL_STYLE.h4Bold}>
                ₦{thousandOperator(transactionlimit)}
              </Text>
            </View>

            <Pressable
              style={{
                width: SIZES.responsiveWidth("35%"),
                backgroundColor: COLORS.primaryBlue2,
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate("TLimitMenu")}
            >
              <Text
                style={[
                  GLOBAL_STYLE.h4Bold,
                  { color: "white", textAlign: "center" },
                ]}
              >
                Change Limit
              </Text>
            </Pressable>
          </View>

          <View style={styles.showLimitContainer}></View>
          <View
            style={[styles.showAmountSpentContainer, { width: "5%" }]}
          ></View>

          <View style={GLOBAL_STYLE.rowBetween}>
            <Text style={GLOBAL_STYLE.h4Bold}> spent</Text>
            <Text style={[GLOBAL_STYLE.h4Bold, { color: COLORS.grey }]}>
              ₦{thousandOperator(transactionlimit - DailyUtilizedLimit)}
            </Text>
          </View>
        </View>

        {useBeneficiary ? null : (
          <DropDownInput
            // label="Transfer Type"
            data={transferTypeData}
            placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
            labelField="label"
            valueField="value"
            placeholder={"Select transfer type"}
            value={transferType}
            onChange={(item) => {
              setTransferType(item.value);
            }}
            error={errors.transferType}
          />
        )}

        <View style={[GLOBAL_STYLE.rowBetween, styles.selectBeneficiary]}>
          <ToggleSwitch
            isOn={useBeneficiary}
            onColor={COLORS.primaryBlue}
            offColor={COLORS.primaryBlue2}
            label="Select Beneficiary"
            labelStyle={GLOBAL_STYLE.h4}
            size="small"
            onToggle={toggleModal}
          />
        </View>
        {transferType == "Own Account" ? (
          <DropDownInput
            label={crAccountName ? crAccountName : ""}
            data={accounts.filter(
              (item) => item.accountno != selectedAccount.accountno
            )}
            labelCustomStyle={styles.inputLabel}
            labelField="accountno"
            valueField="accountno"
            placeholder="Beneficiary account"
            value={beneficiaryAcct}
            placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
            onChange={(item) => {
              SetBeneficiaryAcct(item.accountno);
              setCrAccountName(item.accountname);
            }}
            error={errors.beneficiaryAcct}
          />
        ) : transferType == "Keystone Bank" && !useBeneficiary ? (
          <Input
            label={crAccountName ? crAccountName : ""}
            placeholder="Beneficiary Account"
            value={beneficiaryAcct}
            onChangeText={(text) => SetBeneficiaryAcct(text)}
            keyBoardType="numeric"
            error={errors.beneficiaryAcct}
            placeholderTextColor={COLORS.primaryBlue}
          />
        ) : useBeneficiary ? (
          <View>
            <Input
              label={crAccountName ? crAccountName : ""}
              placeholder="Beneficiary Account"
              value={beneficiaryAcct}
              error={errors.beneficiaryAcct}
              placeholderTextColor={COLORS.primaryBlue}
            />

            <Input
              // label="Bank name "
              placeholder="Beneficiary Bank"
              value={bankName.bankname}
              error={errors.bankName}
            />
          </View>
        ) : (
          <View>
            <Input
              label={crAccountName ? crAccountName : ""}
              placeholder="Beneficiary account"
              value={beneficiaryAcct}
              onChangeText={(text) => SetBeneficiaryAcct(text)}
              keyboardType="numeric"
              error={errors.beneficiaryAcct}
              placeholderTextColor={COLORS.primaryBlue}
            />

            <DropDownInput
              // label="Bank name"
              data={bankList}
              labelField="BankName"
              valueField="BankCode"
              search
              placeholder={bankName ? bankName : "Select bank"}
              placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
              value={bankName}
              onChange={(item) => {
                setBankName(item.BankName);
                setBankDetails(item);
              }}
              getInputRef={amountRef}
              error={errors.bankName}
            />
          </View>
        )}

        <NumberFormat
          value={amount}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value) => (
            <Input
              placeholder="Enter amount"
              onChangeText={(text) => setAmount(text)}
              value={value}
              placeholderTextColor={COLORS.primaryBlue}
              error={errors.amount}
              keyboardType="numeric"
              icon={
                <Text style={{ color: COLORS.primaryBlue2 }}>{"\u20A6"}</Text>
              }
            />
          )}
        />


        <Input
          // label="Transaction Narrative"
          placeholder="Description"
          value={narration}
          onChangeText={(text) => setNarration(text)}
          placeholderTextColor={COLORS.primaryBlue}
        />
        <View style={[GLOBAL_STYLE.rowBetween, styles.selectBeneficiary]}>
          <ToggleSwitch
            isOn={addBeneficiary}
            onColor={COLORS.primaryBlue}
            offColor={COLORS.primaryBlue2}
            label="Save Beneficiary"
            labelStyle={GLOBAL_STYLE.h4}
            size="small"
            onToggle={toggleAddBeneficiary}
          />
        </View>
        <CustomSnackBar show={transferErr} message={transferErr} />
        <CustomButton
          buttonText={"Send"}
          // onPress={() => setShowPaymentSummary(true)}
          onPress={transactionSummaryHandler}
          buttonContainerStyle={{ marginVertical: 20 }}
        />
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
              data={beneficiary}
              renderItem={({ item, index }) => AllAccountCard(item, index)}
              keyExtractor={(item, index) => index}
            />
          </Modal>
        </View>
      </View>

      <PaymentSummary
        show={showPaymentSummary}
        close={hidePaymentSummary}
        onPress={sendTransactionHandler}
        accountNo={beneficiaryAcct}
        accountName={crAccountName}
        amount={amount}
        narration={narration}
        value={transferPin}
        onChangeText={(text) => setTransferPin(text)}
        bankName={transferType == "Other Banks" ? bankName : "Keystone Bank"}
      />

      <BottomNotification
        show={success}
        hide={() => null}
        headerText={"Transfer Successful"}
        infoText={`you have successfully sent ₦${transferSuccess.amount} to ${transferSuccess.craccountno}`}
        buttonText={"Continue"}
        onPress={handleShowReceipt}
      />

      <PaymentReceipt
        show={showPaymentReceipt}
        item={transferSuccess}
        onPress={() => navigation.replace("SendMoneyScreen")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  selectBeneficiary: {
    justifyContent: "flex-end",
    alignItems: "center",
    // marginTop: -20,
  },
  selectBeneficiaryText: {
    color: COLORS.primaryBlue,
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
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  formError: {
    color: "red",
    fontSize: 10,
    paddingHorizontal: "5%",
  },
});
export default SendMoney;
