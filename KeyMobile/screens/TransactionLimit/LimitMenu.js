import { View, Text } from 'react-native'
import React from 'react'
import { MenuOptionsCard } from '../../components'
import { GLOBAL_STYLE } from '../../../constants'

const EnquiresMenu = ({navigation}) => {
  return (
    <View style={GLOBAL_STYLE.background}>
    <View style={{marginTop: 15}}>
    <MenuOptionsCard label="Transaction PIN" screen="TLimitPin" navigation={navigation}/>
    </View>

     <MenuOptionsCard label="Debit Card" screen="TLimitCard" navigation={navigation}/>
     <MenuOptionsCard label="Indemnity (e-limit)" screen="TLimitIndemnity" navigation={navigation}/>
     <MenuOptionsCard label="Token" screen="TLimitToken" navigation={navigation}/>
    </View>
  )
}

export default EnquiresMenu