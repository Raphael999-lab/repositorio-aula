import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Avatar, Chip } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from '../../utils/theme';

export default function GameCard({ 
  game, 
  onPress, 
  onDelete, 
  showDeleteButton = false,
  style 
}) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress && onPress(game)}
    >
      <Card style={styles.card}>
        <BlurView intensity={20} style={styles.blur}>
          <Card.Cover
            source={{ uri: game.image || `https://picsum.photos/400/300?random=${game.id}` }}
            style={styles.image}
          />
          
          <View style={styles.overlay}>
            <LinearGradient
              colors={['transparent', 'rgba(10, 10, 15, 0.9)']}
              style={styles.gradient}
            />
            
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title} numberOfLines={1}>
                  {game.title || game.name}
                </Text>
                {showDeleteButton && (
                  <TouchableOpacity
                    onPress={() => onDelete && onDelete(game.id)}
                    style={styles.deleteButton}
                  >
                    <Icon name="heart" size={20} color={COLORS.accent} />
                  </TouchableOpacity>
                )}
              </View>
              
              <View style={styles.details}>
                <Chip
                  mode="flat"
                  textStyle={styles.chipText}
                  style={[styles.chip, { backgroundColor: game.color || COLORS.primary }]}
                >
                  {game.category}
                </Chip>
                
                <View style={styles.stats}>
                  {game.rating && (
                    <View style={styles.stat}>
                      <Icon name="star" size={14} color={COLORS.warning} />
                      <Text style={styles.statText}>{game.rating}</Text>
                    </View>
                  )}
                  
                  {game.players_online && (
                    <View style={styles.stat}>
                      <Icon name="account-group" size={14} color={COLORS.primary} />
                      <Text style={styles.statText}>
                        {(game.players_online / 1000000).toFixed(0)}M
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              
              <Text style={styles.description} numberOfLines={2}>
                {game.description || 'Descrição não disponível'}
              </Text>
              
              <View style={styles.footer}>
                <Text style={styles.platform}>{game.platform || 'Multi'}</Text>
                <Text style={styles.developer}>{game.developer || 'N/A'}</Text>
              </View>
            </View>
          </View>
        </BlurView>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SPACING.xs,
    maxWidth: '48%',
  },
  card: {
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  blur: {
    flex: 1,
  },
  image: {
    height: 120,
  },
  overlay: {
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    height: 40,
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  deleteButton: {
    padding: SPACING.xs,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  chip: {
    height: 24,
  },
  chipText: {
    color: COLORS.text,
    fontSize: 10,
  },
  stats: {
    flexDirection: 'row',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  statText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.small,
    marginLeft: SPACING.xs,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.small,
    marginBottom: SPACING.sm,
    lineHeight: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  platform: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.small,
    fontWeight: '600',
  },
  developer: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.small,
  },
});