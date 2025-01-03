import React from 'react';
import "../global.css";
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(customerDrawer)" options={{ headerShown: false }} />
        <Stack.Screen name="(builderTabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
