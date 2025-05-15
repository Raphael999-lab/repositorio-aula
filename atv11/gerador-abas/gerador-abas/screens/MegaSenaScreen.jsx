import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';

const MegaSenaScreen = () => {
  const [jogoGerado, setJogoGerado] = useState([]);
  const [jogosMegaSena, setJogosMegaSena] = useState([]);

  const gerarJogo = () => {
    const numeros = [];
    while (numeros.length < 6) {
      const numero = Math.floor(Math.random() * 60) + 1;
      if (!numeros.includes(numero)) {
        numeros.push(numero);
      }
    }
    const jogoOrdenado = [...numeros].sort((a, b) => a - b);
    setJogoGerado(jogoOrdenado);
    setJogosMegaSena([...jogosMegaSena, jogoOrdenado]);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Gerador de Jogos da Mega Sena</Title>
          <Button
            mode="contained"
            onPress={gerarJogo}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Gerar Jogo
          </Button>
          
          {jogoGerado.length > 0 && (
            <View style={styles.jogoContainer}>
              <Text style={styles.jogoTitle}>Jogo Gerado:</Text>
              <View style={styles.numerosContainer}>
                {jogoGerado.map((numero, index) => (
                  <View key={index} style={styles.numero}>
                    <Text style={styles.numeroText}>{numero}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </Card.Content>
      </Card>

      {jogosMegaSena.length > 0 && (
        <Card style={styles.historicoCard}>
          <Card.Content>
            <Title style={styles.title}>Histórico de Jogos</Title>
            <FlatList
              data={jogosMegaSena}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.jogoItem}>
                  {item.map((numero, idx) => (
                    <View key={idx} style={styles.numeroPequeno}>
                      <Text style={styles.numeroPequenoText}>{numero}</Text>
                    </View>
                  ))}
                </View>
              )}
            />
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  historicoCard: {
    elevation: 4,
  },
  title: {
    color: '#6200ee',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginVertical: 8,
    backgroundColor: '#6200ee',
  },
  buttonLabel: {
    color: '#ffffff',
  },
  jogoContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  jogoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  numerosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  numero: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  numeroText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  jogoItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 4,
  },
  numeroPequeno: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#bb86fc',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  numeroPequenoText: {
    color: '#ffffff',
    fontSize: 12,
  },
});

export default MegaSenaScreen;