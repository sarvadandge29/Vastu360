import { View, Text } from 'react-native'
import React from 'react'

import "../global.css";
import { Stack } from 'expo-router';
import { SupabaseProvider } from '../context/SupabaseContext';

const RootLayout = () => {
  return (
    <SupabaseProvider>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(customerTabs)' options={{ headerShown: false }} />
        <Stack.Screen name='(builderTabs)' options={{ headerShown: false }} />
      </Stack>
    </SupabaseProvider>

  )
}

export default RootLayout