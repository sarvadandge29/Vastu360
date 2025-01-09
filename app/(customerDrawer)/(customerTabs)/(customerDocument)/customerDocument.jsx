import { View, Text, Button, Alert, SafeAreaView, ScrollView, Linking } from 'react-native';
import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { supabase } from '../../../../lib/superbase';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DocumentCard from '../../../../components/DocumentCard';

const CustomerDocument = () => {
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    addressProof: null,
    aadharCard: null,
    passport: null,
    panCard: null,
    drivingLicense: null,
    voterId: null,
  });
  const [uploading, setUploading] = useState(false);

  const pickDocument = async (documentTypeKey) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true
      });

      if (result.assets) {
        const assests = result.assets[0];
        setForm({ ...form, [documentTypeKey]: assests });
        setFile(assests);
        console.log('Document URI:', assests.uri);
      }
    } catch (err) {
      console.log('Document picking error:', err);
    }
  };

  const handleUpload = async () => {
    try {
      setUploading(true);

      if (!file) {
        Alert.alert("Please select a file to upload");
        return;
      }

      if (!file.uri) {
        Alert.alert("File URI is invalid.");
        return;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = fileName;

      let { data, error } = await supabase.storage
        .from('customer_document')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: 'application/pdf'
        });

      if (error) {
        throw error;
      }

      const { data: uri } = await supabase.storage
        .from("customer_document")
        .getPublicUrl(filePath);

      console.log(uri.publicUrl);

      Alert.alert("File uploaded successfully.");
    } catch (error) {
      Alert.alert("Error uploading file", error.message);
      console.log(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="h-full">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <DocumentCard
            documentType="Address Proof"
            onPress={() => pickDocument('addressProof')}
            selected={form.addressProof}
            selectedFileName={form.addressProof?.name}
          />

          <DocumentCard
            documentType="Aadhar Card"
            onPress={() => pickDocument('aadharCard')}
            selected={form.aadharCard}
            selectedFileName={form.aadharCard?.name}
          />

          <DocumentCard
            documentType="Passport"
            onPress={() => pickDocument('passport')}
            selected={form.passport}
            selectedFileName={form.passport?.name}
          />

          <DocumentCard
            documentType="Pan Card"
            onPress={() => pickDocument('panCard')}
            selected={form.panCard}
            selectedFileName={form.panCard?.name}
          />

          <DocumentCard
            documentType="Driving License"
            onPress={() => pickDocument('drivingLicense')}
            selected={form.drivingLicense}
            selectedFileName={form.drivingLicense?.name}
          />

          <DocumentCard
            documentType="Voter Card"
            onPress={() => pickDocument('voterId')}
            selected={form.voterId}
            selectedFileName={form.voterId?.name}
          />

          <Button
            onPress={handleUpload}
            title='Upload'
          />

        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default CustomerDocument;