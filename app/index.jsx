import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Index = () => {
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Text>Index</Text>
        </View>
        <StatusBar backgroundColor="#000" barStyle="light"/>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Index