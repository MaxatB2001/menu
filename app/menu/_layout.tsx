import { View, Text } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'

const MenuLayout = () => {
  return (
    <View>
      <Text>MenuLayout</Text>
      <Slot/>
    </View>
  )
}

export default MenuLayout