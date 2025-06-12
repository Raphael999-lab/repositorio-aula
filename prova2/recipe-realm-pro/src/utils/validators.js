import * as yup from 'yup';

export const recipeSchema = yup.object().shape({
  name: yup.string().required('O nome da receita é obrigatório.'),
  description: yup.string().required('A descrição é obrigatória.'),
  prepTime: yup.string().required('O tempo de preparo é obrigatório.'),
  ingredients: yup.string().required('Os ingredientes são obrigatórios.'),
  instructions: yup.string().required('O modo de preparo é obrigatório.'),
  categoryId: yup.string().nullable(),
  imageUri: yup.string().nullable(),
});

export const categorySchema = yup.object().shape({
  name: yup.string().required('O nome da categoria é obrigatório.'),
  description: yup.string().required('A descrição é obrigatória.'),
  color: yup.string().required('A cor é obrigatória.').matches(/^#[0-9A-Fa-f]{6}$/, 'Formato de cor inválido (ex: #FF5733)'),
  icon: yup.string().required('O ícone é obrigatório (ex: food-apple).'),
});

export const reviewSchema = yup.object().shape({
    author: yup.string().required('Seu nome é obrigatório.'),
    comment: yup.string().required('O comentário é obrigatório.'),
    rating: yup.number().min(1, 'A avaliação não pode ser 0.').max(5).required(),
    recipeId: yup.string().required(),
});