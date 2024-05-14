import React, { useState } from 'react';
import { Text, View, Button, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import Language from './Language';
import useHookAuth from '../hooks/useAuth';
import { Image } from 'react-native';
const Account = ({ navigation }) => {
  const [language, setLanguage] = useState('english');
  const [darkMode, setDarkMode] = useState(false);
  const {logout} = useHookAuth();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleThemeChange = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleLogout = () => {
    logout();
  };

  const handleDeleteAccount = () => {
    // Реализация удаления аккаунта
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>


      <TouchableOpacity onPress={()=>navigation.navigate("Language")}>
      <View style={styles.setting} >
        <Text>Select App Language:</Text>
      
      </View>
      </TouchableOpacity>

      

      <View style={styles.setting}>
        <Text>Select Theme:</Text>
        <Switch value={darkMode} onValueChange={handleThemeChange} />
      </View>

      <TouchableOpacity onPress={logout}>
        
           <View  className= "h-10 w-10 rounded-full" >
            <Text>Log out</Text>
           </View>
        </TouchableOpacity>

     
      <Button title="Delete Account"  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    marginBottom: 10,
  },
});

export default Account;
