import { View, Text, Button, Alert, SafeAreaView, ScrollView, ActivityIndicator, Pressable, Linking } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { supabase } from '../../../../lib/superbase';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DocumentCard from '../../../../components/DocumentCard';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const CustomerDocument = () => {
  const { user } = useAuth();
  const isUploaded = user?.document_upload;
  const userId = user?.userId;
  const [fileData, setFileData] = useState(null);
  const navigation = useNavigation();

  const [selectDoc, setSelectDoc] = useState({
    addressProof: null,
    aadharCard: null,
    passport: null,
    panCard: null,
    drivingLicense: null,
    voterId: null,
    loanApprovalLetter: null,
    loanDisburesmentStatement: null,
    payemntReceipt: null
  });

  const [form, setForm] = useState({
    addressProofUri: null,
    aadharCardUri: null,
    passportUri: null,
    panCardUri: null,
    drivingLicenseUri: null,
    voterIdUri: null,
    loanApprovalLetterUri: null,
    loanDisburesmentStatementUri: null,
    payemntReceiptUri: null
  })
  const [uploading, setUploading] = useState(false);

  const pickDocument = async (documentTypeKey) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true
      });

      if (result.assets) {
        const assests = result.assets[0];
        setSelectDoc({ ...selectDoc, [documentTypeKey]: assests });
      }
    } catch (err) {
      console.log('Document picking error:', err);
    }
  };

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const { data, error } = await supabase
          .from('customerDocument')
          .select('*')
          .eq('customerId', userId);

        if (error) {
          Alert.alert('Error fetching data:', error.message);
          return null;
        }

        if (data && data[0]) {
          setFileData(data[0]);
          setForm({
            addressProofUri: data[0].addressProof,
            aadharCardUri: data[0].aadharCard,
            passportUri: data[0].passport,
            panCardUri: data[0].panCard,
            drivingLicenseUri: data[0].drivingLicense,
            voterIdUri: data[0].voterId,
            loanApprovalLetterUri: data[0].loanApprovalLetter,
            loanDisburesmentStatementUri: data[0].loanDisburesmentStatement,
            payemntReceiptUri: data[0].payemntReceipt,
          });
          console.log(form)
        }
      } catch (error) {
        console.error("Error fetching file data:", error.message);
      }
    };

    if (isUploaded) {
      fetchFileData();
    }
  }, [isUploaded]);

  const uploadDocument = async () => {
    try {
      setUploading(true);

      const requiredDocs = [
        'addressProof',
        'aadharCard',
        'passport',
        'panCard',
        'drivingLicense',
        'voterId',
        'loanApprovalLetter',
        'loanDisburesmentStatement',
        'payemntReceipt',
      ];

      const missingDocs = requiredDocs.filter((doc) => !selectDoc[doc]);
      if (missingDocs.length > 0) {
        Alert.alert(
          "Missing Documents",
          `Please upload the following documents: ${missingDocs.join(', ')}`
        );
        return;
      }

      const uploadedFiles = {};

      for (const [key, file] of Object.entries(selectDoc)) {
        if (!file?.uri) {
          Alert.alert(`${key} file URI is invalid.`);
          return;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${key}_${user.name}_${user.email}.${fileExt}`;

        let { error } = await supabase.storage
          .from('customer_document')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: 'application/pdf',
          });

        if (error) {
          Alert.alert(`Error uploading ${key}`, error.message);
          return;
        }

        const { data: uri } = await supabase.storage
          .from('customer_document')
          .getPublicUrl(fileName);

        if (!uri?.publicUrl) {
          Alert.alert(`Error generating public URL for ${key}`);
          return;
        }

        uploadedFiles[key] = uri.publicUrl;

        setForm((prevForm) => ({
          ...prevForm,
          [`${key}Uri`]: uri.publicUrl,
        }));
      }

      Alert.alert("All documents uploaded successfully!");
    } catch (error) {
      Alert.alert("Error uploading files", error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveDocument = async () => {
    try {
      setUploading(true);

      await uploadDocument();

      const isComplete = Object.values(form).every((uri) => uri !== null);
      if (!isComplete) {
        Alert.alert(
          "Incomplete Data",
          "Please ensure all documents are uploaded before saving."
        );
        return;
      }

      const { error: dbError } = await supabase.from('customerDocument').insert([{
        customerId: user.userId,
        addressProof: form.addressProofUri,
        aadharCard: form.aadharCardUri,
        passport: form.passportUri,
        panCard: form.panCardUri,
        drivingLicense: form.drivingLicenseUri,
        voterId: form.voterIdUri,
        loanApprovalLetter: form.loanApprovalLetterUri,
        loanDisburesmentStatement: form.loanDisburesmentStatementUri,
        payemntReceipt: form.payemntReceiptUri,
      },
      ]);

      if (dbError) {
        console.error("Error inserting data:", dbError.message);
        Alert.alert("Error saving data", dbError.message);
        return;
      }


      Alert.alert("Data saved successfully!");
    } catch (error) {
      Alert.alert("Error saving data", error.message);
      console.error("Error during save:", error.message);
    } finally {
      setUploading(false);
    }
  };

  const viewDocument = (uri) => {
    if (!uri) {
      Alert.alert("Error", "Document URI is invalid or unavailable.");
      return;
    }

    try {
      Linking.openURL(uri);
    } catch (error) {
      Alert.alert("Error", "Unable to open the document.");
      console.error("Error opening document:", error.message);
    }
  };

  const handleNavigateToBuilderDocument = useCallback(() => {
    navigation.navigate('builderDocument');
  }, [navigation]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="h-full px-2">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {isUploaded ? (
            <>
              <Text className="text-lg font-semibold">Uploaded Documents:</Text>
              <DocumentCard
                buttonTittle="View"
                documentType="Address Proof"
                onPress={() => { () => viewDocument(form.addressProofUri) }}
                selectedFileName={fileData?.addressProof?.split('/').pop()}
              />
              <DocumentCard
                buttonTittle="View"
                documentType="Aadhar Card"
                onPress={() => viewDocument(form.aadharCardUri)}
                selectedFileName={fileData?.aadharCard?.split('/').pop()}
              />
              <DocumentCard
                buttonTittle="View"
                documentType="Passport"
                onPress={() => viewDocument(form.passportUri)}
                selectedFileName={fileData?.passport?.split('/').pop()}
              />
              <DocumentCard
                buttonTittle="View"
                documentType="Pan Card"
                onPress={() => viewDocument(form.panCardUri)}
                selectedFileName={fileData?.panCard?.split('/').pop()}
              />
              <DocumentCard
                buttonTittle="View"
                documentType="Driving License"
                onPress={() => viewDocument(form.drivingLicenseUri)}
                selectedFileName={fileData?.drivingLicense?.split('/').pop()}
              />
              <DocumentCard
                buttonTittle="View"
                documentType="Voter Card"
                onPress={() => viewDocument(form.voterIdUri)}
                selectedFileName={fileData?.voterId?.split('/').pop()}
              />
              <DocumentCard
                buttonTittle="View"
                documentType="Loan Approval Letter"
                onPress={() => viewDocument(form.loanApprovalLetterUri)}
                selectedFileName={fileData?.loanApprovalLetter?.split('/').pop()}
              />
              <DocumentCard
                buttonTittle="View"
                documentType="Loan Disbursement Statement"
                onPress={() => viewDocument(form.loanDisburesmentStatementUri)}
                selectedFileName={fileData?.loanDisburesmentStatement?.split('/').pop()}
              />
              <DocumentCard
                buttonTittle="View"
                documentType="Payment Receipts"
                onPress={() => viewDocument(form.payemntReceiptUri)}
                selectedFileName={fileData?.payemntReceipt?.split('/').pop()}
              />
            </>
          ) : (
            <>
              <Text className="text-lg font-semibold">You can only once upload document</Text>
              <DocumentCard
                buttonTittle="Select"
                documentType="Address Proof"
                onPress={() => pickDocument('addressProof')}
                selected={selectDoc.addressProof}
                selectedFileName={selectDoc.addressProof?.name}
              />

              <DocumentCard
                buttonTittle="Select"
                documentType="Aadhar Card"
                onPress={() => pickDocument('aadharCard')}
                selected={selectDoc.aadharCard}
                selectedFileName={selectDoc.aadharCard?.name}
              />

              <DocumentCard
                buttonTittle="Select"
                documentType="Passport"
                onPress={() => pickDocument('passport')}
                selected={selectDoc.passport}
                selectedFileName={selectDoc.passport?.name}
              />

              <DocumentCard
                buttonTittle="Select"
                documentType="Pan Card"
                onPress={() => pickDocument('panCard')}
                selected={selectDoc.panCard}
                selectedFileName={selectDoc.panCard?.name}
              />

              <DocumentCard
                buttonTittle="Select"
                documentType="Driving License"
                onPress={() => pickDocument('drivingLicense')}
                selected={selectDoc.drivingLicense}
                selectedFileName={selectDoc.drivingLicense?.name}
              />

              <DocumentCard
                buttonTittle="Select"
                documentType="Voter Card"
                onPress={() => pickDocument('voterId')}
                selected={selectDoc.voterId}
                selectedFileName={selectDoc.voterId?.name}
              />

              <DocumentCard
                buttonTittle="Select"
                documentType="Loan Approval Letter"
                onPress={() => pickDocument('loanApprovalLetter')}
                selected={selectDoc.loanApprovalLetter}
                selectedFileName={selectDoc.loanApprovalLetter?.name}
              />

              <DocumentCard
                buttonTittle="Select"
                documentType="Loan Disbursement Statement"
                onPress={() => pickDocument('loanDisburesmentStatement')}
                selected={selectDoc.loanDisburesmentStatement}
                selectedFileName={selectDoc.loanDisburesmentStatement?.name}
              />

              <DocumentCard
                buttonTittle="Select"
                documentType="Payment Receipts"
                onPress={() => pickDocument('payemntReceipt')}
                selected={selectDoc.payemntReceipt}
                selectedFileName={selectDoc.payemntReceipt?.name}
              />

              {uploading ? (
                <View className="flex-row items-center justify-center py-4 space-x-2">
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text className="text-blue-600 font-medium">Documents are uploading...</Text>
                </View>
              ) : (
                <Button
                  onPress={handleSaveDocument}
                  title="Save Document"
                  disabled={uploading}
                />
              )}
            </>
          )}

          <Text
            onPress={handleNavigateToBuilderDocument}
            className="text-center font-bold text-2xl text-secondary-100 mt-4"
          >
            View Builder Document
          </Text>


        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default CustomerDocument;