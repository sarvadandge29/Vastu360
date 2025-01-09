import { View, Text, SafeAreaView, Button, Image } from 'react-native';
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import images from '../../../constants/images';

const CustomerHome = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView>
      {/* Header Section */}
      <View className="bg-primary py-4 px-4">
        <Text className="text-white font-medium text-4xl">
          Hi {user?.name}
        </Text>
        <Text className="text-white text-xl pt-2">
          Welcome to Your Smart Home
        </Text>
      </View>

      {/* Grid Layout for Buttons with Rounded Buttons */}
      <View className="p-5">
        <View className="flex flex-row justify-between gap-4">
          {/* Documents Button */}
          <View className="w-1/2 items-center">
            <Image
              source={images.documentImage}
              className="mb-2"
              style={{ width: 200, height: 230, resizeMode: 'contain' }}
            />
            <View className="bg-primary rounded-full overflow-hidden">
              <Button
                title="Documents"
                color="#3F72AF"
                onPress={() => handleNavigation('customerDocument')}
              />
            </View>
          </View>

          {/* Chat Button */}
          <View className="w-1/2 items-center">
            <Image
              source={images.communicationImage}
              className="mb-2"
              style={{ width: 200, height: 230, resizeMode: 'contain' }}
            />
            <View className="bg-primary rounded-full overflow-hidden">
              <Button
                title="Chat"
                color="#3F72AF"
                onPress={() => handleNavigation('customerChat')}
              />
            </View>
          </View>
        </View>

        <View className="flex flex-row justify-between gap-4 mt-6">
          {/* Interior Work Button */}
          <View className="w-1/2 items-center">
            <Image
              source={images.interiorWorkImage}
              className="mb-2"
              style={{ width: 200, height: 240, resizeMode: 'contain' }}
            />
            <View className="bg-primary rounded-full overflow-hidden">
              <Button
                title="Interior Work"
                color="#3F72AF"
                onPress={() => handleNavigation('customerInteriorWork')}
              />
            </View>
          </View>

          {/* Construction Updates Button */}
          <View className="w-1/2 items-center">
            <Image
              source={images.updateConstructionImage}
              className="mb-2"
              style={{ width: 200, height: 240, resizeMode: 'contain' }}
            />
            <View className="bg-primary rounded-full overflow-hidden">
              <Button
                title="Construction Updates"
                color="#3F72AF"
                onPress={() => handleNavigation('customerUpdates')}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomerHome;
