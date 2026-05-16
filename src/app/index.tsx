import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import { colors, spacing, fontSize, fontWeight } from '@/constants/theme';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import EventCard from '@/components/cards/EventCard';
import { useRouter } from 'expo-router';

import AnimatedSplashScreen from '@/components/layout/AnimatedSplashScreen';
import AuthScreen from '@/components/auth/AuthScreen';

export default function HomeScreen() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && (
        <AnimatedSplashScreen onAnimationFinish={() => setShowSplash(false)} />
      )}
      <AuthScreen />
    </>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
  },
  greeting: {
    fontSize: fontSize.body,
    color: colors.gray,
    marginBottom: 4,
  },
  title: {
    fontSize: fontSize.h1,
    fontWeight: fontWeight.bold,
    color: colors.dark,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.h2,
    fontWeight: fontWeight.bold,
    color: colors.dark,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
});
