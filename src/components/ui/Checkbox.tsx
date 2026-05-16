import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, fontSize, fontWeight } from '@/constants/theme';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  rightElement?: React.ReactNode;
}

export default function Checkbox({ label, checked, onChange, rightElement }: CheckboxProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.checkboxRow} 
        onPress={() => onChange(!checked)}
        activeOpacity={0.7}
      >
        <View style={[
          styles.checkbox,
          checked && styles.checked
        ]}>
          {checked && <Ionicons name="checkmark" size={14} color={colors.white} />}
        </View>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
      {rightElement}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  checked: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: fontSize.bodyMd,
    fontWeight: fontWeight.semibold,
    color: colors.darkMid,
  },
});
