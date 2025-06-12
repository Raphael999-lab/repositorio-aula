import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Title, Paragraph, Button, ActivityIndicator, Chip, Card, Avatar } from 'react-native-paper';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { getRecipeById, getCategoryById, getReviewsForRecipe } from '../api/storage';
import StarRating from '../components/StarRating';

export default function TelaDetalhesReceita() {
  const route = useRoute();
  const navigation = useNavigation();
  const { recipeId } = route.params;

  const [receita, setReceita] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Carrega os dados da receita
  const carregarDados = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      
      const [receitaCarregada, avaliacoesCarregadas] = await Promise.all([
        getRecipeById(recipeId),
        getReviewsForRecipe(recipeId)
      ]);
      
      setReceita(receitaCarregada);
      setAvaliacoes(avaliacoesCarregadas);

      if (receitaCarregada?.categoryId) {
        const categoriaCarregada = await getCategoryById(receitaCarregada.categoryId);
        setCategoria(categoriaCarregada);
      }
    } catch (error) {
      setErro("Erro ao carregar os dados da receita");
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }, [recipeId]);

  // Atualiza os dados quando a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados])
  );

  // Calcula a média das avaliações
  const mediaAvaliacoes = useMemo(() => {
    if (avaliacoes.length === 0) return 0;
    const total = avaliacoes.reduce((soma, avaliacao) => soma + avaliacao.rating, 0);
    return (total / avaliacoes.length).toFixed(1);
  }, [avaliacoes]);

  // Renderização de carregamento
  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator animating={true} size="large" />
        <Text>Carregando receita...</Text>
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
          onPress={carregarDados}
          style={styles.botaoRecarregar}
        >
          Tentar novamente
        </Button>
      </View>
    );
  }

  // Renderização quando não encontra a receita
  if (!receita) {
    return (
      <View style={styles.semResultados}>
        <Text>Receita não encontrada.</Text>
        <Button 
          mode="outlined" 
          onPress={() => navigation.goBack()}
          style={styles.botaoVoltar}
        >
          Voltar
        </Button>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={{ uri: receita.imageUri || 'https://picsum.photos/700' }} 
        style={styles.imagem} 
        resizeMode="cover"
      />
      
      <View style={styles.conteudo}>
        <Title style={styles.titulo}>{receita.name}</Title>
        
        {categoria && (
          <Chip 
            icon={categoria.icon} 
            style={[styles.chip, {backgroundColor: categoria.color}]}
            textStyle={styles.textoChip}
          >
            {categoria.name}
          </Chip>
        )}
        
        <Paragraph style={styles.descricao}>{receita.description}</Paragraph>

        <View style={styles.secao}>
          <Title style={styles.tituloSecao}>Tempo de Preparo</Title>
          <Paragraph>{receita.prepTime}</Paragraph>
        </View>

        <View style={styles.secao}>
          <Title style={styles.tituloSecao}>Ingredientes</Title>
          {receita.ingredients.split(',').map((ingrediente, index) => (
            <Paragraph key={`ingrediente-${index}`}>• {ingrediente.trim()}</Paragraph>
          ))}
        </View>
        
        <View style={styles.secao}>
          <Title style={styles.tituloSecao}>Modo de Preparo</Title>
          <Paragraph>{receita.instructions}</Paragraph>
        </View>

        <View style={styles.acoes}>
          <Button 
            icon="pencil" 
            mode="contained" 
            onPress={() => navigation.navigate('AddEditRecipe', { recipeId: receita.id })}
            style={styles.botaoEditar}
          >
            Editar Receita
          </Button>
        </View>

        <View style={styles.secao}>
          <Title style={styles.tituloSecao}>Avaliações ({avaliacoes.length})</Title>
          <StarRating 
            rating={mediaAvaliacoes} 
            size={24} 
            editable={false}
          />
          
          <Button 
            icon="star-plus" 
            mode="outlined" 
            onPress={() => navigation.navigate('AddReview', { recipeId: receita.id })}
            style={styles.botaoAvaliar}
          >
            Adicionar Avaliação
          </Button>

          {avaliacoes.map(avaliacao => (
            <Card key={avaliacao.id} style={styles.cardAvaliacao}>
              <Card.Title
                title={avaliacao.author}
                subtitle={
                  <StarRating 
                    rating={avaliacao.rating} 
                    size={15} 
                    editable={false}
                  />
                }
                left={(props) => <Avatar.Icon {...props} icon="account-circle" />}
              />
              <Card.Content>
                <Paragraph>{avaliacao.comment}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff'
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
  semResultados: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  textoErro: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center'
  },
  botaoRecarregar: {
    marginTop: 10
  },
  botaoVoltar: {
    marginTop: 20
  },
  imagem: {
    width: '100%',
    height: 250
  },
  conteudo: {
    padding: 20
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8
  },
  chip: {
    alignSelf: 'flex-start',
    marginBottom: 16
  },
  textoChip: {
    color: '#fff'
  },
  descricao: {
    fontSize: 16,
    color: '#555',
    marginVertical: 16,
    fontStyle: 'italic'
  },
  secao: {
    marginBottom: 24
  },
  tituloSecao: {
    fontSize: 22,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8
  },
  acoes: {
    marginVertical: 24
  },
  botaoEditar: {
    borderRadius: 8
  },
  botaoAvaliar: {
    marginTop: 16,
    borderRadius: 8
  },
  cardAvaliacao: {
    marginTop: 16,
    borderRadius: 8
  }
});