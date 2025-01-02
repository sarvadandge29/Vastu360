import { View, Text, Image, StatusBar, ActivityIndicator } from "react-native";
import CustomButton from "../components/CustomButton";
import images from "../constants/images";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Index = () => {
  const { user, userType, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (userType === "customer") {
        router.push("/customerHome");
      } else if (userType === "builder") {
        router.push("/builderHome");
      }
    }
  }, [loading, userType]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#112D4E" />
        <Text>Loading...</Text>
      </View>
    );
  }

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
            onPress={() => router.push("/login")}
          />
          <StatusBar backgroundColor="#112D4E" barStyle="light-content" />
        </View>
      </View>
    </View>
  );
};

export default Index;
