import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FormField from '../../components/FormField';
import { Link, router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { supabase } from '../../lib/superbase';

const SignUpAsBuilder = () => {
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    nameOfCompany: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setForm({
      name: '',
      phoneNumber: '',
      email: '',
      nameOfCompany: '',
      password: '',
    });
  };

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;

    if (!form.email || !form.password || !form.name || !form.phoneNumber || !form.nameOfCompany) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return false;
    }

    if (!phoneRegex.test(form.phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        Alert.alert('Sign-Up Failed', authError.message);
        return;
      }

      const userId = authData?.user?.id;

      const { error: dbError } = await supabase.from('builder').insert([
        {
          user_id: userId,
          name: form.name,
          phone_number: form.phoneNumber,
          email: form.email,
          name_of_company: form.nameOfCompany,
        },
      ]);

      if (dbError) {
        Alert.alert('Error', 'Failed to save builder details: ' + dbError.message);
        return;
      }

      router.push("/builderHome");
      resetForm();
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full justify-center flex-1 px-4 my-6 bg-white">
            <Text className="text-secondary text-2xl font-semibold">Sign Up To Vastu360 As Builder</Text>

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
              placeholder="Enter Your 10-digit Phone Number"
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
              handleChangeText={(e) => setForm({ ...form, nameOfCompany: e })}
              otherStyles="mt-6"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Your Company Name"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-6"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Password"
            />

            <CustomButton
              title={loading ? 'Signing Up...' : 'Sign Up As Builder'}
              containerStyle="bg-secondary rounded-full mt-5 h-12"
              textStyle="text-lg text-white"
              onPress={handleSignUp}
              disable={loading}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg font-regular text-gray-500">
                Sign Up As Customer?{' '}
                <Link className="text-secondary-100 text-lg font-semibold" href="/sign-up-as-customer">
                  Sign Up
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

export default SignUpAsBuilder;
