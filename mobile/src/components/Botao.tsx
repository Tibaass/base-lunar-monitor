import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { cores } from '../theme/colors';

interface Props {
  titulo: string;
  onPress: () => void;
  variante?: 'primaria' | 'secundaria';
  carregando?: boolean;
  desabilitado?: boolean;
  estilo?: ViewStyle;
}

export default function Botao({
  titulo,
  onPress,
  variante = 'primaria',
  carregando = false,
  desabilitado = false,
  estilo,
}: Props) {
  const secundaria = variante === 'secundaria';
  const inativo = desabilitado || carregando;
  return (
    <Pressable
      onPress={onPress}
      disabled={inativo}
      style={({ pressed }) => [
        styles.base,
        secundaria ? styles.secundaria : styles.primaria,
        (pressed || inativo) && styles.pressionado,
        estilo,
      ]}
    >
      {carregando ? (
        <ActivityIndicator color={cores.branco} />
      ) : (
        <Text style={[styles.texto, secundaria && styles.textoSecundario]}>{titulo}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaria: {
    backgroundColor: cores.primaria,
  },
  secundaria: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: cores.borda,
  },
  pressionado: {
    opacity: 0.7,
  },
  texto: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: '700',
  },
  textoSecundario: {
    color: cores.texto,
  },
});
