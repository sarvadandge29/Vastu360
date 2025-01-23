import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { supabase } from '../../../lib/superbase';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';

const Settings = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout', onPress: async () => {
            try {
              await supabase.auth.signOut();
              router.push('/login');
            } catch (error) {
              console.error('Error logging out:', error);
            }
          }
        },
      ]
    );
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-3xl font-bold mb-4 pb-1 border-b-2 border-slate-500">Settings</Text>

      <TouchableOpacity
        className="py-2 mb-4 flex-row"
        onPress={() => router.push('/changePassword')}
      >
        <View className="justify-start items-center flex-row gap-2">
          <Text className="text-2xl font-semibold">Change Password</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="py-2 mb-4 flex-row"
        onPress={() => router.push('/resetPassword')}
      >
        <View className="justify-center items-center flex-row">
          <Text className="text-2xl font-semibold">Reset Password</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="py-2 mb-4 flex-row"
        onPress={() => router.push('/profileUpdate')}
      >
        <View className="justify-start items-center flex-row gap-2">
          <Text className="text-2xl font-semibold">Update Profile</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="py-2 mb-4 flex-row"
        onPress={() => router.push('/updateEmail')}
      >
        <View className="justify-center items-center flex-row">
          <Text className="text-2xl font-semibold">Update Email</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="py-2 mb-4 flex-row"
        onPress={handleLogout}
      >
        <View className="justify-center items-center flex-row">
          <Text className="text-2xl font-semibold">Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
