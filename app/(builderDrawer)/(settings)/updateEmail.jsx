import { View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../../../lib/superbase';
import { useAuth } from '../../../context/AuthContext';
import FormField from '../../../components/FormField';
import CustomButton from '../../../components/CustomButton';
import icons from '../../../constants/icons';
import { useRouter } from 'expo-router';

const UpdateEmail = () => {
    const { user } = useAuth();
    const [form, setForm] = useState({
        newEmail: '',
        password: '',
    });
    const router = useRouter();

    const handleUpdateEmail = async () => {
        if (!form.newEmail || !form.password) {
            Alert.alert('Error', 'Please fill in both fields');
            return;
        }

        try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: form.password,
            });

            if (authError) {
                Alert.alert('Error', 'Wrong password, unable to verify.');
                return;
            }

            const { error: authUpdateError } = await supabase.auth.updateUser({
                email: form.newEmail,
            });

            if (authUpdateError) {
                Alert.alert('Error', 'Failed to update email in Auth system.');
                return;
            }

            const { error: customerUpdateError } = await supabase
                .from('customer')
                .update({ email: form.newEmail })
                .eq('id', user.id);

            if (customerUpdateError) {
                Alert.alert('Error', 'Failed to update email in customer database.');
                return;
            }

            Alert.alert('Success', 'Email updated successfully!');
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred.');
        }
    };

    return (
        <View className="flex-1 justify-center px-6 py-4 bg-white">

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

            <View className="flex-1 justify-center">

                <Text className="text-3xl font-bold text-center mb-8">Update Email</Text>

                <FormField
                    title="New Email"
                    value={form.newEmail}
                    handleChangeText={(e) => setForm({ ...form, newEmail: e })}
                    otherStyles="mt-6"
                    secureTextEntry={false}
                    textStyle="text-base text-gray-500 font-medium"
                    placeholder="Enter New Email"
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
                    title="Update Email"
                    containerStyle="bg-secondary py-3 mt-6 rounded-full"
                    onPress={handleUpdateEmail}
                    textStyle="text-white font-bold"
                />
            </View>
        </View>
    );
};

export default UpdateEmail;
