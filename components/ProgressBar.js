import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <View style={styles.progressBarContainer}>
      <View
        style={[styles.progressBar, { width: `${progress}%` }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#1b263b', // Темный фон, чтобы соответствовать общей стилистике
    borderRadius: 5,
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ffc107', // Яркий акцент для прогресса (цвет как в кнопках)
    borderRadius: 5,
  },
});

export default ProgressBar;
