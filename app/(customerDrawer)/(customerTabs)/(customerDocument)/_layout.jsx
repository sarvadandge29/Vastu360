import React from 'react'
import { Stack } from 'expo-router'

const CustomerDocumentLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='customerDocument' options={{ headerShown: false }} />
        </Stack>
    )
}

export default CustomerDocumentLayout