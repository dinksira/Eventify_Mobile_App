import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, shadows, fontSize, fontWeight } from '@/constants/theme';

export const toastConfig: ToastConfig = {
  success: ({ text1, text2 }) => (
    <View style={styles.container}>
      <View style={[styles.iconContainer, styles.successIcon]}>
        <Ionicons name="checkmark" size={20} color={colors.success} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View style={styles.container}>
      <View style={[styles.iconContainer, styles.errorIcon]}>
        <Ionicons name="close" size={20} color={colors.error} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>
    </View>
  ),
  info: ({ text1, text2 }) => (
    <View style={styles.container}>
      <View style={[styles.iconContainer, styles.infoIcon]}>
        <Ionicons name="information" size={20} color={colors.info} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.md,
    ...shadows.lg,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  successIcon: {
    backgroundColor: 'rgba(76, 175, 130, 0.1)',
  },
  errorIcon: {
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
  },
  infoIcon: {
    backgroundColor: 'rgba(41, 121, 255, 0.1)',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text1: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.dark,
    marginBottom: 2,
  },
  text2: {
    fontSize: fontSize.bodyMd,
    color: colors.gray,
  },
});
