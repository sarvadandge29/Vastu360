import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';

const DocumentCard = ({ documentType, onPress, selected, selectedFileName }) => {
    return (
        <SafeAreaView className="flex-row items-center justify-between bg-slate-950 rounded-lg shadow-md p-4 my-2">
            <View>
                <Text className="text-lg text-gray-800 font-bold flex-1">{documentType}</Text>
                {selected && (
                    <Text>Selected file name {selectedFileName}</Text>
                )}
            </View>
            <TouchableOpacity
                onPress={onPress}
                className="bg-secondary-100 px-4 py-2 rounded-full"
                accessibilityLabel={`${selected ? `Change ${documentType}` : `Upload ${documentType}`
                    }`}
                accessible={true}
            >
                <Text className="text-white font-semibold">
                    {selected ? 'Change' : 'Select'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default DocumentCard;
