import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { Title, Avatar } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Camera from 'expo-camera';
import StarBackground from '../components/StarBackground';
import GlowCard from '../components/GlowCard';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import { storage } from '../services/storage';
import { validators } from '../utils/validators';
import { masks } from '../utils/masks';

const PlayerFormScreen = ({ navigation, route }) => {
  const { player } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(player?.photo || null);
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: player?.name || '',
      nickname: player?.nickname || '',
      email: player?.email || '',
      cpf: player?.cpf || '',
      phone: player?.phone || '',
      birthDate: player?.birthDate || '',
      team: player?.team || '',
      game: player?.game || '',
      position: player?.position || '',
      ranking: player?.ranking || '',
    },
  });

  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de permissão para usar a câmera');
      return;
    }

    // Aqui você implementaria a captura da foto
    // Por enquanto, vamos simular com uma imagem placeholder
    setPhoto('https://via.placeholder.com/150');
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const playerData = {
      ...data,
      photo,
    };

    try {
      if (player) {
        await storage.updatePlayer(player.id, playerData);
        Alert.alert('Sucesso', 'Jogador atualizado com sucesso!');
      } else {
        await storage.savePlayer(playerData);
        Alert.alert('Sucesso', 'Jogador cadastrado com sucesso!');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar jogador');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StarBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title style={styles.title}>
          {player ? '✏️ Editar Jogador' : '🎮 Novo Jogador'}
        </Title>

        <TouchableOpacity onPress={takePhoto} style={styles.photoContainer}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <Avatar.Icon size={100} icon="camera" style={styles.photoPlaceholder} />
          )}
        </TouchableOpacity>

        <GlowCard>
          <View style={styles.form}>
            <Controller
              control={control}
              name="nickname"
              rules={{
                required: 'Nickname é obrigatório',
                minLength: {
                  value: 3,
                  message: 'Mínimo 3 caracteres',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Nickname"
                  value={value}
                  onChangeText={onChange}
                  error={errors.nickname?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Nome completo é obrigatório',
                minLength: {
                  value: 5,
                  message: 'Mínimo 5 caracteres',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Nome Completo"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email é obrigatório',
                validate: validators.email,
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message}
                  keyboardType="email-address"
                />
              )}
            />

            <Controller
              control={control}
              name="cpf"
              rules={{
                required: 'CPF é obrigatório',
                validate: validators.cpf,
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="CPF"
                  value={masks.cpf(value)}
                  onChangeText={(text) => onChange(masks.cpf(text))}
                  error={errors.cpf?.message}
                  keyboardType="numeric"
                  maxLength={14}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              rules={{
                required: 'Telefone é obrigatório',
                validate: validators.phone,
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Telefone"
                  value={masks.phone(value)}
                  onChangeText={(text) => onChange(masks.phone(text))}
                  error={errors.phone?.message}
                  keyboardType="phone-pad"
                  maxLength={15}
                />
              )}
            />

            <Controller
              control={control}
              name="birthDate"
              rules={{
                required: 'Data de nascimento é obrigatória',
                validate: validators.date,
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Data de Nascimento"
                  value={masks.date(value)}
                  onChangeText={(text) => onChange(masks.date(text))}
                  error={errors.birthDate?.message}
                  keyboardType="numeric"
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                />
              )}
            />

            <Controller
              control={control}
              name="team"
              rules={{
                required: 'Time é obrigatório',
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Time"
                  value={value}
                  onChangeText={onChange}
                  error={errors.team?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="game"
              rules={{
                required: 'Jogo principal é obrigatório',
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Jogo Principal"
                  value={value}
                  onChangeText={onChange}
                  error={errors.game?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="position"
              rules={{
                required: 'Posição é obrigatória',
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Posição/Função"
                  value={value}
                  onChangeText={onChange}
                  error={errors.position?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="ranking"
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Ranking Mundial"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Cancelar"
                onPress={() => navigation.goBack()}
                mode="outlined"
                style={styles.button}
              />
              <CustomButton
                title={player ? 'Atualizar' : 'Criar'}
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                disabled={loading}
                style={styles.button}
                icon={player ? 'update' : 'plus'}
              />
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
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#00ffff',
  },
  photoPlaceholder: {
    backgroundColor: '#001a4d',
  },
  form: {
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default PlayerFormScreen;