import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { supabase } from '../../lib/superbase';
import { useAuth } from '../../context/AuthContext';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const generateRandomPassword = (length = 12) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
};

export default function ResetPassword() {
    const { user } = useAuth();
    const [email, setEmail] = useState(user ? `${user.email}` : '');
    const [loading, setLoading] = useState(false)

    const handlePasswordReset = async () => {
        setLoading(true);
        try {
            const newPassword = generateRandomPassword();

            const { error: updateError } = await supabase.auth.updateUser({ email, password: newPassword });
            if (updateError) throw updateError;

            // const response = await fetch('http://192.168.196.101:5000/send-reset-password', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email, password: newPassword }),
            // });

            if (!response.ok) throw new Error('Failed to send email');

            Alert.alert('Success', 'Password reset successfully! The new password has been sent to your email.');
        } catch (error) {
            Alert.alert('Error', error.message);
        }finally{
            setLoading(false)
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
                title={loading ? "Sending...":"Reset Password and Send Email"}
                onPress={handlePasswordReset}
                containerStyle="bg-secondary py-3 rounded-full"
                textStyle="text-white"
                disabled={loading}
            />
        </View>
    );
}