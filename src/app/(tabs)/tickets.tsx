import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize, fontWeight } from '@/constants/theme';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import { Ionicons } from '@expo/vector-icons';

export default function TicketsScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Ionicons name="ticket-outline" size={64} color={colors.grayLight} />
        <Text style={styles.title}>My Tickets</Text>
        <Text style={styles.subtitle}>Your booked tickets will appear here</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.xxxl,
  },
  title: {
    fontSize: fontSize.h2,
    fontWeight: fontWeight.bold,
    color: colors.dark,
    marginTop: spacing.md,
  },
  subtitle: {
    fontSize: fontSize.body,
    color: colors.gray,
    marginTop: spacing.xs,
  },
});
