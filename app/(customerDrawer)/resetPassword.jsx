import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../../lib/superbase';
import { useAuth } from '../../context/AuthContext';
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

export default function ResetPassword() {
    const { user } = useAuth();
    const [email, setEmail] = useState(`${user.email}`);

    const handlePasswordReset = async () => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email);
            if (error) throw error;
            Alert.alert('Success', 'Password reset email sent!');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View className="flex-1 justify-center p-4 bg-white">
            <Text className="text-3xl text-primary font-extrabold text-center">Reset Password</Text>
            <FormField
                placeholder="Enter Your Email"
                value={email}
                handleChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                otherStyles="mb-6"
            />
            <CustomButton
                title="Send Reset Email"
                onPress={handlePasswordReset}
                containerStyle="bg-secondary py-3 rounded-full"
                textStyle="text-white"
            />
        </View>
    );
}