import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants'

const Text = (props) => {
  return (
    <Text {...props} style={[{fontFamily:  FONTS.normal}, props.style]}>{props.children}</Text>

  )
}

export default Text

const styles = StyleSheet.create({})