import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Chip } from "@rneui/themed"; // React Native Elements

const ModalScreen = () => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const availableLanguages = ["English", "Russian", "Spanish", "French", "German"];

  const handleLanguageClick = (language) => {
    // Проверяем, срабатывает ли функция
    console.log("Clicked language:", language);

    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((item) => item !== language) // Удаляем язык, если он уже выбран
        : [...prev, language] // Добавляем новый язык
    );
  };

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Display Selected Languages */}
      <Text style={styles.header}>Languages</Text>
      <TouchableOpacity onPress={toggleModal}>
        <View style={styles.chipContainer}>
          {selectedLanguages.length > 0 ? (
            selectedLanguages.map((language) => (
              <Chip
                onPress={toggleModal}
                key={language}
                title={language}
                buttonStyle={styles.selectedChip}
                titleStyle={{ color: "#0d1b2a" }}
              />
            ))
          ) : (
            <Text style={styles.placeholderText}>Select your languages</Text>
          )}
        </View>
      </TouchableOpacity>

      {/* Modal for Language Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Languages</Text>
            <ScrollView contentContainerStyle={styles.modalChipContainer}>
              {availableLanguages.map((language) => (
                <Chip
                  key={language}
                  title={language}
                  onPress={() => handleLanguageClick(language)} // Убедитесь, что функция привязана здесь
                  buttonStyle={[
                    styles.modalChip,
                    selectedLanguages.includes(language) && styles.selectedChip,
                  ]}
                  titleStyle={{
                    color: selectedLanguages.includes(language)
                      ? "#0d1b2a"
                      : "#fff",
                  }}
                />
              ))}
            </ScrollView>
            <Button title="Done" onPress={toggleModal} color="#ffc107" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    padding: 20,
  },
  header: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "bold",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#1b263b",
    borderRadius: 8,
    padding: 10,
  },
  placeholderText: {
    color: "#fff",
    fontSize: 14,
  },
  selectedChip: {
    backgroundColor: "#ffc107",
    margin: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#0d1b2a",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "50%",
  },
  modalHeader: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "bold",
  },
  modalChipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  modalChip: {
    margin: 4,
    backgroundColor: "#1b263b",
  },
});

export default ModalScreen;
