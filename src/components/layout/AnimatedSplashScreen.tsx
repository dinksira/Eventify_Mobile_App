import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing,
  runOnJS
} from 'react-native-reanimated';
import EventifyLogo from '@/components/ui/EventifyLogo';
import { colors } from '@/constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface AnimatedSplashScreenProps {
  onAnimationFinish: () => void;
}

export default function AnimatedSplashScreen({ onAnimationFinish }: AnimatedSplashScreenProps) {
  const containerOpacity = useSharedValue(1);
  const logoScale = useSharedValue(1);

  useEffect(() => {
    // Total animation time for Phase 1-3 is approx 1250ms
    // We wait 2200ms to give it time to finish and feel settled
    const timer = setTimeout(() => {
      startExitAnimation();
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const startExitAnimation = () => {
    // Subtle scale up before fade out
    logoScale.value = withTiming(1.1, { duration: 400, easing: Easing.out(Easing.quad) });
    
    containerOpacity.value = withTiming(0, { 
      duration: 500, 
      easing: Easing.inOut(Easing.quad) 
    }, (finished) => {
      if (finished) {
        runOnJS(onAnimationFinish)();
      }
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <EventifyLogo width={300} height={200} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.white,
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
