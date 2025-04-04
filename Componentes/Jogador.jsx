import React from 'react';
import { 
  Card, 
  Title, 
  Paragraph,
  Avatar 
} from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const Jogador = ({ nome, numero, imagem }) => {
  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content style={styles.content}>
        <View style={styles.playerInfo}>
          <Avatar.Image 
            size={48} 
            source={{ uri: imagem }} 
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Title style={styles.name}>{nome}</Title>
            <Paragraph style={styles.number}>Camisa #{numero}</Paragraph>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
  content: {
    padding: 8,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  number: {
    fontSize: 14,
    color: '#666',
  },
});

export default Jogador;