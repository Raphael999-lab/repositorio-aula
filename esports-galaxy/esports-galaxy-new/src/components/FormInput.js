import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

const FormInput = ({
  label,
  value,
  onChangeText,
  error,
  mask,
  keyboardType,
  secureTextEntry,
  multiline,
  numberOfLines,
  style,
  maxLength,
  placeholder,
  ...props
}) => {
  // Aplicar máscara manualmente se necessário
  const handleTextChange = (text) => {
    if (mask) {
      // Aplicar máscara básica
      let maskedText = text;
      
      switch (mask) {
        case 'cpf':
          maskedText = text
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
          break;
          
        case 'phone':
          maskedText = text
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
          break;
          
        case 'date':
          maskedText = text
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\/\d{4})\d+?$/, '$1');
          break;
      }
      
      onChangeText(maskedText);
    } else {
      onChangeText(text);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        label={label}
        value={value}
        onChangeText={handleTextChange}
        mode="outlined"
        theme={{
          colors: {
            primary: '#00ffff',
            text: '#ffffff',
            placeholder: '#99ccff',
            background: '#001a4d',
            onSurfaceVariant: '#99ccff', // Cor do label
            outline: '#0066ff',
            error: '#ff0066',
          },
        }}
        style={styles.input}
        textColor="#ffffff" // IMPORTANTE: Define a cor do texto digitado
        error={!!error}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        placeholder={placeholder}
        placeholderTextColor="#99ccff"
        outlineColor="#0066ff"
        activeOutlineColor="#00ffff"
        {...props}
      />
      {error && (
        <HelperText type="error" visible={!!error} style={styles.errorText}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    backgroundColor: '#001a4d',
    color: '#ffffff', // Cor do texto
  },
  errorText: {
    color: '#ff0066',
  },
});

export default FormInput;