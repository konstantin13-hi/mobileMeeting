import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const RangeSelector = ({ userId }) => {
  const [distance, setDistance] = useState(50); // По умолчанию 50 км
  const [ageRange, setAgeRange] = useState([18, 35]); // Диапазон возраста от 18 до 35
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [hasUserEdited, setHasUserEdited] = useState(false); // Флаг взаимодействия пользователя

  useEffect(() => {
    const fetchPreferences = async () => {
      setLoading(true); // Начало загрузки
      try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (!hasUserEdited) {
            setDistance(userData.distance || 50);
            setAgeRange(userData.ageRange || [18, 35]);
          }
        } else {
          await setDoc(userDocRef, { distance: 50, ageRange: [18, 35] }, { merge: true });
        }
      } catch (error) {
        console.error("Error fetching preferences from Firestore:", error);
      } finally {
        setLoading(false); // Завершение загрузки
      }
    };

    fetchPreferences();
  }, [userId, hasUserEdited]); // Обновление при смене userId или редактировании

  useEffect(() => {
    if (loading) return; // Пропускаем, если данные ещё загружаются

    const handler = setTimeout(async () => {
      if (!hasUserEdited) return; // Сохраняем только если пользователь изменил данные
      try {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, { distance, ageRange });
        console.log("Preferences updated successfully:", { distance, ageRange });
      } catch (error) {
        console.error("Error updating preferences in Firestore:", error);
      }
    }, 500);

    return () => clearTimeout(handler); // Очистка таймера
  }, [distance, ageRange, hasUserEdited, loading]);

  const handleDistanceChange = (values) => {
    setDistance(values[0]);
    setHasUserEdited(true); // Флаг взаимодействия пользователя
  };

  const handleAgeRangeChange = (values) => {
    setAgeRange(values);
    setHasUserEdited(true); // Флаг взаимодействия пользователя
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Preferences</Text>

      {/* Distance Range */}
      <View style={styles.rangeContainer}>
        <Text style={styles.label}>Distance: {distance} km</Text>
        <MultiSlider
          values={[distance]}
          sliderLength={300}
          onValuesChange={handleDistanceChange}
          min={1}
          max={200}
          step={1}
          selectedStyle={{ backgroundColor: "#ffc107" }}
          unselectedStyle={{ backgroundColor: "#ddd" }}
          trackStyle={styles.track}
          markerStyle={styles.marker}
        />
      </View>

      {/* Age Range */}
      <View style={styles.rangeContainer}>
        <Text style={styles.label}>
          Age Range: {ageRange[0]} - {ageRange[1]} years
        </Text>
        <MultiSlider
          values={ageRange}
          sliderLength={300}
          onValuesChange={handleAgeRangeChange}
          min={18}
          max={100}
          step={1}
          selectedStyle={{ backgroundColor: "#ffc107" }}
          unselectedStyle={{ backgroundColor: "#ddd" }}
          trackStyle={styles.track}
          markerStyle={styles.marker}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#0d1b2a",
    borderRadius: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  rangeContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  marker: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "#ffc107",
    borderWidth: 2,
    borderColor: "#fff",
  },
});

export default RangeSelector;
