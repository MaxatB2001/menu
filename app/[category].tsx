import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const CurrentCategory = () => {
    const {category} = useLocalSearchParams();

  return (
    <View>
      <Text>{category}</Text>
    </View>
  )
}

export default CurrentCategory