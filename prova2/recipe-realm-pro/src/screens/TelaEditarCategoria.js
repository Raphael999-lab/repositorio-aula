import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { categorySchema } from '../utils/validators';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getCategoryById, saveCategory } from '../api/storage';

export default function TelaEditarCategoria() {
  const navigation = useNavigation();
  const route = useRoute();
  const categoryId = route.params?.categoryId;

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: { name: '', description: '', color: '#', icon: '' }
  });

  useEffect(() => {
    if (categoryId) {
      const carregarCategoria = async () => {
        const categoria = await getCategoryById(categoryId);
        if (categoria) {
          setValue('name', categoria.name);
          setValue('description', categoria.description);
          setValue('color', categoria.color);
          setValue('icon', categoria.icon);
        }
      };
      carregarCategoria();
    }
  }, [categoryId, setValue]);

  const onSubmit = async (dados) => {
    await saveCategory({ ...dados, id: categoryId });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nome da Categoria"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
            style={styles.input}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.name}>
        {errors.name?.message}
      </HelperText>

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Descrição"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.description}
            style={styles.input}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.description}>
        {errors.description?.message}
      </HelperText>

      <Controller
        control={control}
        name="color"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Cor (formato hexadecimal: #RRGGBB)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.color}
            style={styles.input}
            placeholder="#FF5733"
          />
        )}
      />
      <HelperText type="error" visible={!!errors.color}>
        {errors.color?.message}
      </HelperText>

      <Controller
        control={control}
        name="icon"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Ícone (MaterialCommunityIcons)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.icon}
            style={styles.input}
            placeholder="Ex: food-apple, cake-variant"
          />
        )}
      />
      <HelperText type="error" visible={!!errors.icon}>
        {errors.icon?.message}
      </HelperText>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        {categoryId ? 'Atualizar Categoria' : 'Salvar Categoria'}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { marginTop: 8 },
  button: { marginTop: 24 },
});
