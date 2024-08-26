import React from 'react';
import { View } from 'react-native';

const ProgressBar = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <View
      style={{
        height: 10,
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: 'red',
          borderRadius: 5,
        }}
      />
    </View>
  );
};

export default ProgressBar;
