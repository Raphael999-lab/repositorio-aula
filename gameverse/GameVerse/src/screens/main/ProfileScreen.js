import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {
  Avatar,
  Card,
  Surface,
  Button,
  Divider,
  Chip,
  List,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storage';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from '../../utils/theme';
import GradientBackground from '../../components/common/GradientBackground';
import CustomButton from '../../components/common/CustomButton';

export default function ProfileScreen({ navigation }) {
  const { user, updateUser, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    favoriteGames: 0,
    customTournaments: 0,
    memberSince: '',
  });

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    try {
      const [favoriteGames, customTournaments] = await Promise.all([
        storageService.getFavoriteGames(),
        storageService.getCustomTournaments(),
      ]);

      setStats({
        favoriteGames: favoriteGames.length,
        customTournaments: customTournaments.length,
        memberSince: user?.createdAt 
          ? new Date(user.createdAt).toLocaleDateString('pt-BR', {
              month: 'long',
              year: 'numeric',
            })
          : 'Recente',
      });
    } catch (error) {
      console.error('Error loading user stats:', error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setLoading(true);
        const updateResult = await updateUser({ avatar: result.assets[0].uri });
        
        if (updateResult.success) {
          Alert.alert('Sucesso', 'Foto de perfil atualizada!');
        } else {
          Alert.alert('Erro', 'Falha ao atualizar foto de perfil');
        }
        setLoading(false);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
      setLoading(false);
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setLoading(true);
        const updateResult = await updateUser({ avatar: result.assets[0].uri });
        
        if (updateResult.success) {
          Alert.alert('Sucesso', 'Foto de perfil atualizada!');
        } else {
          Alert.alert('Erro', 'Falha ao atualizar foto de perfil');
        }
        setLoading(false);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível tirar a foto');
      setLoading(false);
    }
  };

  const showImagePicker = () => {
    Alert.alert(
      'Atualizar Foto',
      'Escolha como deseja atualizar sua foto de perfil',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Galeria', onPress: pickImage },
        { text: 'Câmera', onPress: takePhoto },
      ]
    );
  };

  const handleEditProfile = () => {
    // Navegar para tela de edição de perfil
    navigation.navigate('EditProfile');
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: signOut,
        },
      ]
    );
  };

  const StatCard = ({ icon, value, label, color = COLORS.primary }) => (
    <Surface style={styles.statCard}>
      <BlurView intensity={20} style={styles.statBlur}>
        <LinearGradient
          colors={[color, color + '80']}
          style={styles.statGradient}
        >
          <Icon name={icon} size={24} color={COLORS.text} />
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statLabel}>{label}</Text>
        </LinearGradient>
      </BlurView>
    </Surface>
  );

  const AchievementCard = ({ icon, title, description, earned = false }) => (
    <Surface style={[styles.achievementCard, !earned && styles.achievementLocked]}>
      <View style={styles.achievementContent}>
        <LinearGradient
          colors={earned ? COLORS.gradient.secondary : ['rgba(176, 176, 176, 0.3)', 'rgba(112, 112, 112, 0.3)']}
          style={styles.achievementIcon}
        >
          <Icon 
            name={icon} 
            size={24} 
            color={earned ? COLORS.text : COLORS.textSecondary} 
          />
        </LinearGradient>
        <View style={styles.achievementText}>
          <Text style={[styles.achievementTitle, !earned && styles.achievementTitleLocked]}>
            {title}
          </Text>
          <Text style={styles.achievementDescription}>{description}</Text>
        </View>
        {earned && (
          <Icon name="check-circle" size={20} color={COLORS.success} />
        )}
      </View>
    </Surface>
  );

  return (
    <GradientBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Surface style={styles.profileCard}>
            <BlurView intensity={20} style={styles.profileBlur}>
              <View style={styles.profileContent}>
                <TouchableOpacity onPress={showImagePicker} style={styles.avatarContainer}>
                  <Avatar.Image
                    size={100}
                    source={{ 
                      uri: user?.avatar || `https://picsum.photos/200/200?random=${user?.id || 'default'}` 
                    }}
                    style={styles.avatar}
                  />
                  <View style={styles.avatarOverlay}>
                    <LinearGradient
                      colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)']}
                      style={styles.avatarOverlayGradient}
                    >
                      <Icon name="camera" size={20} color={COLORS.text} />
                    </LinearGradient>
                  </View>
                </TouchableOpacity>

                <Text style={styles.userName}>{user?.name || 'Gaming Master'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'gamer@gameverse.com'}</Text>
                
                {user?.bio && (
                  <Text style={styles.userBio}>{user.bio}</Text>
                )}

                <View style={styles.userDetails}>
                  <Chip
                    mode="flat"
                    icon="earth"
                    textStyle={styles.chipText}
                    style={styles.chip}
                  >
                    {user?.country || 'Brasil'}
                  </Chip>
                  <Chip
                    mode="flat"
                    icon="calendar"
                    textStyle={styles.chipText}
                    style={styles.chip}
                  >
                    Membro desde {stats.memberSince}
                  </Chip>
                </View>

                <CustomButton
                  mode="outlined"
                  onPress={handleEditProfile}
                  style={styles.editButton}
                  textStyle={{ color: COLORS.primary }}
                >
                  Editar Perfil
                </CustomButton>
              </View>
            </BlurView>
          </Surface>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>📊 Estatísticas</Text>
          <View style={styles.statsContainer}>
            <StatCard
              icon="gamepad-variant"
              value={stats.favoriteGames}
              label="Jogos Favoritos"
              color={COLORS.primary}
            />
            <StatCard
              icon="trophy"
              value={stats.customTournaments}
              label="Torneios Criados"
              color={COLORS.accent}
            />
            <StatCard
              icon="star"
              value="4.8"
              label="Avaliação Média"
              color={COLORS.warning}
            />
          </View>
        </View>

        {/* Achievements Section */}
        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Conquistas</Text>
          <View style={styles.achievementsContainer}>
            <AchievementCard
              icon="gamepad-variant"
              title="Primeiro Jogo"
              description="Adicione seu primeiro jogo favorito"
              earned={stats.favoriteGames > 0}
            />
            <AchievementCard
              icon="trophy"
              title="Organizador"
              description="Crie seu primeiro torneio"
              earned={stats.customTournaments > 0}
            />
            <AchievementCard
              icon="star-circle"
              title="Colecionador"
              description="Tenha 10 jogos favoritos"
              earned={stats.favoriteGames >= 10}
            />
            <AchievementCard
              icon="crown"
              title="Mestre dos Torneios"
              description="Crie 5 torneios personalizados"
              earned={stats.customTournaments >= 5}
            />
          </View>
        </Surface>

        {/* Quick Actions */}
        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Ações Rápidas</Text>
          <View style={styles.quickActions}>
            <List.Item
              title="Meus Jogos Favoritos"
              description="Gerenciar jogos salvos"
              left={(props) => <Icon {...props} name="gamepad-variant" size={24} color={COLORS.primary} />}
              right={(props) => <Icon {...props} name="chevron-right" size={24} color={COLORS.textSecondary} />}
              onPress={() => navigation.navigate('Games')}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
            />
            <Divider style={styles.divider} />
            
            <List.Item
              title="Meus Torneios"
              description="Torneios criados por mim"
              left={(props) => <Icon {...props} name="trophy" size={24} color={COLORS.accent} />}
              right={(props) => <Icon {...props} name="chevron-right" size={24} color={COLORS.textSecondary} />}
              onPress={() => navigation.navigate('Tournaments')}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
            />
            <Divider style={styles.divider} />
            
            <List.Item
              title="Configurações"
              description="Preferências do aplicativo"
              left={(props) => <Icon {...props} name="cog" size={24} color={COLORS.warning} />}
              right={(props) => <Icon {...props} name="chevron-right" size={24} color={COLORS.textSecondary} />}
              onPress={() => navigation.navigate('Settings')}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
            />
          </View>
        </Surface>

        {/* Sign Out */}
        <View style={styles.signOutSection}>
          <CustomButton
            mode="contained"
            onPress={handleSignOut}
            style={styles.signOutButton}
            gradient={['#FF5252', '#D32F2F']}
          >
            Sair da Conta
          </CustomButton>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: 60,
    paddingBottom: SPACING.lg,
  },
  profileCard: {
    borderRadius: 20,
    overflow: 'hidden',
    ...SHADOWS.large,
  },
  profileBlur: {
    backgroundColor: 'rgba(26, 26, 46, 0.8)',
  },
  profileContent: {
    alignItems: 'center',
    padding: SPACING.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.lg,
  },
  avatar: {
    backgroundColor: COLORS.surface,
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  avatarOverlayGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: TYPOGRAPHY.h2,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  userEmail: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  userBio: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  userDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  chip: {
    margin: SPACING.xs,
    backgroundColor: 'rgba(0, 210, 255, 0.2)',
  },
  chipText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.small,
  },
  editButton: {
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  statsSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.h4,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    marginHorizontal: SPACING.xs,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statBlur: {
    backgroundColor: 'rgba(22, 33, 62, 0.5)',
  },
  statGradient: {
    alignItems: 'center',
    padding: SPACING.md,
  },
  statValue: {
    fontSize: TYPOGRAPHY.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.small,
    color: COLORS.text,
    textAlign: 'center',
    opacity: 0.8,
  },
  section: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: 16,
    backgroundColor: 'rgba(26, 26, 46, 0.7)',
  },
  achievementsContainer: {
    gap: SPACING.sm,
  },
  achievementCard: {
    borderRadius: 12,
    backgroundColor: 'rgba(22, 33, 62, 0.5)',
    padding: SPACING.md,
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  achievementTitleLocked: {
    color: COLORS.textSecondary,
  },
  achievementDescription: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  quickActions: {
    gap: SPACING.sm,
  },
  listTitle: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
  },
  listDescription: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },
  divider: {
    backgroundColor: 'rgba(176, 176, 176, 0.2)',
  },
  signOutSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  signOutButton: {
    borderRadius: 12,
  },
  bottomSpacing: {
    height: 100,
  },
});