import React from 'react';
import { 
  Card, 
  Title, 
  Paragraph, 
  List, 
  Avatar,
  IconButton 
} from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Jogador from './Jogador';

const Time = ({ nome, anoFundacao, mascote, imagem, jogadores }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card style={styles.card} elevation={4}>
      <Card.Cover source={{ uri: imagem }} style={styles.cover} />
      
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Title style={styles.title}>{nome}</Title>
          <IconButton
            icon={expanded ? 'chevron-up' : 'chevron-down'}
            onPress={() => setExpanded(!expanded)}
          />
        </View>
        
        <View style={styles.details}>
          <Paragraph style={styles.detail}>
            <Text style={styles.detailLabel}>Fundação:</Text> {anoFundacao}
          </Paragraph>
          <Paragraph style={styles.detail}>
            <Text style={styles.detailLabel}>Mascote:</Text> {mascote}
          </Paragraph>
        </View>
      </Card.Content>

      {expanded && (
        <List.Section>
          <List.Subheader>Elenco Principal</List.Subheader>
          <FlatList
            data={jogadores}
            renderItem={({ item }) => (
              <Jogador
                nome={item.nome}
                numero={item.numero}
                imagem={item.imagem}
              />
            )}
            keyExtractor={item => `jogador-${item.id}`}
            scrollEnabled={false}
          />
        </List.Section>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cover: {
    height: 150,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 8,
  },
  detail: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Time;