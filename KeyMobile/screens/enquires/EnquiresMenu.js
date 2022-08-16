import { View, Text } from 'react-native'
import React from 'react'
import { MenuOptionsCard } from '../../components'
import { GLOBAL_STYLE } from '../../../constants'

const EnquiresMenu = ({navigation}) => {
  return (
    <View style={GLOBAL_STYLE.background}>
    <View style={{marginTop: 15}}>
    <MenuOptionsCard label="Feedback" screen="FeedbackScreen" navigation={navigation}/>
    </View>

     <MenuOptionsCard label="Enquiries" screen="EnquiresScreen" navigation={navigation}/>
     <MenuOptionsCard label="Complaints" screen="ComplaintsScreen" navigation={navigation}/>
     <MenuOptionsCard label="Requests" screen="RequestScreen" navigation={navigation}/>
     <MenuOptionsCard label="Dispute Management" screen="DisputeManagementScreen" navigation={navigation}/>
    </View>
  )
}

export default EnquiresMenu