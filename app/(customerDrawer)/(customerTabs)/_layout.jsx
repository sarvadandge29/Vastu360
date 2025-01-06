import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import icons from '../../../constants/icons';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="items-center justify-center gap-y-1 flex-column" style={{ paddingTop: 28 }}>
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                style={{ width: 36, height: 36 }}
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
                name="customerDocument"
                options={{
                    title: "Document",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={icons.document} color={color} name="Document" focused={focused} />
                    ),
                }}
            />

            <Tabs.Screen
                name="customerChat"
                options={{
                    title: "Chat",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={icons.chat} color={color} name="Chat" focused={focused} />
                    ),
                }}
            />

            <Tabs.Screen
                name="customerInteriorWork"
                options={{
                    title: "Interior Work",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={icons.interiorWork} color={color} name="Interior Work" focused={focused} />
                    ),
                }}
            />

            <Tabs.Screen
                name="customerUpdates"
                options={{
                    title: "Construction Updates",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={icons.updateIcon} color={color} name="Updates" focused={focused} />
                    ),
                }}
            />

        </Tabs>
    );
};

export default CustomerTabLayout;
