import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';

const DocumentCard = ({ documentType, onPress, selected, selectedFileName, buttonTittle }) => {
    return (
        <SafeAreaView className="flex-row items-center justify-between rounded-lg p-4 my-2 bg-white">
            <View className="flex-1 pr-4">
                <Text className="text-xl text-gray-900 font-bold">
                    {documentType}
                </Text>
                {selected && (
                    <Text className="text-sm text-gray-600 mt-1">
                        Selected:{" "}
                        <Text
                            className="font-medium"
                            numberOfLines={1} // Truncate the text to one line
                            ellipsizeMode="tail" // Add ellipsis if text is too long
                        >
                            {selectedFileName}
                        </Text>
                    </Text>
                )}
            </View>
            <TouchableOpacity
                onPress={onPress}
                className="bg-secondary-100 px-4 py-2 rounded-full"
                accessibilityLabel={`${selected ? `Change ${documentType}` : `Upload ${documentType}`}`}
                accessible={true}
                style={{ maxWidth: '40%' }}
            >
                <Text className="text-white font-semibold text-center">
                    {selected ? 'Change' : `${buttonTittle}`}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default DocumentCard;
