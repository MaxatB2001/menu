import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const success = () => {
    useEffect(() => {
        console.warn("TEST")
    }, [])
  return (
    <View>
      <Text>success</Text>
    </View>
  )
}

export default success