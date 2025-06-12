import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, HelperText, Avatar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { recipeSchema } from '../utils/validators';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRecipeById, saveRecipe, getCategories } from '../api/storage';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';

export default function TelaEditarReceita() {
  const navigation = useNavigation();
  const route = useRoute();
  const recipeId = route.params?.recipeId;
  const [categories, setCategories] = useState([]);
  const [imageUri, setImageUri] = useState(null);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(recipeSchema)
  });

  useEffect(() => {
    const loadInitialData = async () => {
      const storedCategories = await getCategories();
      setCategories(storedCategories);

      if (recipeId) {
        const recipe = await getRecipeById(recipeId);
        if (recipe) {
          Object.keys(recipe).forEach(key => setValue(key, recipe[key]));
          if (recipe.imageUri) setImageUri(recipe.imageUri);
        }
      }
    };
    loadInitialData();
  }, [recipeId, setValue]);

  const selecionarImagem = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImageUri(resultado.assets[0].uri);
      setValue('imageUri', resultado.assets[0].uri);
    }
  };

  const onSubmit = async (data) => {
    await saveRecipe({ ...data, id: recipeId });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nome da Receita"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
            style={styles.input}
          />
        )}
      />
      <HelperText type="error">{errors.name?.message}</HelperText>

      {/* Campo de tempo com máscara (HH:mm) */}
      <Controller
        name="prepTime"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInputMask
            type={'custom'}
            options={{ mask: '99:99' }}
            value={value}
            onChangeText={onChange}
            customTextInput={TextInput}
            customTextInputProps={{
              label: "Tempo de Preparo (HH:mm)",
              style: styles.input,
              error: !!errors.prepTime
            }}
          />
        )}
      />
      <HelperText type="error">{errors.prepTime?.message}</HelperText>

      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Descrição"
            multiline
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.description}
            style={styles.input}
          />
        )}
      />
      <HelperText type="error">{errors.description?.message}</HelperText>

      <Controller
        name="categoryId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerContainer}>
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Selecione uma Categoria..." value={null} />
              {categories.map(cat => (
                <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
              ))}
            </Picker>
          </View>
        )}
      />

      <Controller
        name="ingredients"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Ingredientes (separados por vírgula)"
            multiline
            numberOfLines={4}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.ingredients}
            style={styles.input}
          />
        )}
      />
      <HelperText type="error">{errors.ingredients?.message}</HelperText>

      <Controller
        name="instructions"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Modo de Preparo"
            multiline
            numberOfLines={6}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.instructions}
            style={styles.input}
          />
        )}
      />
      <HelperText type="error">{errors.instructions?.message}</HelperText>

      {/* Selecionar imagem da galeria */}
      <Button
        icon="camera"
        mode="outlined"
        onPress={selecionarImagem}
        style={styles.button}
      >
        Selecionar Imagem
      </Button>

      {imageUri && (
        <Avatar.Image
          size={80}
          source={{ uri: imageUri }}
          style={styles.avatar}
        />
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        {recipeId ? 'Atualizar Receita' : 'Salvar Receita'}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { marginTop: 8 },
  button: { marginTop: 16 },
  avatar: { alignSelf: 'center', marginTop: 16 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginTop: 8,
  },
});
