import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  Searchbar,
  FAB,
  Chip,
  Surface,
  Menu,
  Divider,
  Card,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { abiosService } from '../../services/api';
import { storageService } from '../../services/storage';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from '../../utils/theme';
import GradientBackground from '../../components/common/GradientBackground';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import TournamentCard from '../../components/tournament/TournamentCard';

export default function TournamentsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [tournamentsData, setTournamentsData] = useState({
    apiTournaments: [],
    customTournaments: [],
  });

  const statusFilters = [
    { key: 'all', label: 'Todos', icon: 'tournament', color: COLORS.primary },
    { key: 'live', label: 'Ao Vivo', icon: 'broadcast', color: COLORS.accent },
    { key: 'upcoming', label: 'Próximos', icon: 'clock-outline', color: COLORS.warning },
    { key: 'finished', label: 'Finalizados', icon: 'check-circle', color: COLORS.success },
  ];

  const sortOptions = [
    { key: 'date', label: 'Data', icon: 'calendar' },
    { key: 'name', label: 'Nome', icon: 'sort-alphabetical-ascending' },
    { key: 'prize', label: 'Premiação', icon: 'trophy' },
    { key: 'participants', label: 'Participantes', icon: 'account-group' },
  ];

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async () => {
    try {
      setLoading(true);
      
      const [apiResult, customTournaments] = await Promise.all([
        abiosService.getTournaments({ limit: 20 }),
        storageService.getCustomTournaments(),
      ]);

      setTournamentsData({
        apiTournaments: apiResult.data,
        customTournaments,
      });
    } catch (error) {
      console.error('Error loading tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTournaments();
    setRefreshing(false);
  };

  const handleDeleteTournament = (tournamentId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este torneio personalizado?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const result = await storageService.deleteCustomTournament(tournamentId);
            if (result.success) {
              loadTournaments();
            }
          },
        },
      ]
    );
  };

  const getFilteredAndSortedTournaments = () => {
    const allTournaments = [
      ...tournamentsData.apiTournaments.map(t => ({ ...t, source: 'api' })),
      ...tournamentsData.customTournaments.map(t => ({ ...t, source: 'custom' })),
    ];

    // Filter by search query
    let filtered = allTournaments.filter(tournament =>
      tournament.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.game?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(tournament => tournament.status === selectedStatus);
    }

    // Sort tournaments
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'date':
          return new Date(a.start_date || 0) - new Date(b.start_date || 0);
        case 'prize':
          return (b.prize_pool || 0) - (a.prize_pool || 0);
        case 'participants':
          return (b.participants || 0) - (a.participants || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const renderTournamentCard = ({ item }) => (
    <TournamentCard
      tournament={item}
      onPress={() => navigation.navigate('TournamentDetail', { tournament: item })}
      onDelete={item.source === 'custom' ? handleDeleteTournament : null}
      showDeleteButton={item.source === 'custom'}
    />
  );

  const renderLiveTournaments = () => {
    const liveTournaments = tournamentsData.apiTournaments.filter(t => t.status === 'live');
    
    if (liveTournaments.length === 0) return null;

    return (
      <Surface style={styles.liveSection}>
        <View style={styles.liveSectionHeader}>
          <LinearGradient colors={COLORS.gradient.secondary} style={styles.liveIndicator}>
            <Icon name="broadcast" size={16} color={COLORS.text} />
            <Text style={styles.liveText}>AO VIVO</Text>
          </LinearGradient>
          <Text style={styles.liveSectionTitle}>Torneios Acontecendo Agora</Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {liveTournaments.map((tournament) => (
            <TouchableOpacity
              key={tournament.id}
              style={styles.liveTournamentCard}
              onPress={() => navigation.navigate('TournamentDetail', { tournament })}
            >
              <Card style={styles.liveTournamentContent}>
                <BlurView intensity={20} style={styles.liveTournamentBlur}>
                  <LinearGradient
                    colors={COLORS.gradient.neon}
                    style={styles.liveTournamentGradient}
                  >
                    <Icon name="trophy" size={32} color={COLORS.text} />
                    <Text style={styles.liveTournamentName} numberOfLines={1}>
                      {tournament.name}
                    </Text>
                    <Text style={styles.liveTournamentGame}>
                      {tournament.game}
                    </Text>
                    <View style={styles.liveTournamentStats}>
                      <Text style={styles.liveTournamentStat}>
                        👥 {tournament.participants || 0}
                      </Text>
                      {tournament.prize_pool && (
                        <Text style={styles.liveTournamentStat}>
                          💰 ${(tournament.prize_pool / 1000).toFixed(0)}K
                        </Text>
                      )}
                    </View>
                  </LinearGradient>
                </BlurView>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Surface>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="trophy-outline" size={64} color={COLORS.textSecondary} />
      <Text style={styles.emptyStateTitle}>Nenhum torneio encontrado</Text>
      <Text style={styles.emptyStateText}>
        Tente ajustar os filtros ou criar um novo torneio personalizado
      </Text>
      <TouchableOpacity
        style={styles.emptyStateButton}
        onPress={() => navigation.navigate('AddTournament')}
      >
        <LinearGradient colors={COLORS.gradient.primary} style={styles.emptyStateGradient}>
          <Icon name="plus" size={20} color={COLORS.text} />
          <Text style={styles.emptyStateButtonText}>Criar Torneio</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <LoadingSpinner message="Carregando torneios..." />;
  }

  const filteredTournaments = getFilteredAndSortedTournaments();

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Torneios</Text>
          <Menu
            visible={sortMenuVisible}
            onDismiss={() => setSortMenuVisible(false)}
            anchor={
              <TouchableOpacity
                onPress={() => setSortMenuVisible(true)}
                style={styles.sortButton}
              >
                <Icon name="sort" size={24} color={COLORS.text} />
              </TouchableOpacity>
            }
            contentStyle={styles.menuContent}
          >
            {sortOptions.map((option) => (
              <Menu.Item
                key={option.key}
                onPress={() => {
                  setSortBy(option.key);
                  setSortMenuVisible(false);
                }}
                title={option.label}
                leadingIcon={option.icon}
                titleStyle={{ color: COLORS.text }}
              />
            ))}
          </Menu>
        </View>

        {/* Search Bar */}
        <Surface style={styles.searchContainer}>
          <Searchbar
            placeholder="Buscar torneios..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={{ color: COLORS.text }}
            placeholderTextColor={COLORS.textSecondary}
            iconColor={COLORS.primary}
          />
        </Surface>

        {/* Status Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {statusFilters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              onPress={() => setSelectedStatus(filter.key)}
              style={styles.filterButton}
            >
              <LinearGradient
                colors={
                  selectedStatus === filter.key
                    ? [filter.color, filter.color + '80']
                    : ['rgba(26, 26, 46, 0.5)', 'rgba(22, 33, 62, 0.5)']
                }
                style={styles.filterGradient}
              >
                <Icon
                  name={filter.icon}
                  size={20}
                  color={selectedStatus === filter.key ? COLORS.text : COLORS.textSecondary}
                />
                <Text
                  style={[
                    styles.filterText,
                    {
                      color: selectedStatus === filter.key ? COLORS.text : COLORS.textSecondary,
                    },
                  ]}
                >
                  {filter.label}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {/* Live Tournaments */}
          {renderLiveTournaments()}

          {/* All Tournaments */}
          <Surface style={styles.tournamentsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Todos os Torneios ({filteredTournaments.length})
              </Text>
            </View>
            
            {filteredTournaments.length > 0 ? (
              <FlatList
                data={filteredTournaments}
                renderItem={renderTournamentCard}
                keyExtractor={(item, index) => `${item.source}-${item.id}-${index}`}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              renderEmptyState()
            )}
          </Surface>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Floating Action Button */}
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate('AddTournament')}
          color={COLORS.text}
          customSize={56}
        />
      </View>
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
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  sortButton: {
    padding: SPACING.sm,
  },
  menuContent: {
    backgroundColor: COLORS.surface,
  },
  searchContainer: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    borderRadius: 12,
    backgroundColor: 'rgba(26, 26, 46, 0.7)',
  },
  searchBar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  filtersContainer: {
    marginBottom: SPACING.md,
  },
  filtersContent: {
    paddingHorizontal: SPACING.lg,
  },
  filterButton: {
    marginRight: SPACING.sm,
  },
  filterGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  filterText: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  liveSection: {
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 0, 110, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 110, 0.3)',
  },
  liveSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    marginRight: SPACING.sm,
  },
  liveText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.small,
    fontWeight: 'bold',
    marginLeft: SPACING.xs,
  },
  liveSectionTitle: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
  },
  liveTournamentCard: {
    width: 200,
    marginRight: SPACING.md,
  },
  liveTournamentContent: {
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderRadius: 12,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  liveTournamentBlur: {
    padding: SPACING.md,
  },
  liveTournamentGradient: {
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 12,
  },
  liveTournamentName: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  liveTournamentGame: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.caption,
    textAlign: 'center',
    opacity: 0.8,
    marginTop: SPACING.xs,
  },
  liveTournamentStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.sm,
    width: '100%',
  },
  liveTournamentStat: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.small,
    fontWeight: '600',
  },
  tournamentsSection: {
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderRadius: 16,
    backgroundColor: 'rgba(26, 26, 46, 0.7)',
  },
  sectionHeader: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.h4,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyStateTitle: {
    fontSize: TYPOGRAPHY.h4,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptyStateText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    lineHeight: 20,
  },
  emptyStateButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  emptyStateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  emptyStateButtonText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    marginLeft: SPACING.sm,
  },
  fab: {
    position: 'absolute',
    margin: SPACING.md,
    right: 0,
    bottom: 80,
    backgroundColor: COLORS.accent,
    borderRadius: 28,
  },
  bottomSpacing: {
    height: 100,
  },
});