import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const SettingsLayout = () => {
  return (
      <Stack>
        <Stack.Screen name='settings' options={{ headerShown : false}}/>
        <Stack.Screen name='changePassword' options={{ headerShown : false}}/>
        <Stack.Screen name='resetPassword' options={{ headerShown : false}}/>
        <Stack.Screen name='profileUpdate' options={{ headerShown : false}}/>
        <Stack.Screen name='updateEmail' options={{ headerShown : false}}/>
    </Stack>
  )
}

export default SettingsLayout