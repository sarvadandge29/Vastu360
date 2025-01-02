import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext'

const customerhome = () => {
  const { user } = useAuth();
  return (
    <SafeAreaView className="">
      {/*Header Section*/}
      <View className="bg-primary py-2 px-2">
        <Text className="text-white font-medimum text-4xl">
          Hi {user.name}
        </Text>
        <Text className="text-white text-xl pt-2">
          Welcome to Your Smart Home
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default customerhome