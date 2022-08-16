import { View, Text , StyleSheet} from "react-native";
import React from "react";
// import { TransactionIcon } from "../../constants/icons";
import { COLORS } from "../../constants";

const TransactionsCard = ({item}) => {
  return (
    <View
      style={styles.container1}
    >
      {/* <TransactionIcon /> */}
      <View
        style={styles.container2}
      >
        <View
          style={styles.container3}
        >
          <Text style={styles.ref}>
            {item.ref}
          </Text>
          <Text style={styles.detail}>
            {item.detail}
          </Text>
        </View>

        <View
          style={styles.container4}
        >
          <Text
            style={styles.amount}
          >
            {item.amount}
          </Text>
          <Text
            style={styles.date}
          >
            {item.date}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
container1: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.secondaryBlue,
    paddingHorizontal: 10,
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 10,
  },
  container3: { flexDirection: "column", justifyContent: "space-between" },
  container4: { flexDirection: "column", justifyContent: "space-between" },
  ref: { fontSize: 14, color: COLORS.primaryBlue },
  detail: { fontSize: 11, color: COLORS.grey },
  amount: {
    textAlign: "right",
    color: COLORS.primaryGreen,
    fontSize: 14,
  },
  date: {
    textAlign: "right",
    fontSize: 11,
    color: COLORS.primaryBlue,
  }


})

export default TransactionsCard;
