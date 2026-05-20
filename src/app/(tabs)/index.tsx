import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, fontSize, fontWeight, shadows } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import ScreenWrapper from '@/components/layout/ScreenWrapper';

export default function HomeScreen() {
  const { user, profile, signOut } = useAuth();

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  return (
    <ScreenWrapper>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {firstName} 👋</Text>
          <Text style={styles.title}>Discover Events</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={24} color={colors.dark} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color={colors.gray} />
        <Text style={styles.searchPlaceholder}>Search events...</Text>
      </TouchableOpacity>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesRow}>
          {[
            { icon: 'musical-notes-outline' as const, label: 'Music' },
            { icon: 'basketball-outline' as const, label: 'Sports' },
            { icon: 'restaurant-outline' as const, label: 'Food' },
            { icon: 'color-palette-outline' as const, label: 'Art' },
            { icon: 'code-slash-outline' as const, label: 'Tech' },
          ].map((cat) => (
            <TouchableOpacity key={cat.label} style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name={cat.icon} size={24} color={colors.primary} />
              </View>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Upcoming Events Placeholder */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emptyCard}>
          <Ionicons name="calendar-outline" size={48} color={colors.grayLight} />
          <Text style={styles.emptyTitle}>No events yet</Text>
          <Text style={styles.emptySubtitle}>
            Events you discover will appear here
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  greeting: {
    fontSize: fontSize.body,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: fontSize.h1,
    fontWeight: fontWeight.bold,
    color: colors.dark,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 52,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  searchPlaceholder: {
    fontSize: fontSize.body,
    color: colors.gray,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.h3,
    fontWeight: fontWeight.bold,
    color: colors.dark,
    marginBottom: spacing.md,
  },
  seeAll: {
    fontSize: fontSize.bodyMd,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: 'rgba(232, 68, 90, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    color: colors.dark,
  },
  emptyCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  emptyTitle: {
    fontSize: fontSize.h4,
    fontWeight: fontWeight.semibold,
    color: colors.dark,
    marginTop: spacing.md,
  },
  emptySubtitle: {
    fontSize: fontSize.bodyMd,
    color: colors.gray,
    marginTop: spacing.xs,
  },
});
