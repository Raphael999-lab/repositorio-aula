import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Title } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reviewSchema } from '../utils/validators';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveReview } from '../api/storage';
import StarRating from '../components/StarRating';

export default function TeladeRevisao() {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipeId } = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(reviewSchema),
    defaultValues: {
      author: '',
      comment: '',
      rating: 0,
      recipeId: recipeId
    }
  });

  const ratingValue = watch('rating');

  const onSubmit = async (data) => {
    try {
      await saveReview(data);
      navigation.goBack();
    } catch (err) {
      console.error('Erro ao salvar avaliação:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Deixe sua Avaliação</Title>

      <Controller
        control={control}
        name="rating"
        render={({ field: { onChange } }) => (
          <StarRating
            rating={ratingValue}
            onRatingChange={onChange}
            size={40}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.rating}>
        {errors.rating?.message}
      </HelperText>

      <Controller
        control={control}
        name="author"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Seu nome"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.author}
            style={styles.input}
            accessibilityLabel="Campo para digitar seu nome"
          />
        )}
      />
      <HelperText type="error" visible={!!errors.author}>
        {errors.author?.message}
      </HelperText>

      <Controller
        control={control}
        name="comment"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Seu comentário"
            multiline
            numberOfLines={4}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.comment}
            style={styles.input}
            accessibilityLabel="Campo para digitar seu comentário"
          />
        )}
      />
      <HelperText type="error" visible={!!errors.comment}>
        {errors.comment?.message}
      </HelperText>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        accessibilityLabel="Botão para enviar sua avaliação"
      >
        Enviar Avaliação
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
    fontSize: 22
  },
  input: {
    marginTop: 8,
  },
  button: {
    marginTop: 24
  }
});
