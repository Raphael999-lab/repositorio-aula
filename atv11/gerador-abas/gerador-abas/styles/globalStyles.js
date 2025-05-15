import { StyleSheet } from 'react-native';
import { theme } from './themes';

export const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  containerCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  flex: {
    flex: 1,
  },

  // Cards
  card: {
    borderRadius: theme.roundness,
    elevation: 2,
    backgroundColor: theme.colors.surface,
    shadowColor: theme.colors.onBackground,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: theme.spacing.m,
    overflow: 'hidden',
  },
  cardContent: {
    padding: theme.spacing.m,
  },

  // Text Styles
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  title: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.s,
  },
  subtitle: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.m,
  },
  bodyText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.onSurface,
    lineHeight: 24,
  },
  caption: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.onSurface,
    opacity: 0.7,
  },

  // Buttons
  button: {
    borderRadius: theme.roundness,
    paddingVertical: theme.spacing.s,
    marginVertical: theme.spacing.s,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
  },
  buttonText: {
    color: theme.colors.onPrimary,
    fontWeight: '600',
    fontSize: 16,
  },

  // Forms
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: theme.spacing.s,
    marginVertical: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  inputLabel: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.onSurface,
    fontWeight: '600',
  },

  // Margins and Paddings
  mtXs: { marginTop: theme.spacing.xs },
  mtS: { marginTop: theme.spacing.s },
  mtM: { marginTop: theme.spacing.m },
  mtL: { marginTop: theme.spacing.l },
  mtXl: { marginTop: theme.spacing.xl },

  mbXs: { marginBottom: theme.spacing.xs },
  mbS: { marginBottom: theme.spacing.s },
  mbM: { marginBottom: theme.spacing.m },
  mbL: { marginBottom: theme.spacing.l },
  mbXl: { marginBottom: theme.spacing.xl },

  mlXs: { marginLeft: theme.spacing.xs },
  mlS: { marginLeft: theme.spacing.s },
  mlM: { marginLeft: theme.spacing.m },
  mlL: { marginLeft: theme.spacing.l },
  mlXl: { marginLeft: theme.spacing.xl },

  mrXs: { marginRight: theme.spacing.xs },
  mrS: { marginRight: theme.spacing.s },
  mrM: { marginRight: theme.spacing.m },
  mrL: { marginRight: theme.spacing.l },
  mrXl: { marginRight: theme.spacing.xl },

  mvXs: { marginVertical: theme.spacing.xs },
  mvS: { marginVertical: theme.spacing.s },
  mvM: { marginVertical: theme.spacing.m },
  mvL: { marginVertical: theme.spacing.l },
  mvXl: { marginVertical: theme.spacing.xl },

  mhXs: { marginHorizontal: theme.spacing.xs },
  mhS: { marginHorizontal: theme.spacing.s },
  mhM: { marginHorizontal: theme.spacing.m },
  mhL: { marginHorizontal: theme.spacing.l },
  mhXl: { marginHorizontal: theme.spacing.xl },

  // Utility Classes
  fullWidth: {
    width: '100%',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  textLowercase: {
    textTransform: 'lowercase',
  },
  hidden: {
    display: 'none',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.primary,
    marginVertical: theme.spacing.m,
  },
});

// Função para criar estilos dinâmicos baseados no tema
export const createStyles = (styles) => {
  return StyleSheet.create(styles(theme));
};

// Componentes específicos que podem ser reutilizados
export const cardHeaderStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
  },
  text: {
    color: theme.colors.onPrimary,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
  },
});

export const listItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primaryContainer,
  },
  icon: {
    marginRight: theme.spacing.m,
  },
});