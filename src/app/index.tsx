import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedSplashScreen from '@/components/layout/AnimatedSplashScreen';
import AuthScreen from '@/components/auth/AuthScreen';

export default function IndexScreen() {
  const router = useRouter();
  const { session, isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  // When user is authenticated, navigate to the tabs
  useEffect(() => {
    if (!showSplash && !isLoading && session) {
      router.replace('/(tabs)');
    }
  }, [showSplash, isLoading, session]);

  // Show animated splash first
  if (showSplash) {
    return (
      <AnimatedSplashScreen onAnimationFinish={() => setShowSplash(false)} />
    );
  }

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Not authenticated — show auth screen
  return <AuthScreen />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.offWhite,
  },
});
