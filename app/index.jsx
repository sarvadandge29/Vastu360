import React from "react";
import { View, Text, Image, StatusBar } from "react-native";
import CustomButton from "../components/CustomButton";
import images from "../constants/images";
import { router } from "expo-router";

const Index = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center bg-F9F7F7">
        <Image source={images.homeImage} />
      </View>

      <View className="flex-1 bg-primary rounded-t-3xl p-6 -mt-10">
        <View className="items-center">
          <Text className="text-white text-3xl font-bold text-center">
            Welcome to the Vastu360
          </Text>
          
          <Text className="text-gray-200 text-center my-20 text-xl">
            Manage and track your property updates with ease and efficiency.
          </Text>
          
          <CustomButton
            title="Continue With Email"
            style="bg-white h-14"
            textStyle="text-lg text-primary"
            onPress={() => router.push("/customer")}
          />
          <StatusBar backgroundColor="#112D4E" barStyle="light-content"/>
        </View>
      </View>
    </View>
  );
};

export default Index;