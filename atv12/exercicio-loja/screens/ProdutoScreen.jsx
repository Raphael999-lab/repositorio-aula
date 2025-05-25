import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Card, ActivityIndicator, Title, Paragraph, Chip, Divider, Button, useTheme, Icon } from 'react-native-paper';
import axios from 'axios';

const ProdutoScreen = ({ route, navigation }) => {
  const { productId } = route.params; //
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) return;
      try {
        setLoading(true);
        const response = await axios.get(`https://dummyjson.com/products/${productId}`); //
        setProduct(response.data);
        setError(null);
        navigation.setOptions({ 
            title: response.data.title || 'Detalhes do Produto'
        });
      } catch (e) {
        console.error("Erro ao buscar detalhes do produto:", e);
        setError('Falha ao carregar detalhes do produto. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, navigation]);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.error }]}>{error || 'Produto não encontrado.'}</Text>
        <Button 
            mode="contained" 
            onPress={() => navigation.goBack()}
            style={{backgroundColor: theme.colors.accent}}
            labelStyle={{color: theme.colors.textOnPrimary}}
        >
            Voltar
        </Button>
      </View>
    );
  }

  const originalPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        {product.images && product.images.length > 0 && (
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.imageScrollContainer}>
            {product.images.map((imgUrl, index) => (
              <Image key={index} source={{ uri: imgUrl }} style={styles.productImage} resizeMode="contain" />
            ))}
          </ScrollView>
        )}
        <Card.Content style={styles.content}>
          <Title style={[styles.title, { color: theme.colors.primary }]}>{product.title}</Title>
          
          <View style={styles.priceContainer}>
            <Text style={[styles.currentPrice, { color: theme.colors.priceColor }]}>
              R$ {product.price.toFixed(2).replace('.',',')}
            </Text>
            {product.discountPercentage > 0 && (
              <Text style={[styles.originalPrice, { color: theme.colors.placeholder }]}>
                R$ {originalPrice.toFixed(2).replace('.',',')}
              </Text>
            )}
          </View>
          {product.discountPercentage > 0 && (
            <Chip 
                icon="brightness-percent" 
                style={[styles.discountChipProduct, {backgroundColor: theme.colors.secondaryAccent}]}
                textStyle={{color: theme.colors.primary, fontWeight: 'bold'}}
            >
                {product.discountPercentage.toFixed(0)}% DE DESCONTO
            </Chip>
          )}

          <Paragraph style={[styles.description, { color: theme.colors.text }]}>{product.description}</Paragraph>
          <Divider style={styles.divider} />

          <InfoRow label="Avaliação:" value={`${product.rating}/5`} icon="star" theme={theme} />
          <InfoRow label="Em estoque:" value={`${product.stock} unidades`} icon="package-variant" theme={theme} />
          <InfoRow label="Marca:" value={product.brand} icon="tag-outline" theme={theme} />
          <InfoRow label="SKU:" value={product.sku} icon="barcode" theme={theme} />
          {product.weight && <InfoRow label="Peso:" value={`${product.weight}g`} icon="weight-gram" theme={theme} />}
          {product.dimensions && <InfoRow label="Dimensões (LxAxP):" value={`${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`} icon="cube-scan" theme={theme} />}
          
          <Divider style={styles.divider} />
          <InfoRow label="Garantia:" value={product.warrantyInformation} icon="shield-check-outline" theme={theme} isParagraph/>
          <InfoRow label="Informações de Envio:" value={product.shippingInformation} icon="truck-delivery-outline" theme={theme} isParagraph/>
          <InfoRow 
            label="Disponibilidade:" 
            valueComponent={
                <Chip 
                    icon={product.availabilityStatus === 'In Stock' ? "check-circle" : "alert-circle"} 
                    textStyle={{color: product.availabilityStatus === 'In Stock' ? theme.colors.priceColor : theme.colors.error, fontWeight: 'bold'}}
                    style={{backgroundColor: product.availabilityStatus === 'In Stock' ? '#D4EFDF' : '#FADBD8', alignSelf:'flex-start'}}
                >
                    {product.availabilityStatus === 'In Stock' ? "Em Estoque" : "Indisponível"}
                </Chip>} 
            icon="storefront-outline" 
            theme={theme} 
          />

          {product.tags && product.tags.length > 0 && (
            <>
              <Divider style={styles.divider} />
              <Title style={[styles.sectionTitle, {color: theme.colors.primary}]}>Tags</Title>
              <View style={styles.tagsContainer}>
                {product.tags.map((tag, index) => (
                  <Chip key={index} style={[styles.tagChip, {backgroundColor: theme.colors.secondaryAccent, marginRight: 6, marginBottom: 6}]} textStyle={{color: theme.colors.primary, fontWeight:'500'}} icon="tag-multiple-outline">
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </Chip>
                ))}
              </View>
            </>
          )}

          {product.reviews && product.reviews.length > 0 && (
            <>
              <Divider style={styles.divider} />
              <Title style={[styles.sectionTitle, {color: theme.colors.primary}]}>Avaliações ({product.reviews.length})</Title>
              {product.reviews.slice(0, 3).map((review, index) => ( 
                <Card key={index} style={[styles.reviewCard, {backgroundColor: theme.colors.background, borderColor: theme.colors.primary, borderWidth: 0.5}]}>
                  <Card.Content>
                    <View style={styles.reviewHeader}>
                        <Title style={[styles.reviewRating, {color: theme.colors.text}]}>"{review.comment}"</Title>
                        <View style={styles.ratingStars}>
                            {[...Array(5)].map((_, i) => (
                                <Icon key={i} source={i < review.rating ? "star" : "star-outline"} size={18} color={theme.colors.secondaryAccent} />
                            ))}
                        </View>
                    </View>
                    <Text style={[styles.reviewAuthor, {color: theme.colors.text, opacity: 0.7}]}>
                        - {review.reviewerName} ({new Date(review.date).toLocaleDateString('pt-BR')})
                    </Text>
                  </Card.Content>
                </Card>
              ))}
            </>
          )}
        </Card.Content>
      </Card>
      
      {product.images && product.images.length > 1 && (
        <>
            <Title style={[styles.sectionTitle, {color: theme.colors.primary, marginLeft: 15, marginTop: 10}]}>Galeria de Imagens</Title>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageGallery}>
                {product.images.map((imgUrl, index) => (
                    <TouchableOpacity key={index} onPress={() => { /* Poderia abrir um modal com a imagem ampliada */ }}>
                        <Image source={{ uri: imgUrl }} style={[styles.galleryImage, {borderColor: theme.colors.primary}]} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </>
      )}
    </ScrollView>
  );
};


const InfoRow = ({ label, value, valueComponent, icon, theme, isParagraph = false }) => (
  <View style={styles.infoRow}>
    <View style={{flexDirection: 'row', alignItems: 'center', flex: 0.45}}>
        {icon && <Icon source={icon} size={20} color={theme.colors.accent} style={{marginRight: 8}} />}
        <Text style={[styles.label, { color: theme.colors.text, opacity: 0.8 }]}>{label}</Text>
    </View>
    {valueComponent ? valueComponent : 
        <Text style={[isParagraph ? styles.valueParagraph : styles.value, { color: theme.colors.text, flex: 0.55 }]}>{value}</Text>
    }
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    margin: 10,
    elevation: 3,
    borderRadius: 8, 
  },
  imageScrollContainer: {
    height: 300,
  },
  productImage: {
    width: 380, 
    height: 300,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 32,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 16,
    marginLeft: 10,
    textDecorationLine: 'line-through',
  },
  discountChipProduct: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'justify',
  },
  divider: {
    marginVertical: 16,
    height: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
    paddingVertical: 8,
  
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
  },
  value: {
    fontSize: 15,
    textAlign: 'right',
  },
  valueParagraph: { 
    fontSize: 15,
    textAlign: 'left',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tagChip: {
   
  },
  reviewCard: {
    marginTop: 10,
    marginBottom: 8,
    padding: 8,
    elevation: 1,
    borderRadius: 8, 
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewRating: {
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle:'italic',
    flex: 1, 
  },
  ratingStars: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  reviewAuthor: {
    fontSize: 13,
    textAlign: 'right',
    marginTop: 4,
  },
  imageGallery: {
    paddingVertical: 10,
    paddingLeft: 15, 
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1.5,
    marginRight: 10,
  }
});

export default ProdutoScreen;