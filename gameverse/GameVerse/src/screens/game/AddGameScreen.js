import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Appbar,
  Surface,
  Button,
  Menu,
  Divider,
  Avatar,
  Card,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import { storageService } from '../../services/storage';
import { COLORS, SPACING, TYPOGRAPHY } from '../../utils/theme';
import GradientBackground from '../../components/common/GradientBackground';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';

export default function AddGameScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [platformMenuVisible, setPlatformMenuVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    'MOBA', 'FPS', 'RPG', 'Strategy', 'Sports', 'Racing', 
    'Fighting', 'Puzzle', 'Adventure', 'Simulation'
  ];

  const platforms = [
    'PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 
    'Mobile', 'Multi', 'VR', 'Browser'
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      category: '',
      platform: '',
      rating: '',
      release_date: '',
      developer: '',
      description: '',
      image: '',
    },
  });

  const watchedCategory = watch('category');
  const watchedPlatform = watch('platform');

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        setValue('image', result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        setValue('image', result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível tirar a foto');
    }
  };

  const showImagePicker = () => {
    Alert.alert(
      'Selecionar Imagem',
      'Escolha como deseja adicionar uma imagem para o jogo',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Galeria', onPress: pickImage },
        { text: 'Câmera', onPress: takePhoto },
      ]
    );
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const gameData = {
        ...data,
        rating: parseFloat(data.rating) || 0,
        image: selectedImage || `https://picsum.photos/400/300?random=${Date.now()}`,
      };

      const result = await storageService.addFavoriteGame(gameData);

      if (result.success) {
        Alert.alert(
          'Sucesso!',
          'Jogo adicionado aos favoritos com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert('Erro', result.error || 'Falha ao adicionar jogo');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  const formatRating = (value) => {
    // Remove caracteres não numéricos e ponto
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Limita a 1 casa decimal e máximo 5.0
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts[1];
    }
    
    if (parts[1] && parts[1].length > 1) {
      parts[1] = parts[1].substring(0, 1);
    }
    
    const result = parts.join('.');
    const num = parseFloat(result);
    
    if (num > 5) {
      return '5.0';
    }
    
    return result;
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            iconColor={COLORS.text}
          />
          <Appbar.Content
            title="Adicionar Jogo"
            titleStyle={styles.headerTitle}
          />
          <Appbar.Action
            icon="check"
            iconColor={COLORS.primary}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          />
        </Appbar.Header>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Image Section */}
          <Surface style={styles.imageSection}>
            <Text style={styles.sectionTitle}>Imagem do Jogo</Text>
            
            <TouchableOpacity onPress={showImagePicker} style={styles.imageContainer}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <LinearGradient
                    colors={COLORS.gradient.primary}
                    style={styles.imagePlaceholderGradient}
                  >
                    <Icon name="image-plus" size={48} color={COLORS.text} />
                    <Text style={styles.imagePlaceholderText}>
                      Toque para adicionar imagem
                    </Text>
                  </LinearGradient>
                </View>
              )}
            </TouchableOpacity>
          </Surface>

          {/* Basic Information */}
          <Surface style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Básicas</Text>

            {/* Game Name */}
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Nome do jogo é obrigatório',
                minLength: {
                  value: 2,
                  message: 'Nome deve ter pelo menos 2 caracteres',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Nome do Jogo *"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={!!errors.name}
                  left={<CustomInput.Icon icon="gamepad-variant" />}
                />
              )}
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}

            {/* Category */}
            <Menu
              visible={categoryMenuVisible}
              onDismiss={() => setCategoryMenuVisible(false)}
              anchor={
                <TouchableOpacity
                  onPress={() => setCategoryMenuVisible(true)}
                  style={styles.menuTrigger}
                >
                  <CustomInput
                    label="Categoria *"
                    value={watchedCategory}
                    editable={false}
                    error={!!errors.category}
                    left={<CustomInput.Icon icon="tag" />}
                    right={<CustomInput.Icon icon="chevron-down" />}
                  />
                </TouchableOpacity>
              }
              contentStyle={styles.menuContent}
            >
              {categories.map((category) => (
                <Menu.Item
                  key={category}
                  onPress={() => {
                    setValue('category', category);
                    setCategoryMenuVisible(false);
                  }}
                  title={category}
                  titleStyle={{ color: COLORS.text }}
                />
              ))}
            </Menu>

            <Controller
              control={control}
              name="category"
              rules={{ required: 'Categoria é obrigatória' }}
              render={() => null}
            />
            {errors.category && (
              <Text style={styles.errorText}>{errors.category.message}</Text>
            )}

            {/* Platform */}
            <Menu
              visible={platformMenuVisible}
              onDismiss={() => setPlatformMenuVisible(false)}
              anchor={
                <TouchableOpacity
                  onPress={() => setPlatformMenuVisible(true)}
                  style={styles.menuTrigger}
                >
                  <CustomInput
                    label="Plataforma *"
                    value={watchedPlatform}
                    editable={false}
                    error={!!errors.platform}
                    left={<CustomInput.Icon icon="monitor" />}
                    right={<CustomInput.Icon icon="chevron-down" />}
                  />
                </TouchableOpacity>
              }
              contentStyle={styles.menuContent}
            >
              {platforms.map((platform) => (
                <Menu.Item
                  key={platform}
                  onPress={() => {
                    setValue('platform', platform);
                    setPlatformMenuVisible(false);
                  }}
                  title={platform}
                  titleStyle={{ color: COLORS.text }}
                />
              ))}
            </Menu>

            <Controller
              control={control}
              name="platform"
              rules={{ required: 'Plataforma é obrigatória' }}
              render={() => null}
            />
            {errors.platform && (
              <Text style={styles.errorText}>{errors.platform.message}</Text>
            )}
          </Surface>

          {/* Details */}
          <Surface style={styles.section}>
            <Text style={styles.sectionTitle}>Detalhes</Text>

            {/* Rating */}
            <Controller
              control={control}
              name="rating"
              rules={{
                required: 'Avaliação é obrigatória',
                pattern: {
                  value: /^[0-5](\.[0-9])?$/,
                  message: 'Avaliação deve ser entre 0.0 e 5.0',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Avaliação (0.0 - 5.0) *"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(formatRating(text))}
                  keyboardType="numeric"
                  error={!!errors.rating}
                  left={<CustomInput.Icon icon="star" />}
                  placeholder="Ex: 4.5"
                />
              )}
            />
            {errors.rating && (
              <Text style={styles.errorText}>{errors.rating.message}</Text>
            )}

            {/* Release Date */}
            <Controller
              control={control}
              name="release_date"
              rules={{
                required: 'Data de lançamento é obrigatória',
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: 'Data deve estar no formato AAAA-MM-DD',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.maskedInputContainer}>
                  <CustomInput
                    label="Data de Lançamento *"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    error={!!errors.release_date}
                    left={<CustomInput.Icon icon="calendar" />}
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
            {errors.release_date && (
              <Text style={styles.errorText}>{errors.release_date.message}</Text>
            )}

            {/* Developer */}
            <Controller
              control={control}
              name="developer"
              rules={{
                required: 'Desenvolvedor é obrigatório',
                minLength: {
                  value: 2,
                  message: 'Nome do desenvolvedor deve ter pelo menos 2 caracteres',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Desenvolvedor *"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={!!errors.developer}
                  left={<CustomInput.Icon icon="domain" />}
                  placeholder="Ex: Riot Games"
                />
              )}
            />
            {errors.developer && (
              <Text style={styles.errorText}>{errors.developer.message}</Text>
            )}
          </Surface>

          {/* Description */}
          <Surface style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição</Text>

            <Controller
              control={control}
              name="description"
              rules={{
                required: 'Descrição é obrigatória',
                minLength: {
                  value: 10,
                  message: 'Descrição deve ter pelo menos 10 caracteres',
                },
                maxLength: {
                  value: 500,
                  message: 'Descrição deve ter no máximo 500 caracteres',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Descrição do Jogo *"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={4}
                  error={!!errors.description}
                  left={<CustomInput.Icon icon="text" />}
                  placeholder="Descreva o jogo, suas características principais..."
                  style={styles.descriptionInput}
                />
              )}
            />
            {errors.description && (
              <Text style={styles.errorText}>{errors.description.message}</Text>
            )}
            
            <Text style={styles.characterCount}>
              {watch('description')?.length || 0}/500 caracteres
            </Text>
          </Surface>

          {/* Preview Card */}
          {watch('name') && (
            <Surface style={styles.section}>
              <Text style={styles.sectionTitle}>Pré-visualização</Text>
              
              <Card style={styles.previewCard}>
                {selectedImage && (
                  <Card.Cover source={{ uri: selectedImage }} style={styles.previewImage} />
                )}
                <Card.Content style={styles.previewContent}>
                  <Text style={styles.previewTitle}>{watch('name')}</Text>
                  <Text style={styles.previewCategory}>
                    {watch('category')} • {watch('platform')}
                  </Text>
                  {watch('rating') && (
                    <View style={styles.previewRating}>
                      <Icon name="star" size={16} color={COLORS.warning} />
                      <Text style={styles.previewRatingText}>{watch('rating')}</Text>
                    </View>
                  )}
                  {watch('description') && (
                    <Text style={styles.previewDescription} numberOfLines={3}>
                      {watch('description')}
                    </Text>
                  )}
                  <Text style={styles.previewDeveloper}>{watch('developer')}</Text>
                </Card.Content>
              </Card>
            </Surface>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <CustomButton
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={[styles.actionButton, styles.cancelButton]}
              textStyle={{ color: COLORS.textSecondary }}
            >
              Cancelar
            </CustomButton>

            <CustomButton
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              style={styles.actionButton}
              gradient={COLORS.gradient.primary}
            >
              {loading ? 'Salvando...' : 'Salvar Jogo'}
            </CustomButton>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.h4,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: 16,
    backgroundColor: 'rgba(26, 26, 46, 0.7)',
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.h4,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  imageSection: {
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: 16,
    backgroundColor: 'rgba(26, 26, 46, 0.7)',
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    aspectRatio: 16/9,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
  },
  imagePlaceholderGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.caption,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  menuTrigger: {
    marginBottom: SPACING.md,
  },
  menuContent: {
    backgroundColor: COLORS.surface,
    maxHeight: 200,
  },
  maskedInputContainer: {
    marginBottom: SPACING.md,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  characterCount: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.small,
    textAlign: 'right',
    marginTop: SPACING.xs,
  },
  previewCard: {
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
    borderRadius: 12,
  },
  previewImage: {
    height: 120,
  },
  previewContent: {
    padding: SPACING.md,
  },
  previewTitle: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  previewCategory: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  previewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  previewRatingText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.caption,
    marginLeft: SPACING.xs,
  },
  previewDescription: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    lineHeight: 16,
    marginBottom: SPACING.sm,
  },
  previewDeveloper: {
    fontSize: TYPOGRAPHY.small,
    color: COLORS.primary,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: SPACING.lg,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: SPACING.xs,
    borderRadius: 12,
  },
  cancelButton: {
    backgroundColor: 'rgba(22, 33, 62, 0.5)',
    borderColor: COLORS.textSecondary,
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