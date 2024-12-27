import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FormField from '../../components/FormField';
import { Link } from 'expo-router';
import CustomButton from '../../components/CustomButton';


const SignUpAsBulider = () => {
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    nameOfCompany:'',
    password : '',
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full justify-center flex-1 px-4 my-6 bg-white" style={{ borderBottomColor: "#000" }}>

            <Text className="text-secondary text-2xl font-semibold ">
              Sign Up To Vastu360 As Bulider
            </Text>

            <FormField
              title="Name"
              value={form.name}
              handleChangeText={(e) => setForm({ ...form, name: e })}
              otherStyles="mt-6"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Your Name"
            />

            <FormField
              title="Phone Number"
              value={form.phoneNumber}
              handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
              otherStyles="mt-6"
              keyboardType="phone-pad"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Your Phone Number of 10 digit"
            />

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-6"
              keyboardType="email-address"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Your Email"
            />


            <FormField
              title="Name Of Company"
              value={form.nameOfCompany}
              handleChangeText={(e) => setForm({ ...form, nameOfSite: e })}
              otherStyles="mt-6"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Your Site Name"
            />
            {/*onclick on Name Of Company the all Name Of Company should pop same*/}
            

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-6"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Password"
            />

            <CustomButton
              title="Sign Up As Builder"
              containerStyle="bg-secondary rounded-full mt-5 h-12"
              textStyle="text-lg text-white"
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg font-regular text-gray-500">
                Sign Up As Customer?{' '}
                <Link className="text-secondary-100 text-lg font-semibold" href="/sign-up-as-customer">
                  SignUp
                </Link>
              </Text>
            </View>

            <View className="justify-center flex-row gap-2">
              <Text className="text-lg font-regular text-gray-500">
                Already have an account?{' '}
                <Link className="text-secondary-100 text-lg font-semibold" href="/login">
                  Login
                </Link>
              </Text>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};


export default SignUpAsBulider