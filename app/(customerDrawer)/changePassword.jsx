import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import FormField from "../../components/FormField";
import CustomButton from '../../components/CustomButton';
import { supabase } from '../../lib/superbase';
import { useAuth } from '../../context/AuthContext';

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const { user } = useAuth();
    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            Alert.alert('Error', 'New passwords do not match.');
            return;
        }

        try {
            setLoading(true);
            if (!user) {
                Alert.alert('Error', 'User not authenticated.');
                return;
            }

            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: currentPassword,
            });

            if (signInError) {
                throw new Error('Current password is invalid.');
            }

            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) throw error;

            Alert.alert('Success', 'Password changed successfully!');
        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong.');
        }finally{
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center mx-2">
            <Text className="text-3xl text-primary font-extrabold text-center mb-4">Change Password</Text>
            <Text className="text-red-600">All Fields are required *</Text>
            <FormField
                placeholder="Current Password"
                value={currentPassword}
                handleChangeText={setCurrentPassword}
                title=""
            />
            <FormField
                placeholder="New Password"
                value={newPassword}
                handleChangeText={setNewPassword}
                title=""
            />
            <FormField
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                handleChangeText={setConfirmNewPassword}
                title=""
            />
            <CustomButton
                title={loading ? "Changing..." : "Proceed"}
                onPress={handleChangePassword}
                containerStyle="bg-secondary py-3 rounded-full mt-6"
                textStyle="text-white"
                disable={loading}
            />
        </View>
    );
}
