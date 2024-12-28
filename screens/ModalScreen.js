import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const RangeSelector = ({ onRangeChange }) => {
  const [distance, setDistance] = useState(50); // По умолчанию 50 км
  const [ageRange, setAgeRange] = useState([18, 35]); // Диапазон возраста от 18 до 35

  // Обновление значений диапазона возраста
  const handleAgeRangeChange = (values) => {
    setAgeRange(values);
  };

  // Обновление родительского компонента при изменении значений
  // React.useEffect(() => {
  //   if (onRangeChange) {
  //     onRangeChange({ distance, ageRange });
  //   }
  // }, [distance, ageRange]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Preferences</Text>

      {/* Distance Range */}
      <View style={styles.rangeContainer}>
        <Text style={styles.label}>Distance: {distance} km</Text>
        <MultiSlider
          values={[distance]}
          sliderLength={300}
          onValuesChange={(values) => setDistance(values[0])}
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
