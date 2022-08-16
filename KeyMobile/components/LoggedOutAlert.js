import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Dialog } from "react-native-simple-dialogs";
import { useSelector } from 'react-redux';


const LoggedOutAlert = ({header, mesg,show}) => {
const [visible, setVisible] = useState(false)

const loggedOut = useSelector(state => state.loggedOut)

useEffect(() => {


},[])
  return (
     <Dialog
    visible={show}
    title={header}
    onTouchOutside={() => setShowDialog(false)} >
    <View>
       <Text>{mesg}</Text>
    </View>
</Dialog>
  )
}

export default LoggedOutAlert

const styles = StyleSheet.create({})