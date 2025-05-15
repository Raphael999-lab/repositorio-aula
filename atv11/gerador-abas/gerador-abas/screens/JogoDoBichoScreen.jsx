import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';

const animais = [
  {
    numero: 1,
    nome: 'Avestruz',
    imagem: 'https://www.eojogodobicho.com/images/animais/grupo-1-avestruz.jpg',
  },
  {
    numero: 2,
    nome: 'Águia',
    imagem: 'https://www.eojogodobicho.com/images/animais/grupo-2-aguia.jpg',
  },
  {
    numero: 3,
    nome: 'Burro',
    imagem: 'https://www.eojogodobicho.com/images/animais/grupo-3-burro.jpg',
  },
  {
    numero: 4,
    nome: 'Borboleta',
    imagem: 'https://www.eojogodobicho.com/images/animais/grupo-4-borboleta.jpg',
  },
  {
    numero: 5,
    nome: 'Cachorro',
    imagem: 'https://www.eojogodobicho.com/images/animais/grupo-5-cachorro.jpg',
  },
  {
    numero: 6,
    nome: 'Cabra',
    imagem: 'https://www.eojogodobicho.com/images/animais/grupo-6-cabra.jpg',
  },
  {
    numero: 7,
    nome: 'Carneiro',
    imagem: 'https://www.eojogodobicho.com/images/animais/grupo-7-carneiro.jpg',
  },
  {
    numero: 8,
    nome: 'Camelo',
    imagem: 'https://www.eojogodobicho.com/images/animais/grupo-8-camelo.jpg',
  },
  {
    numero: 9,
    nome: 'Cobra',
    imagem: 'https://www.eojogodobicho.com/images/animais/grupo-9-cobra.jpg',
  },
  {
    numero: 10,
    nome: 'Coelho',
    imagem: 'https://www.eojogodobicho.com/images/animais/grupo-10-coelho.jpg',
  },
];

const JogoDoBichoScreen = () => {
  const [animalGerado, setAnimalGerado] = useState(null);

  const gerarAnimal = () => {
    const indiceAleatorio = Math.floor(Math.random() * animais.length);
    setAnimalGerado(animais[indiceAleatorio]);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Gerador de Bicho</Title>
          <Button
            mode="contained"
            onPress={gerarAnimal}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Gerar Animal
          </Button>

          {animalGerado && (
            <View style={styles.animalContainer}>
              <Text style={styles.animalNome}>
                {animalGerado.numero} - {animalGerado.nome}
              </Text>
              <Image
                source={{ uri: animalGerado.imagem }}
                style={styles.animalImagem}
                resizeMode="cover"
              />
            </View>
          )}
        </Card.Content>
      </Card>
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
    elevation: 4,
  },
  title: {
    color: '#6200ee',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginVertical: 16,
    backgroundColor: '#6200ee',
  },
  buttonLabel: {
    color: '#ffffff',
  },
  animalContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  animalNome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  animalImagem: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default JogoDoBichoScreen;