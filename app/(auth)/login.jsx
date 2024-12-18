import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="bg-white w-full justify-center flex-1 px-4 my-6">

            <Text className="text-secondary text-3xl font-extrabold">
              Welcom Back To Vastu360
            </Text>

            {/*Email Input Section*/}
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
              textStyle="text-base text-gray-500 font-medium mb-2"
              placeholder="Enter Your Email"
            />

            {/*Password Input Section*/}
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              secureTextEntry
              textStyle="text-base text-gray-500 font-medium mb-2"
              placeholder="Enter Your Password"
            />

            <CustomButton
              title="Log In"
              containerStyle="bg-secondary rounded-full mt-10 h-12"
              textStyle="text-lg text-white"
            />

            {/*Footer Section*/}
            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-black font-regular">
                Don't have an account?
              </Text>

              <Link
                href="/sign-up-as-customer"
                className="text-lg font-semibold text-secondary-100"
              >
                Signup
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Login