import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import HeartMatch from '../icons/Components/HeartMatch';

const FallingHeart = ({ size, duration, startX, endY }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateY, {
        toValue: endY,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: duration / 4,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [translateY, rotate, duration, endY]);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [
      { translateY },
      { rotate: rotation },
    ],
  };

  return (
    <Animated.View style={[animatedStyle, { position: 'absolute', top: 0, left: startX }]}>
      <HeartMatch size={size} />
    </Animated.View>
  );
};

export default FallingHeart;
