import React, { useState, useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { FAB, List, IconButton, Text, Title, Portal, Dialog, Button, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getCategories, deleteCategory } from '../api/storage';

export default function TeladeCategorias() {
  const navigation = useNavigation();
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [dialogoVisivel, setDialogoVisivel] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Carrega as categorias
  const carregarCategorias = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const categoriasArmazenadas = await getCategories();
      setCategorias(categoriasArmazenadas);
    } catch (error) {
      setErro("Erro ao carregar categorias");
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }, []);

  // Atualiza quando a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      carregarCategorias();
    }, [carregarCategorias])
  );

  // Mostra diálogo de confirmação
  const mostrarDialogo = (categoria) => {
    setCategoriaSelecionada(categoria);
    setDialogoVisivel(true);
  };

  // Esconde diálogo
  const esconderDialogo = () => setDialogoVisivel(false);

  // Manipula exclusão de categoria
  const handleExcluir = async () => {
    try {
      if (categoriaSelecionada) {
        await deleteCategory(categoriaSelecionada.id);
        
        Alert.alert(
          'Sucesso', 
          `Categoria "${categoriaSelecionada.name}" excluída com sucesso!`,
          [{ text: 'OK', onPress: carregarCategorias }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Erro', 
        'Não foi possível excluir a categoria',
        [{ text: 'OK' }]
      );
      console.error(error);
    } finally {
      esconderDialogo();
    }
  };

  // Renderização de carregamento
  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator animating={true} size="large" />
        <Text>Carregando categorias...</Text>
      </View>
    );
  }

  // Renderização de erro
  if (erro) {
    return (
      <View style={styles.erro}>
        <Text style={styles.textoErro}>{erro}</Text>
        <Button 
          mode="contained" 
          onPress={carregarCategorias}
          style={styles.botaoRecarregar}
        >
          Tentar novamente
        </Button>
      </View>
    );
  }

  // Renderização quando não há categorias
  if (categorias.length === 0) {
    return (
      <View style={styles.semCategorias}>
        <Title style={styles.tituloSemCategorias}>Nenhuma Categoria Cadastrada</Title>
        <Text style={styles.textoSemCategorias}>
          Toque no botão "+" abaixo para adicionar sua primeira categoria
        </Text>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate('AddEditCategory')}
          label="Adicionar categoria"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listaConteudo}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={item.description}
            left={props => (
              <List.Icon 
                {...props} 
                icon={item.icon} 
                color={item.color} 
                style={styles.iconeCategoria}
              />
            )}
            right={() => (
              <View style={styles.botoesAcao}>
                <IconButton
                  icon="pencil"
                  size={20}
                  onPress={() => navigation.navigate('AddEditCategory', { 
                    categoryId: item.id 
                  })}
                  style={styles.botaoEditar}
                />
                <IconButton
                  icon="delete"
                  size={20}
                  iconColor="#d32f2f"
                  onPress={() => mostrarDialogo(item)}
                  style={styles.botaoExcluir}
                />
              </View>
            )}
            style={styles.itemLista}
            titleStyle={styles.tituloItem}
            descriptionStyle={styles.descricaoItem}
          />
        )}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddEditCategory')}
        label="Adicionar categoria"
      />

      {/* Diálogo de confirmação */}
      <Portal>
        <Dialog 
          visible={dialogoVisivel} 
          onDismiss={esconderDialogo}
          style={styles.dialogo}
        >
          <Dialog.Title style={styles.tituloDialogo}>
            Confirmar Exclusão
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.textoDialogo}>
              Tem certeza que deseja excluir a categoria "{categoriaSelecionada?.name}"?
            </Text>
            <Text style={styles.avisoDialogo}>
              Esta ação não pode ser desfeita!
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.acoesDialogo}>
            <Button 
              onPress={esconderDialogo}
              style={styles.botaoCancelar}
              labelStyle={styles.textoBotaoCancelar}
            >
              Cancelar
            </Button>
            <Button 
              onPress={handleExcluir} 
              style={styles.botaoConfirmar}
              labelStyle={styles.textoBotaoConfirmar}
            >
              Excluir
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  erro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  textoErro: {
    color: '#d32f2f',
    marginBottom: 20,
    fontSize: 16
  },
  botaoRecarregar: {
    marginTop: 10
  },
  semCategorias: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  tituloSemCategorias: {
    fontSize: 22,
    marginBottom: 12,
    textAlign: 'center'
  },
  textoSemCategorias: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30
  },
  listaConteudo: {
    paddingBottom: 80
  },
  itemLista: {
    backgroundColor: '#fff',
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    elevation: 2
  },
  tituloItem: {
    fontWeight: 'bold',
    fontSize: 16
  },
  descricaoItem: {
    color: '#666'
  },
  iconeCategoria: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 20,
    padding: 8
  },
  botoesAcao: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  botaoEditar: {
    margin: 0
  },
  botaoExcluir: {
    margin: 0
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 28,
    backgroundColor: '#6200ee'
  },
  dialogo: {
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  tituloDialogo: {
    color: '#333'
  },
  textoDialogo: {
    fontSize: 16,
    marginBottom: 8
  },
  avisoDialogo: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: 'bold'
  },
  acoesDialogo: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  botaoCancelar: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#6200ee'
  },
  textoBotaoCancelar: {
    color: '#6200ee'
  },
  botaoConfirmar: {
    borderRadius: 4,
    backgroundColor: '#d32f2f'
  },
  textoBotaoConfirmar: {
    color: '#fff'
  }
});