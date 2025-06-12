import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { TextInput, Button, Card, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SPACING, TYPOGRAPHY } from '../../utils/theme';
import GradientBackground from '../../components/common/GradientBackground';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      const result = await signIn(data.email, data.password);
      
      if (!result.success) {
        Alert.alert('Erro', result.error || 'Falha no login');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Logo/Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={COLORS.gradient.primary}
              style={styles.logoContainer}
            >
              <Icon name="gamepad-variant" size={48} color={COLORS.text} />
            </LinearGradient>
            <Text style={styles.title}>GameVerse</Text>
            <Text style={styles.subtitle}>Entre na sua conta</Text>
          </View>

          {/* Form Card */}
          <BlurView intensity={20} style={styles.formContainer}>
            <Surface style={styles.formCard}>
              <View style={styles.form}>
                {/* Email Input */}
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      label="Email"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      left={<TextInput.Icon icon="email" iconColor={COLORS.primary} />}
                      error={!!errors.email}
                      style={styles.input}
                    />
                  )}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}

                {/* Password Input */}
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: 'Senha é obrigatória',
                    minLength: {
                      value: 6,
                      message: 'Senha deve ter pelo menos 6 caracteres',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      label="Senha"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      secureTextEntry={!showPassword}
                      left={<TextInput.Icon icon="lock" iconColor={COLORS.primary} />}
                      right={
                        <TextInput.Icon
                          icon={showPassword ? 'eye-off' : 'eye'}
                          iconColor={COLORS.textSecondary}
                          onPress={() => setShowPassword(!showPassword)}
                        />
                      }
                      error={!!errors.password}
                      style={styles.input}
                    />
                  )}
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password.message}</Text>
                )}

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <CustomButton
                  mode="contained"
                  onPress={handleSubmit(onSubmit)}
                  loading={loading}
                  disabled={loading}
                  style={styles.loginButton}
                  gradient={COLORS.gradient.primary}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </CustomButton>

                {/* Social Login */}
                <View style={styles.socialContainer}>
                  <Text style={styles.socialText}>Ou entre com</Text>
                  <View style={styles.socialButtons}>
                    <TouchableOpacity style={styles.socialButton}>
                      <LinearGradient
                        colors={['#4267B2', '#3b5998']}
                        style={styles.socialGradient}
                      >
                        <Icon name="facebook" size={24} color={COLORS.text} />
                      </LinearGradient>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.socialButton}>
                      <LinearGradient
                        colors={['#DB4437', '#C23321']}
                        style={styles.socialGradient}
                      >
                        <Icon name="google" size={24} color={COLORS.text} />
                      </LinearGradient>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.socialButton}>
                      <LinearGradient
                        colors={['#7289DA', '#5B6EAE']}
                        style={styles.socialGradient}
                      >
                        <Icon name="discord" size={24} color={COLORS.text} />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Register Link */}
                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>Não tem uma conta? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerLink}>Cadastre-se</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Surface>
          </BlurView>

          {/* Demo Credentials */}
          <TouchableOpacity
            style={styles.demoContainer}
            onPress={() => onSubmit({ email: 'demo@gameverse.com', password: '123456' })}
          >
            <BlurView intensity={10} style={styles.demoBlur}>
              <Icon name="information-outline" size={20} color={COLORS.primary} />
              <Text style={styles.demoText}>Toque aqui para login demo</Text>
            </BlurView>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: TYPOGRAPHY.h1,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  formContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
  },
  formCard: {
    backgroundColor: 'rgba(26, 26, 46, 0.8)',
    borderRadius: 20,
  },
  form: {
    padding: SPACING.xl,
  },
  input: {
    marginBottom: SPACING.md,
    backgroundColor: 'rgba(22, 33, 62, 0.5)',
  },
  errorText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.small,
    marginTop: -SPACING.sm,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.lg,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.caption,
  },
  loginButton: {
    marginBottom: SPACING.lg,
    borderRadius: 12,
  },
  socialContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  socialText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
    marginBottom: SPACING.md,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    marginHorizontal: SPACING.sm,
  },
  socialGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },
  registerLink: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: 'bold',
  },
  demoContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: SPACING.md,
  },
  demoBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
  },
  demoText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.caption,
    marginLeft: SPACING.sm,
    fontWeight: '600',
  },
});