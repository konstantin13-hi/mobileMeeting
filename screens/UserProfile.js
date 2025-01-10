import React from 'react';
import { Text, View, StyleSheet, FlatList, Image, Button, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { haversineDistance} from '../lib/haversineDistance' // Утилита для расчета расстояний
import useAuth from '../hooks/useAuth'; // Хук для главного пользователя

const calculateAge = (birthDate) => {
  const birth = new Date(birthDate?.seconds * 1000);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const UserProfile = ({ navigation }) => {
  const { user: mainUser } = useAuth(); // Получение данных главного пользователя
  const route = useRoute();
  const { card } = route.params;

  const renderPhoto = ({ item }) => (
    <View style={styles.photoContainer}>
      <Image source={{ uri: item }} style={styles.photo} />
    </View>
  );

  // Расчет возраста
  const age = calculateAge(card.birthDate);

  // Расчет расстояния
  const distance = haversineDistance(
    mainUser?.location?.latitude,
    mainUser?.location?.longitude,
    card?.location?.latitude,
    card?.location?.longitude
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <FlatList
          data={card.photos}
          renderItem={renderPhoto}
          keyExtractor={(item, index) => `photo-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.photoList}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{card.firstName}</Text>
          <Text style={styles.subInfo}>{age} years old</Text>
          <Text style={styles.info}>Gender: {card.gender}</Text>
          <Text style={styles.info}>Interested in: {card.showMe}</Text>
          <Text style={styles.info}>
            Distance: {distance.toFixed(1)} km
          </Text>
          {card.languages && (
            <Text style={styles.info}>
              Languages: {card.languages.join(', ')}
            </Text>
          )}
          {card.description && (
            <Text style={styles.description}>
              About: {card.description}
            </Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Go back" onPress={() => navigation.goBack()} color="#ffc107" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(38, 56, 78)',
  },
  photoList: {
    marginTop: 20,
  },
  photoContainer: {
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  photo: {
    width: 350,
    height: 400,
    resizeMode: 'cover',
  },
  infoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(28, 41, 59)',
    borderRadius: 15,
    paddingVertical: 15,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffc107',
    marginBottom: 10,
  },
  subInfo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ddd',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
    color: '#eaeaea',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    color: '#eaeaea',
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
    marginBottom: 20,
  },
});

export default UserProfile;