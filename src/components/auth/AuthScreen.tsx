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
import Toast from 'react-native-toast-message';
import { colors, spacing, radius, fontSize, fontWeight, shadows } from '@/constants/theme';
import EventifyLogo from '@/components/ui/EventifyLogo';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/services/supabase';

type AuthMode = 'login' | 'signup' | 'forgot_password' | 'reset_password';

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    console.log('Button pressed! Mode:', mode);
    console.log('Email:', email, 'Password length:', password.length);

    if ((mode === 'login' || mode === 'signup') && (!email || !password)) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill in all fields',
      });
      return;
    }

    setLoading(true);

    try {
      if (mode === 'forgot_password') {
        if (!email) throw new Error('Please enter your email');
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        Toast.show({ type: 'success', text1: 'OTP Sent', text2: 'Please check your email for the 6-digit code' });
        setMode('reset_password');
      } else if (mode === 'reset_password') {
        if (!otp || !password) throw new Error('Please enter the OTP and your new password');
        const { error: verifyError } = await supabase.auth.verifyOtp({ email, token: otp, type: 'recovery' });
        if (verifyError) throw verifyError;
        const { error: updateError } = await supabase.auth.updateUser({ password });
        if (updateError) throw updateError;
        Toast.show({ type: 'success', text1: 'Success!', text2: 'Password updated successfully' });
        setMode('login');
        setOtp('');
        setPassword('');
      } else if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        Toast.show({
          type: 'success',
          text1: 'Welcome back!',
          text2: 'Logged in successfully',
        });
      } else {
        if (!agreeToTerms) {
          Toast.show({
            type: 'error',
            text1: 'Terms of Service',
            text2: 'You must agree to the Terms of Service',
          });
          setLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        Toast.show({
          type: 'success',
          text1: 'Account Created',
          text2: 'You have been successfully registered!',
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Authentication Error',
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <EventifyLogo width={220} height={120} />
        </View>

        {/* Form Section */}
        <View style={styles.form}>
          {/* Tab Selector or Reset Header */}
          {(mode === 'login' || mode === 'signup') ? (
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
          ) : (
            <View style={styles.resetHeaderRow}>
              <TouchableOpacity onPress={() => setMode('login')} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={colors.dark} />
              </TouchableOpacity>
              <Text style={styles.resetHeaderTitle}>
                {mode === 'forgot_password' ? 'Reset Password' : 'Enter OTP'}
              </Text>
            </View>
          )}

          {mode === 'forgot_password' && (
            <Text style={styles.resetInstructions}>
              Enter the email associated with your account and we will send you a 6-digit OTP code to reset your password.
            </Text>
          )}

          {mode === 'signup' && (
            <Input 
              label="Full Name"
              placeholder="Dink Sira"
              leftIcon="mail-outline"
              value={fullName}
              onChangeText={setFullName}
            />
          )}

          {mode === 'reset_password' && (
            <Input 
              label="OTP Code"
              placeholder="Enter 6-digit code"
              leftIcon="keypad-outline"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
            />
          )}

          {(mode === 'login' || mode === 'signup' || mode === 'forgot_password') && (
            <Input 
              label="Email"
              placeholder="your@email.com"
              leftIcon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          )}

          {(mode === 'login' || mode === 'signup' || mode === 'reset_password') && (
            <Input 
              label={mode === 'reset_password' ? 'New Password' : 'Password'}
              placeholder={mode === 'login' ? "Enter your password" : "Create a password"}
              leftIcon="shield-checkmark-outline"
              rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
              onRightIconPress={() => setShowPassword(!showPassword)}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
          )}

          {mode === 'login' && (
            <Checkbox 
              label="Remember me"
              checked={rememberMe}
              onChange={setRememberMe}
              rightElement={
                <TouchableOpacity onPress={() => setMode('forgot_password')}>
                  <Text style={styles.forgotPassword}>Forget password?</Text>
                </TouchableOpacity>
              }
            />
          )}
          
          {mode === 'signup' && (
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
              title={
                loading ? "Loading..." : 
                mode === 'login' ? "Login" : 
                mode === 'signup' ? "Create Account" : 
                mode === 'forgot_password' ? "Send OTP" : "Reset Password"
              }
              onPress={handleAuth}
              style={styles.mainButton}
              textStyle={styles.mainButtonText}
              disabled={loading}
            />

            {(mode === 'login' || mode === 'signup') && (
              <>
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
              </>
            )}
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
  resetHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  backButton: {
    padding: spacing.xs,
    marginRight: spacing.sm,
  },
  resetHeaderTitle: {
    fontSize: fontSize.h2,
    fontWeight: fontWeight.bold,
    color: colors.dark,
  },
  resetInstructions: {
    fontSize: fontSize.body,
    color: colors.gray,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
});
