import React from 'react';
import { ScrollView, Text, StyleSheet, View, ImageBackground } from 'react-native';
import Filme from './Componentes/Filme';
import Serie from './Componentes/Serie';

// Lista de filmes 
const listaFilmes = [
  {
    "nome":"Oppenheimer",
    "ano": 2023,
    "diretor": "Christopher Nolan",
    "tipo": "Drama/Histórico",
    "capa": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
  },
  {
    "nome": "Homem-Aranha: Através do Aranhaverso",
    "ano": 2023,
    "diretor": "Joaquim Dos Santos",
    "tipo": "Animação/Ação",
    "capa": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xxPXsL8V95dTwL5vHWIIQALkJQS.jpg"
  },
  {
    "nome": "Tudo em Todo o Lugar ao Mesmo Tempo",
    "ano": 2022,
    "diretor": "Daniel Kwan",
    "tipo": "Ficção Científica/Comédia",
    "capa": "https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"
  },
  {
    "nome": "Avatar: O Caminho da Água",
    "ano": 2022,
    "diretor": "James Cameron",
    "tipo": "Ficção Científica/Aventura",
    "capa": "https://assets.cinebelasartes.com.br/wp-content/uploads/2022/12/avatar-o-caminho-da-agu_posters-null-121406-min-scaled.jpeg"
  }
];

// Lista de séries
const listaSeries = [
  {
    "nome": "The Last of Us",
    "ano": 2023,
    "diretor": "Craig Mazin",
    "temporadas": 1,
    "capa": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    "tipo": "Drama/Pós-apocalíptico"
  },
  {
    "nome": "House of the Dragon",
    "ano": 2022,
    "diretor": "Miguel Sapochnik",
    "temporadas": 1,
    "capa": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
    "tipo": "Fantasia/Drama"
  },
  {
    "nome": "Wednesday",
    "ano": 2022,
    "diretor": "Tim Burton",
    "temporadas": 1,
    "capa": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jeGtaMwGxPmQN5xM4ClnwPQcNQz.jpg",
    "tipo": "Comédia/Terror"
  }
];

export default function App() {
  return (
    <ImageBackground 
      source={{uri: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces_filter(duotone,032541,01b4e4)/kf456ZqeC45XTvo6W9pW5clYKfQ.jpg'}} 
      style={styles.backgroundImage}
      blurRadius={3}
    >
      <ScrollView style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.mainTitle}>Cine IESB</Text>
          
          <Text style={styles.sectionTitle}>Clássicos do Cinema</Text>
          <View style={styles.horizontalScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {listaFilmes.map((filme, index) => (
                <View style={styles.cardWrapper} key={`filme-${index}`}>
                  <Filme {...filme} />
                </View>
              ))}
            </ScrollView>
          </View>

          <Text style={styles.sectionTitle}>Séries Imperdíveis</Text>
          <View style={styles.horizontalScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {listaSeries.map((serie, index) => (
                <View style={styles.cardWrapper} key={`serie-${index}`}>
                  <Serie {...serie} />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#01b4e4',
    marginBottom: 15,
    marginLeft: 5,
    fontFamily: 'sans-serif-condensed',
  },
  horizontalScroll: {
    marginBottom: 30,
  },
  cardWrapper: {
    marginRight: 15,
    width: 150,
  },
});