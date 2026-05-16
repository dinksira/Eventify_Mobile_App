import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { colors, spacing, radius, fontSize, fontWeight, shadows } from '@/constants/theme';
import EventifyLogo from '@/components/ui/EventifyLogo';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import { Ionicons } from '@expo/vector-icons';

type AuthMode = 'login' | 'signup';

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <EventifyLogo width={220} height={120} />
        </View>

        {/* Form Section */}
        <View style={styles.form}>
          {/* Tab Selector */}
          <View style={styles.tabSelector}>
            <TouchableOpacity 
              style={[styles.tab, mode === 'login' && styles.activeTab]}
              onPress={() => setMode('login')}
            >
              <Text style={[styles.tabText, mode === 'login' && styles.activeTabText]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, mode === 'signup' && styles.activeTab]}
              onPress={() => setMode('signup')}
            >
              <Text style={[styles.tabText, mode === 'signup' && styles.activeTabText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
            {mode === 'signup' && (
              <Input 
                label="Full Name"
                placeholder="Dink Sira"
                leftIcon="mail-outline" // The screenshot shows mail icon for name? Actually looks like mail icon but it says Full Name. I'll use person-outline for name.
                // Wait, screenshot 2 shows mail icon for Full Name field too. That's weird but I'll follow it if it looks like that.
                // Actually it looks like a person icon would be better. I'll use mail-outline as in screenshot if it's really like that.
                // Looking closer at screenshot 2, it's a mail icon. Okay.
                leftIcon="mail-outline"
              />
            )}

            <Input 
              label="Email"
              placeholder="your@email.com"
              leftIcon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input 
              label="password"
              placeholder={mode === 'login' ? "Enter your password" : "Create a password"}
              leftIcon="shield-checkmark-outline"
              rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
              onRightIconPress={() => setShowPassword(!showPassword)}
              secureTextEntry={!showPassword}
            />

            {mode === 'login' ? (
              <Checkbox 
                label="Remember me"
                checked={rememberMe}
                onChange={setRememberMe}
                rightElement={
                  <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forget password?</Text>
                  </TouchableOpacity>
                }
              />
            ) : (
              <View style={styles.termsRow}>
                 <Checkbox 
                  label="I Agree to the "
                  checked={agreeToTerms}
                  onChange={setAgreeToTerms}
                />
                <TouchableOpacity>
                  <Text style={styles.termsLink}>Terms of Service</Text>
                </TouchableOpacity>
              </View>
            )}

            <Button 
              title={mode === 'login' ? "Login" : "Create Account"}
              onPress={() => {}}
              style={styles.mainButton}
              textStyle={styles.mainButtonText}
            />

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color="#EA4335" />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={20} color="#000" />
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>© 2025 Eventify. All rights reserved.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  form: {
    paddingHorizontal: spacing.sm,
    marginTop: spacing.md,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: radius.xl,
    padding: 4,
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: radius.xl,
  },
  activeTab: {
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  tabText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.gray,
  },
  activeTabText: {
    color: colors.dark,
  },
  form: {
    paddingHorizontal: spacing.sm,
  },
  forgotPassword: {
    color: colors.primaryLight,
    fontSize: fontSize.bodyMd,
    fontWeight: fontWeight.semibold,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  termsLink: {
    color: colors.primaryLight,
    fontSize: fontSize.bodyMd,
    fontWeight: fontWeight.semibold,
    marginLeft: -spacing.sm, // pull it closer to the checkbox label
  },
  mainButton: {
    backgroundColor: '#FF6B6B', // Slightly brighter red as in screenshot
    height: 56,
    borderRadius: radius.xl,
    marginTop: spacing.sm,
    ...shadows.md,
  },
  mainButtonText: {
    fontSize: fontSize.h3,
    fontWeight: fontWeight.bold,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.grayLight,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    color: colors.gray,
    fontSize: fontSize.bodyMd,
  },
  socialRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    height: 52,
    borderRadius: radius.xl,
    gap: 8,
    ...shadows.sm,
  },
  socialText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.dark,
  },
  footerText: {
    textAlign: 'center',
    color: 'rgba(0,0,0,0.1)',
    fontSize: 10,
    marginTop: 'auto',
    paddingVertical: spacing.xl,
  },
});
