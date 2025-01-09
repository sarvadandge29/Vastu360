import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FormField from '../../components/FormField';
import { Link, useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { supabase } from '../../lib/superbase';

const SignUpAsCustomer = () => {
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    location: '',
    nameOfSite: '',
    flatno: '',
    flatType: '',
    password: '',
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const resetForm = () => {
    setForm({
      name: '',
      phoneNumber: '',
      email: '',
      location: '',
      nameOfSite: '',
      flatno: '',
      flatType: '',
      password: '',
    });
  }
  const handleSignUp = async () => {
    setLoading(true);

    if (!form.email || !form.password || !form.name || !form.phoneNumber || !form.location || !form.nameOfSite || !form.flatno || !form.flatType) {
      Alert.alert('Error', 'Please fill all required fields.');
      setLoading(false);
      return;
    }

    if (!validatePhoneNumber(form.phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      setLoading(false);  // Ensure loading is set to false here
      return;
    }

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

      if (!userId) {
        Alert.alert('Error', 'User ID not found');
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          display_name: form.name,
          options: {
            data: {
              user_type : "customer"
            },
          }
        },
      });

      if (updateError) {
        Alert.alert('Error', 'Failed to update display name: ' + updateError.message);
        return;
      }

      const { error: dbError } = await supabase.from('customer').insert([{
        userId: userId,
        name: form.name,
        phone_number: form.phoneNumber,
        email: form.email,
        location: form.location,
        name_of_site: form.nameOfSite,
        flat_no: form.flatno,
        flat_type: form.flatType,
        document_upload : false,
      }]);

      if (dbError) {
        Alert.alert('Error', 'Failed to save customer details: ' + dbError.message);
        return;
      }

      router.push("/customerHome");
      resetForm();
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full justify-center flex-1 px-4 my-6 bg-white" style={{ borderBottomColor: '#000' }}>
            <Text className="text-secondary text-2xl font-semibold ">
              Sign Up To Vastu360 As Customer
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
              placeholder="Enter Your Phone Number"
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
              title="Location"
              value={form.location}
              handleChangeText={(e) => setForm({ ...form, location: e })}
              otherStyles="mt-6"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Site Location"
            />

            <FormField
              title="Name Of Site"
              value={form.nameOfSite}
              handleChangeText={(e) => setForm({ ...form, nameOfSite: e })}
              otherStyles="mt-6"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Your Site Name"
            />

            <FormField
              title="Flat Type"
              value={form.flatType}
              handleChangeText={(e) => setForm({ ...form, flatType: e })}
              otherStyles="mt-6"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Your Flat Type"
            />

            <FormField
              title="Flat No."
              value={form.flatno}
              handleChangeText={(e) => setForm({ ...form, flatno: e })}
              otherStyles="mt-6"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Your Flat No."
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
              title={loading ? 'Signing Up...' : 'Sign Up As Customer'}
              containerStyle="bg-secondary rounded-full mt-6 h-12"
              textStyle="text-lg text-white"
              onPress={handleSignUp}
              disabled={loading}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg font-regular text-gray-500">
                Sign Up As Builder?{' '}
                <Link className="text-secondary-100 text-lg font-semibold" href="/sign-up-as-builder">
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

export default SignUpAsCustomer;