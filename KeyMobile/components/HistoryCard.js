import { StyleSheet, Text, View, Image } from "react-native";
import React, {useEffect} from "react";
import { COLORS, FONTS, images } from "../../constants";
import { CreditAccountIcon, DebitAccountIcon } from "../../constants/icons";
import { useSelector } from "react-redux";
import moment from "moment";
import { useState } from "react";
const HistoryCard = ({ item }) => {
  const [data, setData] = useState([])
  const selectedAccount = useSelector(
    (state) => state.selectedAccount.accountDetails.accountno
  );
  useEffect(() => {
    setData(item)
  },[item])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageNameContainer}>
        {data?.Craccount == selectedAccount ? (
          <CreditAccountIcon />
        ) : (
          <DebitAccountIcon />
        )}
        <View>
          <Text style={styles.name}>{data?.Craccountname?.slice(0, 16) || "Not Available"}</Text>
          <Text style={styles.narration}>{data?.Narration?.slice(0, 16)  || "Not Available"}</Text>
        </View>
      </View>
      <View>
        {data?.Craccount == selectedAccount ? (
          <Text style={styles.amount}>{`₦${+data?.Amount}`  || "Not Available"}</Text>
        ) : (
          <Text style={[styles.amount, { color: "red" }]}>{`₦${-data?.Amount}`  || "Not Available"}</Text>
        )}

        <Text style={styles.date}>
          {moment(data?.transactiondate).format(" MMM Do YYYY")}
        </Text>
      </View>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(163, 216, 245, 0.2)",
    paddingVertical: 10,
  },
  imageNameContainer: { flexDirection: "row", alignItems: "center" },
  logo: { width: 40, height: 40 },
  name: { marginLeft: 10, color: COLORS.primaryBlue, fontFamily: FONTS.normal },
  amount: {
    color: COLORS.primaryGreen,
    textAlign: "right",
    fontFamily: FONTS.normal,
  },
  date: {
    color: COLORS.primaryBlue,
    textAlign: "right",
    fontFamily: FONTS.normal,
  },
  narration: { marginLeft: 10, color: COLORS.grey, fontFamily: FONTS.normal },
});
