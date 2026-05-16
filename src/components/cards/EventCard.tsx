import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { 
  colors, 
  spacing, 
  radius, 
  fontSize, 
  fontWeight, 
  shadows 
} from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  image: string;
  price: string;
  onPress?: () => void;
}

export default function EventCard({
  title,
  date,
  location,
  image,
  price,
  onPress,
}: EventCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.priceBadge}>
        <Text style={styles.priceText}>{price}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color={colors.gray} />
          <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.grayLight,
  },
  priceBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.sm,
    ...shadows.sm,
  },
  priceText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  content: {
    padding: spacing.md,
  },
  date: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: fontSize.h3,
    fontWeight: fontWeight.bold,
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: fontSize.bodyMd,
    color: colors.gray,
  },
});
