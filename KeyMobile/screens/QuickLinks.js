import { View, Text,  StyleSheet,ScrollView,
    ImageBackground,
    TouchableOpacity,
    Keyboard, } from 'react-native'
import React from 'react'
import { StatusBar } from "expo-status-bar";
import MenuOptionsCard from '../components/MenuOptionCards';

const QuickLinks = () => {
  return (
    <ScrollView style={styles.container}>

    
    
    <StatusBar style="light" />
    <MenuOptionsCard  label="Open Account"/>
    <MenuOptionsCard  label="Reactivate Account"/>
    <MenuOptionsCard  label="Notifications"/>
    <MenuOptionsCard  label="FAQ"/>
    <MenuOptionsCard  label="Enquiries & Complaints"/>
    <MenuOptionsCard  label="Locate Us"/>
    <MenuOptionsCard  label="Contact Us"/>
    <MenuOptionsCard  label="Oxygen Chat"/>

 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default QuickLinks