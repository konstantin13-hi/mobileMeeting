import React, { useState , useEffect} from 'react';
import { Text, View, Button, Switch, StyleSheet, TouchableOpacity,FlatList ,ScrollView,Modal,ActivityIndicator,SafeAreaView} from 'react-native';
import Language from './Language';
import useHookAuth from '../hooks/useAuth';
import { Image } from 'react-native';
import Trash from '../components/Trash';
import Plus from '../components/Plus';
import {pickImage} from '../lib/imagePicker'
import { db, timestamp ,storage} from "../firebase";
import useAuth from "../hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import ProfileDescription from '../components/accountSetting/ProfileDescription';
import {deleteUserPhoto ,replaceUserPhoto,uploadUserPhoto ,uploadUserOnePhoto} from '../services/userService';
import LanguageSelector from '../components/accountSetting/LanguageSelector';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const Account = ({ navigation }) => {
  const { user } = useAuth();
  const [language, setLanguage] = useState('english');
  const [darkMode, setDarkMode] = useState(false);
  const { logout } = useHookAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [imageUrls, setImageUrls] = useState([]); 
  const [isFetching, setIsFetching] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  console.log(imageUrls);

  useEffect(() => {
    const fetchImages = async () => {
      setIsFetching(true);
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setImageUrls(userData.photos || []);
        }
      } catch (error) {
        console.error("Error fetching user images: ", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchImages();
  }, [user.uid]);

  const handleAddImage = async (placeholderIndex) => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission Denied", "Permission to access your photo library is required!");
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const maxWidth = 2000;
        const maxHeight = 2000;
        let photoUri = result.assets[0].uri;
  
        // Resize photo if needed
        const asset = result.assets[0];
        if (asset.width > maxWidth || asset.height > maxHeight) {
          console.log(`Resizing photo: ${photoUri}`);
          const manipResult = await ImageManipulator.manipulateAsync(
            photoUri,
            [{ resize: { width: maxWidth, height: maxHeight } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
          );
          photoUri = manipResult.uri;
        }
  
        // Upload photo to Firebase and get URL
        const downloadURL = await uploadUserOnePhoto(user.uid, photoUri);
        console.log("downLadURl"+downloadURL);
  
        if (downloadURL) {
          // Обновляем состояние хука imageUrls
          setImageUrls((prev)=>[...prev,downloadURL]);
        }
      } else {
        console.log("No photo selected or operation canceled.");
      }
    } catch (error) {
      console.error("Error adding image:", error);
      Alert.alert("Error", "An error occurred while adding the image.");
    }
  };
  

  const handleDeleteImage = async () => {
    if (!selectedImageUri) return;

    try {
      await deleteUserPhoto(user.uid, selectedImageUri);
      setImageUrls((prev) => prev.filter((url) => url !== selectedImageUri));
      setSelectedImageUri(null);
      setModalVisible(false);
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  
  const handleReplaceImage = async () => {
    if (!selectedImageUri) return;
  
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Permission to access your photo library is required!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, // Разрешаем выбрать только одно фото
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const maxWidth = 2000;
      const maxHeight = 2000;
  
      try {
        const originalPhotoUri = result.assets[0].uri;
        let resizedPhotoUri = originalPhotoUri;
  
        // Проверяем и ресайзим, если необходимо
        const asset = result.assets[0];
        if (asset.width > maxWidth || asset.height > maxHeight) {
          console.log(`Resizing photo: ${originalPhotoUri}`);
          const manipResult = await ImageManipulator.manipulateAsync(
            originalPhotoUri,
            [{ resize: { width: maxWidth, height: maxHeight } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
          );
          resizedPhotoUri = manipResult.uri;
        } else {
          console.log(`Photo ${originalPhotoUri} fits size requirements.`);
        }
  
        // Вызов метода замены фото в userService
        const newPhotoUrl = await replaceUserPhoto(user.uid, selectedImageUri, resizedPhotoUri);
  
        // Обновляем список фото
        setImageUrls((prev) =>
          prev.map((url) => (url === selectedImageUri ? newPhotoUrl : url))
        );
  
        // Сбрасываем состояние выбранного изображения и закрываем модальное окно
        setSelectedImageUri(null);
        setModalVisible(false);
      } catch (error) {
        console.error("Error processing or replacing image:", error);
        Alert.alert("Error", "An error occurred while replacing the image.");
      }
    } else {
      console.log("No photo selected or operation canceled.");
    }
  };

  const renderImage = ({ item, index }) => {
    const hasImage = !!item;
  
    return (
      <TouchableOpacity
        style={[
          styles.gridItem,
          { backgroundColor: hasImage ? 'transparent' : 'gray' }, // Светло-серый фон для пустой ячейки
          !hasImage && styles.addPhotoButton, // Стили кнопки "Добавить фото"
        ]}
        onPress={() => {
          if (hasImage) {
            setSelectedImageUri(item);
            setModalVisible(true);
          } else {
            handleAddImage();
          }
        }}
      >
        {hasImage ? (
          <Image source={{ uri: item }} style={styles.image} />
        ) : (
          <Text style={styles.addPhotoText}>+</Text> // Плюс, если нет изображения
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.flexContainer}>
      {isFetching ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
         data={Array.from({ length: 6 }, (_, index) => imageUrls[index] || null)} // Создание фиксированного списка
         renderItem={renderImage}
         keyExtractor={(item, index) => `image-${index}`} // Стабильный ключ
         numColumns={3}
         extraData={imageUrls} 
          ListFooterComponent={() => (
            <View>
              <Text style={styles.title}>Account Settings</Text>
              <ProfileDescription />
              {/* <TouchableOpacity onPress={() => navigation.navigate("Language")}>
                <View style={styles.setting}>
                  </View>
                  </TouchableOpacity> */}
                  <Text>Select App Language:</Text>
                  <LanguageSelector
                  selectedLanguages={selectedLanguages}
                  setSelectedLanguages={setSelectedLanguages}
              />
                
           
              <View style={styles.setting}>
                <Text>Select Theme:</Text>
                <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
              </View>
              <TouchableOpacity onPress={logout}>
                <View style={styles.logoutButton}>
                  <Text>Log out</Text>
                </View>
              </TouchableOpacity>
              <Button title="Delete Account" onPress={() => {}} />
            </View>
          )}
        />
      )}

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.button} onPress={handleDeleteImage}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleReplaceImage}
            >
              <Text style={styles.buttonText}>Replace</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor:'rgb(38, 56, 78)',
  },
  scrollContainer: {
    flexGrow: 1, // Позволяет ScrollView заполнять доступное пространство
    padding: 20, // Отступы для удобства
  },
  imageContainer: {
    borderRadius: 20, // Радиус скругления углов
    width: 200, // Ширина контейнера
    height: 200, // Высота контейнера
    margin: 20, // Внешние отступы
    borderWidth: 2, // Ширина рамки
    borderColor: 'black', // Цвет рамки
    overflow: 'hidden', // Скрытие содержимого за границами
  },
  container: {
    borderRadius: 20, // Радиус скругления углов
    width: 200, // Ширина контейнера
    height: 200, // Высота контейнера
    margin: 20, // Внешние отступы
    borderWidth: 2, // Ширина рамки
    borderColor: 'black', // Цвет рамки
    overflow: 'hidden', // Скрытие содержимого за границами
    position: 'relative',
  },
  image: {
    width: '100%', // Ширина изображения
    height: '100%', // Высота изображения
  },
  trashIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    zIndex: 10,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  setting: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  logoutButton: {
    marginVertical: 20,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#f44336',
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  gridContainer: {
    flexDirection: 'row',  // Устанавливает элементы в строку
    flexWrap: 'wrap',      // Позволяет переносить элементы на новую строку
    justifyContent: 'space-between', // Распределяет элементы равномерно
  },
  gridItem: {
    borderRadius:10,
    marginLeft:20,
    marginRight:10,
    width: 100,          // Устанавливает ширину каждого элемента на 30%
    height: 100,
    marginBottom: 10,      // Добавляет отступ снизу
    backgroundColor: 'lightblue', // Цвет фона для визуализации
    textAlign: 'center',   // Центрирование текста по горизонтали
    overflow: 'hidden', 
  },
  addPhotoButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  addPhotoText: {
    fontSize: 30,
    color: 'white',
  },
});


export default Account;


