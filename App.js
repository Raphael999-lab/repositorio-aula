import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { PaperProvider, Appbar, Snackbar, Text } from 'react-native-paper';
import Time from './Componentes/Time';

export default function App() {
  // Estados do aplicativo
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [times, setTimes] = useState([]);

  // Simula carregamento de dados
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simula delay de rede
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Dados mockados dos times
        const mockTimes = [
          {
            id: 1,
            nome: "Flamengo",
            anoFundacao: 1895,
            mascote: "Urubu",
            imagem: "https://i.pinimg.com/236x/16/db/d2/16dbd20fd582e025dc54cc3fbd1839c9.jpg",
            jogadores: [
              { id: 101, nome: "Gabriel Barbosa", numero: 9, imagem: "https://i.pinimg.com/474x/1d/9f/5d/1d9f5de58831c9913f925a7155bdc7da.jpg" },
              { id: 102, nome: "Arrascaeta", numero: 14, imagem: "https://i.pinimg.com/474x/cf/ad/d9/cfadd92de5e581ac5505e3d325f8b9b2.jpg" },
              { id: 103, nome: "Everton Ribeiro", numero: 7, imagem: "https://i.pinimg.com/236x/39/1a/27/391a275fb7e0b018f2900f0f9fc9331b.jpg" },
              { id: 104, nome: "David Luiz", numero: 23, imagem: "https://i.pinimg.com/474x/98/79/9b/98799b86107a87b79dc9b15cf778fa4a.jpg" },
              { id: 105, nome: "Pedro", numero: 21, imagem: "https://i.pinimg.com/474x/79/e6/18/79e6185649fa3667b3ed3beef3e1ae94.jpg" },
            ],
          },
          {
            id: 2,
            nome: "Palmeiras",
            anoFundacao: 1914,
            mascote: "Porco",
            imagem: "https://i.pinimg.com/236x/d7/e3/66/d7e36650f858c03c2366721ba3d01ce3.jpg",
            jogadores: [
              { id: 201, nome: "Dudu", numero: 7, imagem: "https://i.pinimg.com/474x/72/96/9b/72969b2d84fb0ab80f31b571267f142f.jpg" },
              { id: 202, nome: "Rony", numero: 10, imagem: "https://i.pinimg.com/236x/c9/3d/82/c93d82c6592ece32d02c4b7b8d10806f.jpg" },
              { id: 203, nome: "Gustavo Gómez", numero: 15, imagem: "https://i.pinimg.com/474x/6f/c6/55/6fc655734d82e5dfe73d6a6364a2e5c9.jpg" },
              { id: 204, nome: "Weverton", numero: 1, imagem: "https://i.pinimg.com/474x/98/15/b2/9815b2742d1d3f1733e8bf556f8132f1.jpg" },
              { id: 205, nome: "Raphael Veiga", numero: 23, imagem: "https://i.pinimg.com/474x/94/6a/d6/946ad6271c4771121792f110591c9ff7.jpg" },
            ],
          },
          // Outros times podem ser adicionados aqui
        ];

        setTimes(mockTimes);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar os dados dos times");
        setSnackbarVisible(true);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Renderização condicional
  if (loading) {
    return (
      <PaperProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ee" />
          <Text style={styles.loadingText}>Carregando dados dos times...</Text>
        </View>
      </PaperProvider>
    );
  }

  if (error) {
    return (
      <PaperProvider>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        {/* Cabeçalho do aplicativo */}
        <Appbar.Header>
          <Appbar.Content 
            title="Times Brasileiros" 
            titleStyle={styles.headerTitle}
          />
        </Appbar.Header>

        {/* Lista principal de times */}
        <FlatList
          data={times}
          renderItem={({ item }) => (
            <Time
              nome={item.nome}
              anoFundacao={item.anoFundacao}
              mascote={item.mascote}
              imagem={item.imagem}
              jogadores={item.jogadores}
            />
          )}
          keyExtractor={item => `time-${item.id}`}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <Text variant="headlineMedium" style={styles.listTitle}>
              Principais Times do Futebol Brasileiro
            </Text>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text>Nenhum time disponível no momento</Text>
            </View>
          }
        />

        {/* Snackbar para feedback */}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          action={{
            label: 'OK',
            onPress: () => setSnackbarVisible(false),
          }}
          duration={3000}
        >
          {error}
        </Snackbar>
      </View>
    </PaperProvider>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  listTitle: {
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 18,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});