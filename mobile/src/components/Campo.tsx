import React from 'react';
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native';
import { cores } from '../theme/colors';

interface Props {
  rotulo: string;
  valor: string;
  onChangeText: (texto: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}

export default function Campo({ rotulo, valor, onChangeText, placeholder, keyboardType }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={cores.textoSecundario}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  rotulo: {
    color: cores.textoSecundario,
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    color: cores.texto,
    fontSize: 16,
  },
});
