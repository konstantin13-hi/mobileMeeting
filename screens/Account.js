import React, { useState , useEffect} from 'react';
import { Text, View, Button, Switch, StyleSheet, TouchableOpacity,FlatList ,ScrollView,Modal} from 'react-native';
import Language from './Language';
import useHookAuth from '../hooks/useAuth';
import { Image } from 'react-native';
import Trash from '../components/Trash';
import Plus from '../components/Plus';
import {pickImage} from '../lib/imagePicker'
import { db, timestamp ,storage} from "../firebase";
import useAuth from "../hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";


const Account = ({ navigation }) => {
  const { user } = useAuth();
  const [language, setLanguage] = useState('english');
  const [darkMode, setDarkMode] = useState(false);
  const {logout} = useHookAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [squares, setSquares] = useState([1]); // Начальный квадрат
  const [imageUrls, setImageUrls] = useState([]);
  console.log(user);


  const fetchUserImages = async (uid) => {
    try {
      // Получаем ссылку на документ пользователя в Firestore
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);
  
      // Проверяем, существует ли документ
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
  
        // Предполагаем, что массив URL фотографий хранится в поле profileImages
        const profileImages = userData.profileImages || [];
  
        // Возвращаем первые 5 URL (или меньше, если их меньше 5)
        return profileImages.slice(0, 5);
      } else {
        console.log("No such document!");
        return [];
      }
    } catch (error) {
      console.error("Error fetching user images: ", error);
      return [];
    }
  };


  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchUserImages(user.uid);
      setImageUrls(images);
    };
    console.log(user.uid)

    fetchImages();
  }, [user.uid]);

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
  
    // Функция для рендеринга каждого элемента
    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)} >
 
        <Image
          source={{ uri: item }}
          style={styles.image}
        />
          <Trash ></Trash>
      </TouchableOpacity>
    );
  



  const addSquare = () => {
    setSquares([...squares, squares.length + 1]);
  };

  const handleAddImage = async () => {
    const downloadURL = await pickImage(db, storage, user.uid, setImageUrls); // Передаем необходимые параметры
    if (downloadURL) {
      console.log('Image added:', downloadURL);
      // Теперь массив `imageUrls` уже обновлен внутри `pickImage`
    }
  };
  console.log()

  
 
  return (
   
  //   <View >
  //     <View>
  //     <FlatList
  //     data={imageUrlsData} // Данные для отображения
  //     renderItem={renderItem} // Функция рендеринга каждого элемента
  //     keyExtractor={(item) => item} // Ключ для каждого элемента
  //   />
  //       {/* <View  style={{ 
  //          borderRadius: 20, // Радиус скругления углов
  //         width: 200, // Ширина контейнера
  //         height: 200, // Высота контейнера // Внутренние отступы
  //         margin: 20, // Внешние отступы
  //         borderWidth: 2, // Ширина рамки
  //         borderColor: 'black', // Цвет рамки
  //         overflow: 'hidden'
  // }}>
  //         <Image  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg' }}
  //         style={{  width: '100%', 
  //         height: '100%',
  //        }}
  //         >
  //         </Image>
  //       </View> */}
  //     </View>


     
      
   
  //     <Text>photos</Text>
  //     <Text style={styles.title}>Account Settings</Text>


  //     <TouchableOpacity onPress={()=>navigation.navigate("Language")}>
  //     <View style={styles.setting} >
  //       <Text>Select App Language:</Text>
      
  //     </View>
  //     </TouchableOpacity>

      

  //     <View style={styles.setting}>
  //       <Text>Select Theme:</Text>
  //       <Switch value={darkMode} onValueChange={handleThemeChange} />
  //     </View>

  //     <TouchableOpacity onPress={logout}>
        
  //          <View  className= "h-10 w-10 rounded-full" >
  //           <Text>Log out</Text>
  //          </View>
  //       </TouchableOpacity>

     
  //     <Button title="Delete Account"  />
  //   </View>
  <View style={styles.flexContainer}>
  <FlatList
  keyExtractor={(item) => item}
  ListHeaderComponent={() => (
    <View style={styles.gridContainer}>
    {imageUrls.length > 0 && imageUrls.map((item, index) => (
      <TouchableOpacity key={index} style={styles.gridItem} onPress={() => setModalVisible(true)} >
        <Image
          source={{ uri: item }}
          style={styles.image}
        />
        <Trash />
      </TouchableOpacity>
    ))}
    <TouchableOpacity style={styles.gridItem} onPress={handleAddImage} >
       
       <Plus></Plus>
      </TouchableOpacity>
  </View>
  )}
  ListFooterComponent={() => (
    <View>

      <Text>Photos</Text>
      <Text style={styles.title}>Account Settings</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Language")}>
        <View style={styles.setting}>
          <Text>Select App Language:</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.setting}>
        <Text>Select Theme:</Text>
        <Switch value={darkMode} onValueChange={handleThemeChange} />
      </View>

      <TouchableOpacity onPress={logout}>
        <View style={styles.logoutButton}>
          <Text>Log out</Text>
        </View>
      </TouchableOpacity>

      <Button title="Delete Account" onPress={() => { /* Handle delete account */ }} />
    </View>
  )}
/>

{/* Модальное окно для действий (delete, replace, cancel) */}
<Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.button} onPress={() => { /* Handle delete */ }}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { /* Handle replace */ }}>
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
});

export default Account;
