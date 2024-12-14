import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Button } from "react-native";
import { Chip } from "@rneui/themed";

const LanguageSelector = ({ selectedLanguages, setSelectedLanguages }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const availableLanguages = ["English", "Russian", "Spanish", "French", "German"];

  const handleLanguageClick = (language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((item) => item !== language)
        : [...prev, language]
    );
  };

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <View>
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
                  onPress={() => handleLanguageClick(language)}
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
    backgroundColor: "#505050",
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

export default LanguageSelector;
