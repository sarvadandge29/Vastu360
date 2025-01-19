import React from 'react'
import { Stack } from 'expo-router'

const BuilderDocumentLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='builderDocument' options={{ headerShown: false }} />
    </Stack>
  )
}

export default BuilderDocumentLayout