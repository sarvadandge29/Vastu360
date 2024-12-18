import React from "react";
import { TouchableOpacity, Text, SafeAreaView } from "react-native";

const CustomButton = ({ title, onPress, style, textStyle, containerStyle }) => (
    <SafeAreaView className={`w-full items-center justify-center ${containerStyle}`}>
        <TouchableOpacity
            className={`rounded-full min-h-[62px] justify-center items-center ${style}`}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <Text className={`font-bold text-center ${textStyle}`}> {title} </Text>
        </TouchableOpacity>
    </SafeAreaView>
);

export default CustomButton;
