import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import icons from '../constants/icons';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType, textStyle, autoCapitalize}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className={`${textStyle}`}>{title}</Text>
            <View className="h-16 px-4 items-center flex-row rounded-full" style={{ backgroundColor: '#D9D9D9' }}>
                <TextInput
                    className="flex-1 text-gray-500 font-semibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={(title === 'Password' || title === "") && !showPassword}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                />
                {(title === 'Password' || title === "") && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image 
                            source={!showPassword ? icons.eye : icons.eyeHide}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
