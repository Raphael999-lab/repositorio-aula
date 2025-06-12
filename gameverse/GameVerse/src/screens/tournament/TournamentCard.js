import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Chip, Avatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from '../../utils/theme';

export default function TournamentCard({ 
  tournament, 
  onPress, 
  onDelete,
  showDeleteButton = false,
  style 
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return COLORS.accent;
      case 'upcoming': return COLORS.primary;
      case 'finished': return COLORS.success;
      default: return COLORS.textSecondary;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'live': return 'AO VIVO';
      case 'upcoming': return 'PRÓXIMO';
      case 'finished': return 'FINALIZADO';
      default: return 'INDEFINIDO';
    }
  };

  const formatPrizePool = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress && onPress(tournament)}
    >
      <Card style={styles.card}>
        <BlurView intensity={15} style={styles.blur}>
          {tournament.image && (
            <Card.Cover
              source={{ uri: tournament.image }}
              style={styles.image}
            />
          )}
          
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {tournament.name}
                </Text>
                <Text style={styles.game}>{tournament.game}</Text>
              </View>
              
              <View style={styles.headerActions}>
                <Chip
                  mode="flat"
                  textStyle={styles.statusText}
                  style={[styles.statusChip, { backgroundColor: getStatusColor(tournament.status) }]}
                >
                  {getStatusText(tournament.status)}
                </Chip>
                
                {showDeleteButton && (
                  <TouchableOpacity
                    onPress={() => onDelete && onDelete(tournament.id)}
                    style={styles.deleteButton}
                  >
                    <Icon name="delete" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.details}>
              <View style={styles.detailRow}>
                <Icon name="calendar" size={16} color={COLORS.primary} />
                <Text style={styles.detailText}>
                  {formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}
                </Text>
              </View>

              {tournament.location && (
                <View style={styles.detailRow}>
                  <Icon name="map-marker" size={16} color={COLORS.primary} />
                  <Text style={styles.detailText}>{tournament.location}</Text>
                </View>
              )}

              <View style={styles.detailRow}>
                <Icon name="account-group" size={16} color={COLORS.primary} />
                <Text style={styles.detailText}>
                  {tournament.participants || 0} participantes
                </Text>
              </View>
            </View>

            {tournament.prize_pool && (
              <View style={styles.prizeContainer}>
                <LinearGradient
                  colors={COLORS.gradient.secondary}
                  style={styles.prizeGradient}
                >
                  <Icon name="trophy" size={20} color={COLORS.text} />
                  <Text style={styles.prizeText}>
                    {formatPrizePool(tournament.prize_pool)}
                  </Text>
                </LinearGradient>
              </View>
            )}

            {tournament.rules && (
              <Text style={styles.description} numberOfLines={2}>
                {tournament.rules}
              </Text>
            )}
          </View>
        </BlurView>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  card: {
    backgroundColor: 'rgba(22, 33, 62, 0.4)',
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  blur: {
    flex: 1,
  },
  image: {
    height: 100,
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  titleContainer: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  title: {
    fontSize: TYPOGRAPHY.h4,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  game: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: '600',
  },
  headerActions: {
    alignItems: 'flex-end',
  },
  statusChip: {
    height: 24,
    marginBottom: SPACING.xs,
  },
  statusText: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: SPACING.xs,
  },
  details: {
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  detailText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  prizeContainer: {
    marginBottom: SPACING.md,
  },
  prizeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
  },
  prizeText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    marginLeft: SPACING.sm,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.small,
    lineHeight: 16,
  },
});