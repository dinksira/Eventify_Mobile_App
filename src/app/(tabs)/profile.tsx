import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, radius, fontSize, fontWeight, shadows } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, profile, signOut } = useAuth();

  return (
    <ScreenWrapper>
      {/* Avatar & Name */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={colors.white} />
        </View>
        <Text style={styles.name}>{profile?.full_name || 'User'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {[
          { icon: 'person-outline' as const, label: 'Edit Profile' },
          { icon: 'heart-outline' as const, label: 'Favorites' },
          { icon: 'settings-outline' as const, label: 'Settings' },
          { icon: 'help-circle-outline' as const, label: 'Help & Support' },
        ].map((item) => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name={item.icon} size={22} color={colors.dark} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutBtn} onPress={signOut}>
        <Ionicons name="log-out-outline" size={22} color={colors.error} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  name: {
    fontSize: fontSize.h2,
    fontWeight: fontWeight.bold,
    color: colors.dark,
  },
  email: {
    fontSize: fontSize.bodyMd,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  menuSection: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.offWhite,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuLabel: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    color: colors.dark,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    ...shadows.sm,
  },
  signOutText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.error,
  },
});
