import React, { useEffect, useState, useCallback } from 'react';
import { Button, View, Text } from 'react-native';
import { useLocationPermission } from '../LocationPermissionContext';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking, AppState } from 'react-native';

const LocationPermission = ({ navigation }) => {
  const { permissionType, setPermissionType, location, setLocation, errorMsg, setErrorMsg } = useLocationPermission();
 
  console.log("LocationPermission");
  useEffect(() => {
    const fetchData = async () => {
      await retrievePermissionType();
      console.log(" useEffect"+permissionType);
      getLocationAsync();
    };
  
    fetchData();
  }, [permissionType]);

 

  const retrievePermissionType = async () => {
    try {
      const value = await AsyncStorage.getItem('locationPermissionType');
      console.log("retrievePermissionType "+value);
      if (value !== null) {
        setPermissionType(value);
      }
      console.log("r setPermissionType(value); "+permissionType);
    } catch (error) {
      console.error('Error retrieving permission type:', error);
    }
  };

  const getLocationAsync = async () => {
    try {
      

      let location = await Location.getCurrentPositionAsync({});
      console.log("getLocationAsync good")
      setLocation(location);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      let status;
      const backgroundPermission = await Location.requestForegroundPermissionsAsync();
      console.log(backgroundPermission);
      status = backgroundPermission.status;


      if (status === 'granted') {
        console.log('Location permissions granted');
        setPermissionType(status); // Устанавливаем выбор пользователя
        savePermissionType(status); // Сохраняем выбор пользователя
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } else {
        console.log('Location permissions denied');
        setPermissionType('never'); // Устанавливаем выбор пользователя
        savePermissionType('never'); // Сохраняем выбор пользователя
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const savePermissionType = async (type) => {
    try {
      await AsyncStorage.setItem('locationPermissionType', type);
    } catch (error) {
      console.error('Error saving permission type:', error);
    }
  };

  const goToSettings = () => {
    Linking.openSettings();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 10 }}>Permission Type: {permissionType}</Text>
      <Button title="Allow" onPress={requestLocationPermission} />
      <Button title="Go to Settings" onPress={goToSettings} />
    </View>
  );
};



export default LocationPermission;
