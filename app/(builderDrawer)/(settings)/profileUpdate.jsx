import React, { useState } from 'react';
import { Text, Alert, ScrollView, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../../lib/superbase';
import { useAuth } from '../../../context/AuthContext';
import CustomButton from '../../../components/CustomButton';
import FormField from '../../../components/FormField';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import icons from "../../../constants/icons"

const ProfileUpdate = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user.name,
    phoneNumber: user.phone_number,
    location: user.location,
    nameOfSite: user.name_of_site,
    flatno: user.flat_no,
    flatType: user.flat_type,
    password: '',
  });
  
  const router = useRouter();

  const handleUpdateProfile = async () => {
    const phoneRegex = /^[0-9]{10}$/;

    if (!form.name || !form.phoneNumber || !form.location || !form.nameOfSite || !form.flatno || !form.flatType || !form.password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!phoneRegex.test(form.phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return false;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: form.password,
      });

      if (authError) {
        Alert.alert('Error', 'Wrong Password');
        return;
      }

      const { error } = await supabase
        .from('builder')
        .update({
          name: form.name,
          phone_number: form.phoneNumber,
        })
        .eq('id', user.id);

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Profile updated successfully!');
        router.push('/settings');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while updating the profile.');
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="h-full bg-white px-3">
        <TouchableOpacity
          className="flex flex-row items-center mt-3 mb-5"
          onPress={() => router.back()}
        >
          <Image
            source={icons.back}
            className="w-12 h-12 mr-2"
          />
          <Text className="ml-2 text-xl font-medium">Back</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text className="text-2xl font-bold mt-6 text-center">Update Profile</Text>

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
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-6"
            secureTextEntry={true}
            textStyle="text-base text-gray-500 font-medium"
            placeholder="Enter Your Password"
          />

          <CustomButton
            title="Update Profile"
            containerStyle="bg-secondary-100 py-2 mt-6 rounded-full"
            onPress={handleUpdateProfile}
            textStyle="text-white font-bold"
          />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ProfileUpdate;
