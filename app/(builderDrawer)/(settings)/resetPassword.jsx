import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { supabase } from '../../../lib/superbase';
import { useAuth } from '../../../context/AuthContext';
import FormField from '../../../components/FormField';
import CustomButton from '../../../components/CustomButton';
import emailjs from 'emailjs-com';
import Constants from "expo-constants";
import icons from '../../../constants/icons';
import { useRouter } from 'expo-router';

export const emailjsServiceId = Constants.expoConfig.extra.emailjsServiceId;
export const emailjsTemplateId = Constants.expoConfig.extra.emailjsTemplateId;
export const emailjsPublicKey = Constants.expoConfig.extra.emailjsPublicKey;

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
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const sendEmail = async (newPassword, email, userName) => {
        try {
            const result = await emailjs.send(
                emailjsServiceId,
                emailjsTemplateId,
                {
                    'to_name': userName,
                    "from_name": "Vastu360",
                    email,
                    message: `This is a static message ${newPassword}`,
                },
                emailjsPublicKey
            );
        } catch (err) {
            Alert.alert('EmailJS Request Failed...', err.message);
        }
    };

    const handlePasswordReset = async () => {
        setLoading(true);
        try {
            const newPassword = generateRandomPassword();

            const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
            if (updateError) throw updateError;

            const userName = user ? user.name : "User";

            await sendEmail(newPassword, email, userName);

            Alert.alert('Success', 'Password reset successfully! The new password has been sent to your email.');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 p-4 bg-white">
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
                    title={loading ? "Sending..." : "Reset Password and Send Email"}
                    onPress={handlePasswordReset}
                    containerStyle="bg-secondary py-3 rounded-full"
                    textStyle="text-white"
                    disabled={loading}
                />
            </View>
        </View>
    );
}
