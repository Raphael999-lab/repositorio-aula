import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { TextInput, Button, Card, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm, Controller } from 'react-hook-form';
import { TextInputMask } from 'react-native-masked-text';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SPACING, TYPOGRAPHY } from '../../utils/theme';
import { validationRules, formatters } from '../../utils/validation';
import GradientBackground from '../../components/common/GradientBackground';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';

export default function RegisterScreen({ navigation }) {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      bio: '',
      country: 'Brasil',
      birthDate: '',
    },
  });

  const watchPassword = watch('password');

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      if (data.password !== data.confirmPassword) {
        Alert.alert('Erro', 'As senhas não coincidem');
        return;
      }

      const userData = {
        name: data.name,
        email: data.email,
        bio: data.bio,
        country: data.country,
        birth_date: data.birthDate,
      };

      const result = await signUp(userData);

      if (!result.success) {
        Alert.alert('Erro', result.error || 'Falha no cadastro');
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
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={24} color={COLORS.text} />
            </TouchableOpacity>
            
            <LinearGradient
              colors={COLORS.gradient.secondary}
              style={styles.logoContainer}
            >
              <Icon name="account-plus" size={48} color={COLORS.text} />
            </LinearGradient>
            
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>Junte-se à comunidade GameVerse</Text>
          </View>

          {/* Form Card */}
          <BlurView intensity={20} style={styles.formContainer}>
            <Surface style={styles.formCard}>
              <View style={styles.form}>
                {/* Name */}
                <Controller
                  control={control}
                  name="name"
                  rules={validationRules.name}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      label="Nome Completo *"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={(text) => onChange(formatters.titleCase(text))}
                      error={!!errors.name}
                      left={<TextInput.Icon icon="account" iconColor={COLORS.primary} />}
                      placeholder="Seu nome completo"
                    />
                  )}
                />
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name.message}</Text>
                )}

                {/* Email */}
                <Controller
                  control={control}
                  name="email"
                  rules={validationRules.email}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      label="Email *"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      error={!!errors.email}
                      left={<TextInput.Icon icon="email" iconColor={COLORS.primary} />}
                      placeholder="seu@email.com"
                    />
                  )}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}

                {/* Password */}
                <Controller
                  control={control}
                  name="password"
                  rules={validationRules.password}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      label="Senha *"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      secureTextEntry={!showPassword}
                      error={!!errors.password}
                      left={<TextInput.Icon icon="lock" iconColor={COLORS.primary} />}
                      right={
                        <TextInput.Icon
                          icon={showPassword ? 'eye-off' : 'eye'}
                          iconColor={COLORS.textSecondary}
                          onPress={() => setShowPassword(!showPassword)}
                        />
                      }
                      placeholder="Mínimo 6 caracteres"
                    />
                  )}
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password.message}</Text>
                )}

                {/* Confirm Password */}
                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: 'Confirmação de senha é obrigatória',
                    validate: (value) =>
                      value === watchPassword || 'As senhas não coincidem',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      label="Confirmar Senha *"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      secureTextEntry={!showConfirmPassword}
                      error={!!errors.confirmPassword}
                      left={<TextInput.Icon icon="lock-check" iconColor={COLORS.primary} />}
                      right={
                        <TextInput.Icon
                          icon={showConfirmPassword ? 'eye-off' : 'eye'}
                          iconColor={COLORS.textSecondary}
                          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                      }
                      placeholder="Confirme sua senha"
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
                )}

                {/* Bio */}
                <Controller
                  control={control}
                  name="bio"
                  rules={{
                    maxLength: {
                      value: 200,
                      message: 'Bio deve ter no máximo 200 caracteres',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      label="Bio"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      multiline
                      numberOfLines={3}
                      error={!!errors.bio}
                      left={<TextInput.Icon icon="text" iconColor={COLORS.primary} />}
                      placeholder="Conte um pouco sobre você..."
                      style={styles.bioInput}
                    />
                  )}
                />
                {errors.bio && (
                  <Text style={styles.errorText}>{errors.bio.message}</Text>
                )}
                <Text style={styles.characterCount}>
                  {watch('bio')?.length || 0}/200 caracteres
                </Text>

                {/* Country */}
                <Controller
                  control={control}
                  name="country"
                  rules={validationRules.required('País')}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      label="País *"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={!!errors.country}
                      left={<TextInput.Icon icon="earth" iconColor={COLORS.primary} />}
                      placeholder="Brasil"
                    />
                  )}
                />
                {errors.country && (
                  <Text style={styles.errorText}>{errors.country.message}</Text>
                )}

                {/* Birth Date */}
                <Controller
                  control={control}
                  name="birthDate"
                  rules={{
                    required: 'Data de nascimento é obrigatória',
                    pattern: {
                      value: /^\d{4}-\d{2}-\d{2}$/,
                      message: 'Data deve estar no formato AAAA-MM-DD',
                    },
                    validate: (value) => {
                      const date = new Date(value);
                      const today = new Date();
                      const age = today.getFullYear() - date.getFullYear();
                      
                      if (isNaN(date.getTime())) {
                        return 'Data inválida';
                      }
                      
                      if (age < 13) {
                        return 'Você deve ter pelo menos 13 anos';
                      }
                      
                      if (date > today) {
                        return 'Data não pode ser no futuro';
                      }
                      
                      return true;
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.maskedInputContainer}>
                      <CustomInput
                        label="Data de Nascimento *"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        error={!!errors.birthDate}
                        left={<TextInput.Icon icon="calendar" iconColor={COLORS.primary} />}
                        placeholder="AAAA-MM-DD"
                        render={(props) => (
                          <TextInputMask
                            {...props}
                            type="datetime"
                            options={{
                              format: 'YYYY-MM-DD',
                            }}
                          />
                        )}
                      />
                    </View>
                  )}
                />
                {errors.birthDate && (
                  <Text style={styles.errorText}>{errors.birthDate.message}</Text>
                )}

                {/* Register Button */}
                <CustomButton
                  mode="contained"
                  onPress={handleSubmit(onSubmit)}
                  loading={loading}
                  disabled={loading}
                  style={styles.registerButton}
                  gradient={COLORS.gradient.secondary}
                >
                  {loading ? 'Criando conta...' : 'Criar Conta'}
                </CustomButton>

                {/* Login Link */}
                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Já tem uma conta? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Entrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Surface>
          </BlurView>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    marginBottom: SPACING.xl,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 0,
    padding: SPACING.sm,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: COLORS.accent,
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
  bioInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  characterCount: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.small,
    textAlign: 'right',
    marginTop: -SPACING.sm,
    marginBottom: SPACING.md,
  },
  maskedInputContainer: {
    marginBottom: SPACING.md,
  },
  registerButton: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: 12,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: 'bold',
  },
  errorText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.small,
    marginTop: -SPACING.sm,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  bottomSpacing: {
    height: 50,
  },
});