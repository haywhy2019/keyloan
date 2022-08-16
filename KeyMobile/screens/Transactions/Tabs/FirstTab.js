import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { HistoryCard,SpinnerImage, BottomNotification } from "../../../components";
import { useSelector } from "react-redux";


const FirstTab = () => {
  const transactionDetail = useSelector(
    (state) => state.transaction.success.transactionReceipts
  );
  const transactionPending = useSelector((state) => state.transaction.loading);
  const transactionError = useSelector((state) => state.transaction.error);

  if (transactionPending == "pending") {
    return <SpinnerImage />;
  }
 
  return (
    <ScrollView style={{ marginVertical: 20 }}>
      {transactionDetail.map((item, index) => (
        <HistoryCard item={item} key={index} />
      ))}
    
    </ScrollView>
  );
};

export default FirstTab;
