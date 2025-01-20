import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import useStore from '../lib/store';

const SitesCard = ({ data }) => {
    const { selectedSite, updateState } = useStore();

    const updateSelectedSite = () => {
        updateState({ selectedSite: data});
        console.log(selectedSite)
    }

    return (
        <SafeAreaView >
            <TouchableOpacity
                onPress={updateSelectedSite}
                className="flex-row w-full bg-white"
            >
                <View className="p-4 rounded-lg shadow-md mb-4">
                    <Text className="text-lg font-bold text-gray-800">{data.site_name}</Text>
                    <Text className="text-sm text-gray-600">Location: {data.site_city}</Text>
                    <Text className="text-sm text-gray-600">{data.site_area}</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SitesCard