import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Title, Paragraph, Avatar, TextInput, Switch, List, Divider } from 'react-native-paper';
import * as Camera from 'expo-camera';
import StarBackground from '../components/StarBackground';
import GlowCard from '../components/GlowCard';
import CustomButton from '../components/CustomButton';
import FormInput from '../components/FormInput';
import { storage } from '../services/storage';
import { validators } from '../utils/validators';
import { masks } from '../utils/masks';

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: null,
    notifications: true,
    darkMode: true,
    language: 'pt-BR',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const savedProfile = await storage.getProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    }
  };

  const saveProfile = async () => {
    await storage.saveProfile(profile);
    setEditing(false);
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
  };

  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de permissão para usar a câmera');
      return;
    }
    // Simular foto
    setProfile({ ...profile, avatar: 'https://via.placeholder.com/150' });
  };

  return (
    <View style={styles.container}>
      <StarBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title style={styles.title}>👤 Meu Perfil</Title>

        <TouchableOpacity onPress={takePhoto} style={styles.avatarContainer}>
          {profile.avatar ? (
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          ) : (
            <Avatar.Icon size={120} icon="account" style={styles.avatarPlaceholder} />
          )}
        </TouchableOpacity>

        <GlowCard>
          <View style={styles.form}>
            {editing ? (
              <>
                <FormInput
                  label="Nome"
                  value={profile.name}
                  onChangeText={(text) => setProfile({ ...profile, name: text })}
                />
                <FormInput
                  label="Email"
                  value={profile.email}
                  onChangeText={(text) => setProfile({ ...profile, email: text })}
                  keyboardType="email-address"
                />
                <FormInput
                  label="Telefone"
                  value={masks.phone(profile.phone)}
                  onChangeText={(text) => setProfile({ ...profile, phone: masks.phone(text) })}
                  keyboardType="phone-pad"
                  maxLength={15}
                />
              </>
            ) : (
              <>
                <List.Item
                  title="Nome"
                  description={profile.name || 'Não informado'}
                  left={(props) => <List.Icon {...props} icon="account" />}
                  titleStyle={styles.listTitle}
                  descriptionStyle={styles.listDescription}
                />
                <Divider style={styles.divider} />
                <List.Item
                  title="Email"
                  description={profile.email || 'Não informado'}
                  left={(props) => <List.Icon {...props} icon="email" />}
                  titleStyle={styles.listTitle}
                  descriptionStyle={styles.listDescription}
                />
                <Divider style={styles.divider} />
                <List.Item
                  title="Telefone"
                  description={profile.phone || 'Não informado'}
                  left={(props) => <List.Icon {...props} icon="phone" />}
                  titleStyle={styles.listTitle}
                  descriptionStyle={styles.listDescription}
                />
              </>
            )}
          </View>
        </GlowCard>

        <Title style={styles.sectionTitle}>⚙️ Configurações</Title>
        <GlowCard glowColor="#ffff00">
          <View style={styles.settings}>
            <List.Item
              title="Notificações"
              description="Receber alertas de torneios"
              left={(props) => <List.Icon {...props} icon="bell" />}
              right={() => (
                <Switch
                  value={profile.notifications}
                  onValueChange={(value) => setProfile({ ...profile, notifications: value })}
                  color="#00ffff"
                />
              )}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
            />
            <Divider style={styles.divider} />
            <List.Item
              title="Modo Escuro"
              description="Tema espacial ativado"
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => (
                <Switch
                  value={profile.darkMode}
                  onValueChange={(value) => setProfile({ ...profile, darkMode: value })}
                  color="#00ffff"
                  disabled
                />
              )}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
            />
            <Divider style={styles.divider} />
            <List.Item
              title="Idioma"
              description="Português (BR)"
              left={(props) => <List.Icon {...props} icon="translate" />}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
            />
          </View>
        </GlowCard>

        <View style={styles.buttonContainer}>
          {editing ? (
            <>
              <CustomButton
                title="Cancelar"
                onPress={() => {
                  setEditing(false);
                  loadProfile();
                }}
                mode="outlined"
                style={styles.button}
              />
              <CustomButton
                title="Salvar"
                onPress={saveProfile}
                icon="content-save"
                style={styles.button}
              />
            </>
          ) : (
            <CustomButton
              title="Editar Perfil"
              onPress={() => setEditing(true)}
              icon="pencil"
              style={styles.fullButton}
            />
          )}
        </View>

        <Title style={styles.sectionTitle}>📊 Estatísticas</Title>
        <GlowCard glowColor="#00ff00">
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Title style={styles.statNumber}>12</Title>
              <Paragraph style={styles.statLabel}>Times Criados</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title style={styles.statNumber}>47</Title>
              <Paragraph style={styles.statLabel}>Jogadores</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title style={styles.statNumber}>8</Title>
              <Paragraph style={styles.statLabel}>Favoritos</Paragraph>
            </View>
          </View>
        </GlowCard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000033',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    color: '#00ffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#00ffff',
  },
  avatarPlaceholder: {
    backgroundColor: '#001a4d',
  },
  form: {
    padding: 16,
  },
  sectionTitle: {
    color: '#00ffff',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  settings: {
    padding: 8,
  },
  listTitle: {
    color: '#ffffff',
  },
  listDescription: {
    color: '#99ccff',
  },
  divider: {
    backgroundColor: '#0066ff',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  fullButton: {
    flex: 1,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    color: '#00ff00',
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#99ccff',
    fontSize: 14,
  },
});

export default ProfileScreen;
