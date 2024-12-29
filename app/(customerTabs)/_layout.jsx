import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import icons from '../../constants/icons';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="items-center justify-center gap-y-1 flex-column" style={{paddingTop : 28}}>
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                style={{width : 36, height : 36}}
            />
            <Text
                className={`${focused ? 'font-semibold' : 'font-normal'} w-full`}
                style={{
                    fontSize: 10,
                    color,
                }}
            >
                {name}
            </Text>
        </View>
    );
};

const CustomerTabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#E2E9F7",
                tabBarInactiveTintColor: "#A4A8B3",
                tabBarStyle: {
                    backgroundColor: "#112D4E",
                    height: 60,
                },
            }}
        >
            <Tabs.Screen
                name="customerHome"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
                    ),
                }}
            />

            <Tabs.Screen
                name="customerProfile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />
                    ),
                }}
            />

        </Tabs>
    );
};

export default CustomerTabLayout;
