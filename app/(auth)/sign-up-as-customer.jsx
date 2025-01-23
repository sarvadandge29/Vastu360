import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FormField from '../../components/FormField';
import { Link, useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { supabase } from '../../lib/superbase';
import { Picker } from '@react-native-picker/picker';

const SignUpAsCustomer = () => {
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    location: '',
    siteCity: '',
    siteArea: '',
    siteId: '',
    nameOfSite: '',
    flatno: '',
    flatType: '',
    password: '',
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [sitesCity, setSitesCity] = useState([]);
  const [sitesArea, setSitesArea] = useState([]);
  const [sitesName, setSitesName] = useState([]);
  const [sitesFlatType, setSitesFlatType] = useState([]);

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const resetForm = () => {
    setForm({
      name: '',
      phoneNumber: '',
      email: '',
      siteCity: '',
      siteArea: '',
      siteId: '',
      nameOfSite: '',
      flatno: '',
      flatType: '',
      password: '',
    });
  }

  useEffect(() => {
    const fetchSiteCity = async () => {
      try {
        const { data, error } = await supabase.from('sites').select('site_city', { distinct: true });
        if (error) {
          Alert.alert('Error', 'Failed to fetch site cities: ' + error.message);
        } else {
          setSitesCity(data.map((item) => item.site_city));
        }
      } catch (err) {
        Alert.alert('Error', 'Something went wrong while fetching site cities.');
      }
    };

    fetchSiteCity();
  }, []);

  const handleCityChange = async (selectedCity) => {
    setForm({ ...form, siteCity: selectedCity, siteArea: '', nameOfSite: '', flatType: '' });
    setSitesArea([]);
    setSitesName([]);
    setSitesFlatType([]);

    try {
      const { data, error } = await supabase
        .from('sites')
        .select('site_area', { distinct: true })
        .eq('site_city', selectedCity);

      if (error) {
        Alert.alert('Error', 'Failed to fetch site areas: ' + error.message);
      } else {
        setSitesArea(data.map((item) => item.site_area));
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching site areas.');
    }
  };

  const handleAreaChange = async (selectedArea) => {
    setForm({ ...form, siteArea: selectedArea, nameOfSite: '', flatType: '' });
    setSitesName([]);
    setSitesFlatType([]);

    try {
      const { data, error } = await supabase
        .from('sites')
        .select('site_name', { distinct: true })
        .eq('site_city', form.siteCity)
        .eq('site_area', selectedArea);

      if (error) {
        Alert.alert('Error', 'Failed to fetch site names: ' + error.message);
      } else {
        setSitesName(data.map((item) => item.site_name));
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching site names.');
    }
  };

  const handleSiteNameChange = async (selectedSiteName) => {
    setForm({ ...form, nameOfSite: selectedSiteName, flatType: '', siteId: '' });
    setSitesFlatType([]);

    try {
      const { data, error } = await supabase
        .from('sites')
        .select('flatType, siteID')
        .eq('site_city', form.siteCity)
        .eq('site_area', form.siteArea)
        .eq('site_name', selectedSiteName);

      if (error) {
        Alert.alert('Error', 'Failed to fetch flat types: ' + error.message);
      } else if (data && data.length > 0) {
        const flatTypeOptions = data[0].flatType.map((type) => ({
          type,
          siteId: data[0].siteID,
        }));
        setSitesFlatType(flatTypeOptions);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleFlatTypeChange = (selectedFlatType) => {
    const selectedFlat = sitesFlatType.find((item) => item.type === selectedFlatType);
    setForm({ ...form, flatType: selectedFlatType, siteId: selectedFlat?.siteId || '' });
  };

  const handleSignUp = async () => {
    setLoading(true);

    if (!form.email || !form.password || !form.name || !form.phoneNumber || !form.nameOfSite || !form.flatno || !form.flatType) {
      Alert.alert('Error', 'Please fill all required fields.');
      setLoading(false);
      return;
    }

    if (!validatePhoneNumber(form.phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      setLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        Alert.alert('Sign-Up Failed', authError.message);
        return;
      }

      const userId = authData?.user?.id;

      if (!userId) {
        Alert.alert('Error', 'User ID not found');
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          display_name: form.name,
          options: {
            data: {
              user_type: "customer"
            },
          }
        },
      });

      if (updateError) {
        Alert.alert('Error', 'Failed to update display name: ' + updateError.message);
        return;
      }

      const { error: dbError } = await supabase.from('customer').insert([{
        userId: userId,
        name: form.name,
        phone_number: form.phoneNumber,
        email: form.email,
        siteCity: form.siteCity,
        siteArea: form.siteArea,
        siteId: form.siteId,
        name_of_site: form.nameOfSite,
        flat_no: form.flatno,
        flat_type: form.flatType,
        document_upload: false,
      }]);

      if (dbError) {
        Alert.alert('Error', 'Failed to save customer details: ' + dbError.message);
        return;
      }

      router.push("/customerHome");
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full justify-center flex-1 px-4 my-6 bg-white">
            <Text className="text-secondary text-2xl font-semibold ">
              Sign Up To Vastu360 As Customer
            </Text>

            <FormField
              title="Name"
              value={form.name}
              handleChangeText={(e) => setForm({ ...form, name: e })}
              otherStyles="mt-6"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Your Name"
            />

            <FormField
              title="Phone Number"
              value={form.phoneNumber}
              handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
              otherStyles="mt-6"
              keyboardType="phone-pad"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Your Phone Number"
            />

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-6"
              keyboardType="email-address"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Your Email"
            />

            {/* City Picker */}
            <Text className="text-base text-gray-500 font-medium mt-6">City</Text>
            <View className="h-16 px-4 flex-row items-center rounded-full" style={{ backgroundColor: '#D9D9D9' }}>

              <Picker
                selectedValue={form.siteCity}
                style={{ flex: 1, color: '#7b7b8b' }}
                onValueChange={handleCityChange}
              >
                <Picker.Item label="Select a city" value="" />
                {sitesCity.map((city, index) => (
                  <Picker.Item key={index} label={city} value={city} />
                ))}
              </Picker>
            </View>

            {/* Area Picker */}
            <Text className="text-base text-gray-500 font-medium mt-6">Area</Text>
            <View className="h-16 px-4 flex-row items-center rounded-full" style={{ backgroundColor: '#D9D9D9' }}>

              <Picker
                selectedValue={form.siteArea}
                onValueChange={handleAreaChange}
                style={{ flex: 1, color: '#7b7b8b' }}
                enabled={!!form.siteCity}
              >
                <Picker.Item label="Select an area" value="" />
                {sitesArea.map((area, index) => (
                  <Picker.Item key={index} label={area} value={area} />
                ))}
              </Picker>
            </View>

            {/* Site Name Picker */}
            <Text className="text-base text-gray-500 font-medium mt-6">Site Name</Text>
            <View className="h-16 px-4 flex-row items-center rounded-full" style={{ backgroundColor: '#D9D9D9' }}>
              <Picker
                selectedValue={form.nameOfSite}
                onValueChange={handleSiteNameChange}
                style={{ flex: 1, color: '#7b7b8b' }}
                enabled={!!form.siteArea}
              >
                <Picker.Item label="Select a site name" value="" />
                {sitesName.map((site, index) => (
                  <Picker.Item key={index} label={site} value={site} />
                ))}
              </Picker>
            </View>

            {/* Flat Type Picker */}
            <Text className="text-base text-gray-500 font-medium mt-6">Flat Type</Text>
            <View className="h-16 px-4 flex-row items-center rounded-full" style={{ backgroundColor: '#D9D9D9' }}>
              <Picker
                selectedValue={form.flatType}
                style={{ flex: 1, color: '#7b7b8b' }}
                onValueChange={handleFlatTypeChange}
                enabled={!!form.nameOfSite}
              >
                <Picker.Item label="Select a flat type" value="" />
                {sitesFlatType.map((flat, index) => (
                  <Picker.Item key={index} label={flat.type} value={flat.type} />
                ))}
              </Picker>
            </View>



            <FormField
              title="Flat No."
              value={form.flatno}
              handleChangeText={(e) => setForm({ ...form, flatno: e })}
              otherStyles="mt-6"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Your Flat No."
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-6"
              textStyle="text-base text-gray-500 font-medium"
              placeholder="Enter Password"
            />

            <CustomButton
              title={loading ? 'Signing Up...' : 'Sign Up As Customer'}
              containerStyle="bg-secondary rounded-full mt-6 h-12"
              textStyle="text-lg text-white"
              onPress={handleSignUp}
              disabled={loading}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg font-regular text-gray-500">
                Sign Up As Builder?{' '}
                <Link className="text-secondary-100 text-lg font-semibold" href="/sign-up-as-builder">
                  SignUp
                </Link>
              </Text>
            </View>

            <View className="justify-center flex-row gap-2">
              <Text className="text-lg font-regular text-gray-500">
                Already have an account?{' '}
                <Link className="text-secondary-100 text-lg font-semibold" href="/login">
                  Login
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default SignUpAsCustomer;