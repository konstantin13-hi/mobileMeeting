// LocationPermissionContext.js

import React, { createContext, useState, useContext,useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationPermissionContext = createContext();

export const LocationPermissionProvider = ({ children }) => {
  const [permissionType, setPermissionType] = useState('never');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  console.log("LocationPermissionProvider");
  console.log("LocationPermissionProvider  "+permissionType);
  console.log("LocationPermissionProvider  "+location);


  const value = {
    permissionType,
    setPermissionType,
    location,
    setLocation,
    errorMsg,
    setErrorMsg,
  };



  return (
    <LocationPermissionContext.Provider value={value}>
      {children}
    </LocationPermissionContext.Provider>
  );
};

export const useLocationPermission = () => useContext(LocationPermissionContext);
