import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Card, Avatar, Button, Chip, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useAuth } from '../../context/AuthContext';
import { abiosService } from '../../services/api';
import { storageService } from '../../services/storage';
import { COLORS, SPACING, TYPOGRAPHY } from '../../utils/theme';
import GradientBackground from '../../components/common/GradientBackground';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    games: [],
    tournaments: [],
    matches: [],
    news: [],
    stats: null,
    favoriteGames: [],
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const [gamesResult, tournamentsResult, matchesResult, newsResult, favoriteGames] = await Promise.all([
        abiosService.getGames({ limit: 5 }),
        abiosService.getTournaments({ limit: 3 }),
        abiosService.getMatches({ limit: 5 }),
        abiosService.getNews({ limit: 4 }),
        storageService.getFavoriteGames(),
      ]);

      const stats = await abiosService.getStats(1);

      setDashboardData({
        games: gamesResult.data,
        tournaments: tournamentsResult.data,
        matches: matchesResult.data,
        news: newsResult.data,
        stats: stats.data,
        favoriteGames,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const chartConfig = {
    backgroundGradientFrom: COLORS.surface,
    backgroundGradientTo: COLORS.card,
    color: (opacity = 1) => `rgba(0, 210, 255, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <GradientBackground>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Avatar.Image
              size={50}
              source={{ uri: user?.avatar || 'https://picsum.photos/100/100?random=user' }}
              style={styles.avatar}
            />
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Bem-vindo de volta,</Text>
              <Text style={styles.userName}>{user?.name || 'Gamer'}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.openDrawer()}
          >
            <Icon name="menu" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statCard}>
            <LinearGradient colors={COLORS.gradient.primary} style={styles.statGradient}>
              <Icon name="gamepad-variant" size={28} color={COLORS.text} />
              <Text style={styles.statNumber}>{dashboardData.favoriteGames.length}</Text>
              <Text style={styles.statLabel}>Jogos Favoritos</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statCard}>
            <LinearGradient colors={COLORS.gradient.secondary} style={styles.statGradient}>
              <Icon name="trophy" size={28} color={COLORS.text} />
              <Text style={styles.statNumber}>{dashboardData.tournaments.length}</Text>
              <Text style={styles.statLabel}>Torneios Ativos</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statCard}>
            <LinearGradient colors={['#00FF88', '#00D2FF']} style={styles.statGradient}>
              <Icon name="chart-line" size={28} color={COLORS.text} />
              <Text style={styles.statNumber}>
                {dashboardData.stats?.total_players ? 
                  (dashboardData.stats.total_players / 1000000).toFixed(0) + 'M' : 
                  '0'
                }
              </Text>
              <Text style={styles.statLabel}>Jogadores</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Live Matches */}
        <Surface style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔴 Partidas ao Vivo</Text>
            <Button
              mode="text"
              textColor={COLORS.primary}
              onPress={() => navigation.navigate('Tournaments')}
            >
              Ver Todas
            </Button>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dashboardData.matches.map((match) => (
              <TouchableOpacity key={match.id} style={styles.matchCard}>
                <BlurView intensity={20} style={styles.matchBlur}>
                  <View style={styles.matchHeader}>
                    <Chip
                      mode="flat"
                      textStyle={{ color: COLORS.text, fontSize: 10 }}
                      style={{ backgroundColor: COLORS.accent }}
                    >
                      {match.status === 'live' ? 'AO VIVO' : 'PRÓXIMA'}
                    </Chip>
                    <Text style={styles.matchGame}>{match.game}</Text>
                  </View>
                  
                  <View style={styles.matchTeams}>
                    <View style={styles.team}>
                      <Avatar.Image size={40} source={{ uri: match.team1.logo }} />
                      <Text style={styles.teamName}>{match.team1.name}</Text>
                    </View>
                    
                    <View style={styles.versus}>
                      <Text style={styles.vsText}>VS</Text>
                      {match.score && (
                        <Text style={styles.score}>
                          {match.score.team1} - {match.score.team2}
                        </Text>
                      )}
                    </View>
                    
                    <View style={styles.team}>
                      <Avatar.Image size={40} source={{ uri: match.team2.logo }} />
                      <Text style={styles.teamName}>{match.team2.name}</Text>
                    </View>
                  </View>
                </BlurView>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Surface>

        {/* Popular Games Chart */}
        {dashboardData.stats && (
          <Surface style={styles.section}>
            <Text style={styles.sectionTitle}>📊 Crescimento de Jogadores</Text>
            <LineChart
              data={{
                labels: dashboardData.stats.player_growth.map(item => item.month),
                datasets: [{
                  data: dashboardData.stats.player_growth.map(item => item.players / 1000000),
                }],
              }}
              width={screenWidth - 60}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </Surface>
        )}

        {/* Quick Actions */}
        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Ações Rápidas</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('AddGame')}
            >
              <LinearGradient colors={COLORS.gradient.primary} style={styles.actionGradient}>
                <Icon name="plus" size={24} color={COLORS.text} />
                <Text style={styles.actionText}>Adicionar Jogo</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('AddTournament')}
            >
              <LinearGradient colors={COLORS.gradient.secondary} style={styles.actionGradient}>
                <Icon name="tournament" size={24} color={COLORS.text} />
                <Text style={styles.actionText}>Criar Torneio</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Surface>

        {/* Featured Games */}
        <Surface style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🎮 Jogos em Destaque</Text>
            <Button
              mode="text"
              textColor={COLORS.primary}
              onPress={() => navigation.navigate('Games')}
            >
              Ver Todos
            </Button>
          </View>
          
          {dashboardData.games.slice(0, 3).map((game) => (
            <TouchableOpacity
              key={game.id}
              style={styles.gameCard}
              onPress={() => navigation.navigate('GameDetail', { game })}
            >
              <Card style={styles.gameCardContent}>
                <Card.Cover
                  source={{ uri: game.image }}
                  style={styles.gameImage}
                />
                <View style={styles.gameInfo}>
                  <Text style={styles.gameTitle}>{game.title}</Text>
                  <Text style={styles.gameCategory}>{game.category} • {game.platform}</Text>
                  <View style={styles.gameStats}>
                    <View style={styles.gameStat}>
                      <Icon name="star" size={16} color={COLORS.warning} />
                      <Text style={styles.gameStatText}>{game.rating}</Text>
                    </View>
                    <View style={styles.gameStat}>
                      <Icon name="account-group" size={16} color={COLORS.primary} />
                      <Text style={styles.gameStatText}>
                        {(game.players_online / 1000000).toFixed(0)}M
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </Surface>

        {/* Latest News */}
        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>📰 Últimas Notícias</Text>
          {dashboardData.news.slice(0, 2).map((news) => (
            <TouchableOpacity key={news.id} style={styles.newsCard}>
              <Card style={styles.newsCardContent}>
                <Card.Cover
                  source={{ uri: news.image }}
                  style={styles.newsImage}
                />
                <Card.Content style={styles.newsContent}>
                  <Text style={styles.newsTitle} numberOfLines={2}>
                    {news.title}
                  </Text>
                  <Text style={styles.newsBody} numberOfLines={3}>
                    {news.body}
                  </Text>
                  <View style={styles.newsFooter}>
                    <Chip
                      mode="flat"
                      textStyle={{ color: COLORS.text, fontSize: 10 }}
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      {news.category}
                    </Chip>
                    <Text style={styles.newsDate}>
                      {new Date(news.date).toLocaleDateString('pt-BR')}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </Surface>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: 60,
    paddingBottom: SPACING.lg,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: SPACING.md,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },
  userName: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.h4,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: SPACING.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
  statGradient: {
    padding: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.h3,
    fontWeight: 'bold',
    marginTop: SPACING.xs,
  },
  statLabel: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.small,
    opacity: 0.8,
    textAlign: 'center',
  },
  section: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderRadius: 16,
    backgroundColor: 'rgba(26, 26, 46, 0.7)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.h4,
    fontWeight: 'bold',
  },
  matchCard: {
    width: 280,
    marginRight: SPACING.md,
    borderRadius: 12,
    overflow: 'hidden',
  },
  matchBlur: {
    padding: SPACING.md,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  matchGame: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '600',
  },
  matchTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  team: {
    alignItems: 'center',
    flex: 1,
  },
  teamName: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.small,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  versus: {
    alignItems: 'center',
    marginHorizontal: SPACING.md,
  },
  vsText: {
    color: COLORS.accent,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: 'bold',
  },
  score: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    marginTop: SPACING.xs,
  },
  chart: {
    borderRadius: 12,
    marginVertical: SPACING.sm,
  },
  quickActions: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
  actionGradient: {
    padding: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '600',
    marginTop: SPACING.xs,
  },
  gameCard: {
    marginBottom: SPACING.md,
  },
  gameCardContent: {
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  gameImage: {
    height: 120,
  },
  gameInfo: {
    padding: SPACING.md,
  },
  gameTitle: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  gameCategory: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
    marginBottom: SPACING.sm,
  },
  gameStats: {
    flexDirection: 'row',
  },
  gameStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  gameStatText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.caption,
    marginLeft: SPACING.xs,
  },
  newsCard: {
    marginBottom: SPACING.md,
  },
  newsCardContent: {
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
  },
  newsImage: {
    height: 120,
  },
  newsContent: {
    padding: SPACING.md,
  },
  newsTitle: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  newsBody: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
    marginBottom: SPACING.sm,
    lineHeight: 18,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsDate: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.small,
  },
  bottomSpacing: {
    height: 100,
  },
});