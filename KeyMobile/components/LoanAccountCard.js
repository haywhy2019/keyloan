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
} from "react-native";
import { COLORS, SIZES, images, FONTS, GLOBAL_STYLE } from "../../constants";
import { Ionicons } from "@expo/vector-icons";


const LoanDashboardCard = ({ data }) => {
  const [selected, setSelected] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const displayAccount = data[selected];

  const selectHandler = (index) => {
    setSelected(index);
    setModalVisible(false);
  };

  const AllAccountCard = (item, index) => (
    <Pressable onPress={() => selectHandler(index)}>
      <View>
        <View
          style={{
            paddingHorizontal: "5%",
            paddingVertical: 5,
            backgroundColor: COLORS.grey2,
          }}
        >
          <Text style={[GLOBAL_STYLE.h4, { color: COLORS.grey }]}>
            Contact number
          </Text>
          <Text style={GLOBAL_STYLE.h4Bold}>{item.contract_no}</Text>
        </View>
        <View style={styles.allAccountCardContainer}>
          <Image source={images.keyMobileLogoRound} style={styles.logoImage} />

          <View style={{ flexGrow: 1 }}>
            <View style={[GLOBAL_STYLE.rowBetween]}>
              <Text style={styles.amountLabel}>{"Amount outstanding"}</Text>
              <Text style={styles.amount}>
                ₦{item.outstanding_balance}
              </Text>
            </View>

            <View style={[GLOBAL_STYLE.rowBetween]}>
              <Text style={styles.nextPayment}>{"Next payment"}</Text>
              <Text style={styles.nextPayment2}>₦{item.next_repayment}</Text>
            </View>
            <View style={[GLOBAL_STYLE.rowBetween]}>
              <Text style={styles.nextPayment}>{"Date:"}</Text>
              <Text style={styles.nextPaymentDate}>
                {item.next_repayment_Date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    // getView();
  }, []);

  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        style={styles.loanCard}
        source={images.headerImg}
        imageStyle={styles.sliderImage}
      >
        <View style={styles.content}>
          <View style={styles.container1}>
            <View style={styles.container2}>
              <Text style={styles.outStandingText}>Amount outstanding</Text>
              <Text style={styles.outStandingAmount}>
                ₦{displayAccount?.outstanding_balance}
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

          <View style={styles.container3}>
            <View>
              <Text style={styles.contractlabel}>Product</Text>
              <Text style={styles.contractNumber}>
                {displayAccount?.product}
              </Text>
            </View>

            <View>
              <Text style={styles.contractlabel}>Contract Number</Text>
              <Text style={styles.contractNumber}>
                {displayAccount?.contract_no}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.loanCard1}>
        <View style={styles.content}>
          <View style={styles.container1}>
            <View style={styles.container2}>
              <Text style={styles.outStandingText2}>Next Repayment</Text>
              <Text style={styles.outStandingAmount2}>
                ₦{displayAccount?.next_repayment}
              </Text>
            </View>

            <View>
              <Text style={styles.nextPaymentlabel}>Due Date:</Text>
              <Text style={styles.dueDate}>
                {displayAccount?.next_repayment_Date}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={toggleModal}
        >
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
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    // flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    // backgroundColor: 'red'
  },
  loanCard: {
    width: "100%",
    backgroundColor: "rgba(189, 228, 254, 0.17)",
    height: 180,
    borderRadius: 4,
    shadowColor: "rgba(189, 228, 254, 0.5)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4.84,
    elevation: 5,
    marginVertical: 10,
  },
  loanCard1: {
    width: "100%",
    backgroundColor: "rgba(189, 228, 254, 0.17)",
    height: 90,
    borderRadius: 4,
    shadowColor: "rgba(189, 228, 254, 0.5)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4.84,
    elevation: 5,
    marginVertical: 10,
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
    marginVertical: 9,
  },
  container3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 30,
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
  amountLabelHidden: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginLeft: 5,
  },

  outStandingText: {
    color: COLORS.white,
    fontFamily: FONTS.normal,
    fontSize: 12,
    marginLeft: 5,
  },
  outStandingAmount: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 19,
    marginLeft: 6,
  },
  outStandingText2: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
    fontSize: 12,
    marginLeft: 5,
  },
  outStandingAmount2: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    fontSize: 19,
    marginLeft: 6,
  },
  dueDate: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    marginLeft: 6,
  },
  contractlabel: {
    fontSize: 12,
    color: COLORS.grey,
  },
  nextPaymentlabel: {
    fontSize: 12,
    color: COLORS.grey,
    marginLeft: 6,
    textAlign: "right",
  },
  contractNumber: {
    fontSize: 12,
    color: COLORS.white,
  },
  container2: {
    flexDirection: "column",
  },
  iconBg: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: "rgba(163, 216, 245, 0.4)",
    borderRadius: 20,
    opacity: 0.7,
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
    width: 20,
    height: 20,
    marginRight: 20,
  },
  allAccountCardContainer: {
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondaryBlue2,
  },
  accountDetailsContainer: {
    flexDirection: "row",
  },
  amount: {
    color: COLORS.error,
    fontFamily: FONTS.normal,
    fontSize: 12,
  },
  amountLabel: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
    fontSize: 12,
  },
  nextPayment: {
    color: COLORS.grey,
    fontFamily: FONTS.normal,
    fontSize: 12
  
  },
  nextPayment2: {
    // color: COLORS.error,
    fontFamily: FONTS.normal,
    fontSize: 12
  },
  nextPaymentDate: {
    color: COLORS.primaryBlue2,
    fontFamily: FONTS.normal,
    fontSize: 12
  },

  listHeaderText: {
    fontFamily: FONTS.bold,
    color: COLORS.primaryBlue,
    fontSize: 16,
  },
});

export default LoanDashboardCard;
