import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Title, Chip } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import StarBackground from '../components/StarBackground';
import GlowCard from '../components/GlowCard';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import { storage } from '../services/storage';
import { validators } from '../utils/validators';
import * as Notifications from 'expo-notifications';

const TeamFormScreen = ({ navigation, route }) => {
  const { team } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [selectedGames, setSelectedGames] = useState(team?.games || []);
  
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: team?.name || '',
      country: team?.country || '',
      founded: team?.founded || '',
      players: team?.players?.toString() || '',
      coach: team?.coach || '',
      description: team?.description || '',
    },
  });

  const availableGames = [
    'League of Legends',
    'Valorant',
    'CS:GO',
    'Dota 2',
    'Overwatch',
    'Rocket League',
  ];

  const toggleGame = (game) => {
    if (selectedGames.includes(game)) {
      setSelectedGames(selectedGames.filter(g => g !== game));
    } else {
      setSelectedGames([...selectedGames, game]);
    }
  };

  const onSubmit = async (data) => {
    if (selectedGames.length === 0) {
      Alert.alert('Erro', 'Selecione pelo menos um jogo');
      return;
    }

    setLoading(true);
    const teamData = {
      ...data,
      games: selectedGames,
      players: parseInt(data.players),
    };

    try {
      if (team) {
        await storage.updateTeam(team.id, teamData);
        await sendNotification('Time atualizado!', `${data.name} foi atualizado com sucesso`);
      } else {
        await storage.saveTeam(teamData);
        await sendNotification('Novo time criado!', `${data.name} foi adicionado à galáxia`);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar time');
    } finally {
      setLoading(false);
    }
  };

  const sendNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { type: 'team' },
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      <StarBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title style={styles.title}>
          {team ? '✏️ Editar Time' : '🚀 Novo Time'}
        </Title>

        <GlowCard>
          <View style={styles.form}>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Nome é obrigatório',
                minLength: {
                  value: 3,
                  message: 'Mínimo 3 caracteres',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Nome do Time"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="country"
              rules={{
                required: 'País é obrigatório',
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="País"
                  value={value}
                  onChangeText={onChange}
                  error={errors.country?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="founded"
              rules={{
                required: 'Ano de fundação é obrigatório',
                pattern: {
                  value: /^(19|20)\d{2}$/,
                  message: 'Ano inválido (1900-2099)',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Ano de Fundação"
                  value={value}
                  onChangeText={onChange}
                  error={errors.founded?.message}
                  keyboardType="numeric"
                  maxLength={4}
                />
              )}
            />

            <Controller
              control={control}
              name="players"
              rules={{
                required: 'Número de jogadores é obrigatório',
                validate: (value) => validators.positiveNumber(value),
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Número de Jogadores"
                  value={value}
                  onChangeText={onChange}
                  error={errors.players?.message}
                  keyboardType="numeric"
                />
              )}
            />

            <Controller
              control={control}
              name="coach"
              rules={{
                required: 'Nome do técnico é obrigatório',
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Técnico/Coach"
                  value={value}
                  onChangeText={onChange}
                  error={errors.coach?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Descrição"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={4}
                />
              )}
            />

            <Title style={styles.sectionTitle}>Jogos</Title>
            <View style={styles.gamesContainer}>
              {availableGames.map((game) => (
                <Chip
                  key={game}
                  selected={selectedGames.includes(game)}
                  onPress={() => toggleGame(game)}
                  style={[
                    styles.gameChip,
                    selectedGames.includes(game) && styles.selectedChip,
                  ]}
                  textStyle={styles.chipText}
                >
                  {game}
                </Chip>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Cancelar"
                onPress={() => navigation.goBack()}
                mode="outlined"
                style={styles.button}
              />
              <CustomButton
                title={team ? 'Atualizar' : 'Criar'}
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                disabled={loading}
                style={styles.button}
                icon={team ? 'update' : 'plus'}
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
  form: {
    padding: 16,
  },
  sectionTitle: {
    color: '#00ffff',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  gamesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  gameChip: {
    margin: 4,
    backgroundColor: '#001a4d',
    borderWidth: 1,
    borderColor: '#0066ff',
  },
  selectedChip: {
    backgroundColor: '#ff00ff',
    borderColor: '#ff00ff',
  },
  chipText: {
    color: '#ffffff',
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

export default TeamFormScreen;