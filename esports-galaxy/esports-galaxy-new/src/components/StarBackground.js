import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const StarBackground = () => {
  const stars = useRef([]);
  
  useEffect(() => {
    // Criar estrelas animadas
    for (let i = 0; i < 50; i++) {
      stars.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        opacity: new Animated.Value(Math.random()),
      });
    }
    
    // Animar estrelas
    stars.current.forEach((star) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(star.opacity, {
            toValue: 1,
            duration: Math.random() * 2000 + 1000,
            useNativeDriver: true,
          }),
          Animated.timing(star.opacity, {
            toValue: 0.3,
            duration: Math.random() * 2000 + 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <Svg style={StyleSheet.absoluteFillObject} width={width} height={height}>
      {stars.current.map((star, index) => (
        <AnimatedCircle
          key={index}
          cx={star.x}
          cy={star.y}
          r={star.size}
          fill="#ffffff"
          opacity={star.opacity}
        />
      ))}
    </Svg>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default StarBackground;