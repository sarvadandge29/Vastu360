import { View, Text, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import useStore from '../../../lib/store';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/superbase';
import { FlatList } from 'react-native-gesture-handler';
import SitesCard from '../../../components/SitesCard';

const BuilderHome = () => {
  const [sitesData, setSitesData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSites = async () => {
      if (!user?.company_id) {
        Alert.alert('Error', 'Company ID is not available.');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('sites')
          .select('*')
          .eq('company_id', user.company_id);

        if (error) {
          Alert.alert('Error', 'Failed to fetch sites: ' + error.message);
        } else {
          setSitesData(data);
        }
      } catch (err) {
        Alert.alert('Error', 'Something went wrong while fetching sites.');
      }
    };

    fetchSites();
  }, [user?.company_id]);

  return (
    <View>

      <FlatList
        data={sitesData}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <SitesCard data={item} />
        )}
      />
    </View>
  );
};

export default BuilderHome;
