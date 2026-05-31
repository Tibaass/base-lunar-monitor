import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores } from '../theme/colors';

interface Props {
  children: React.ReactNode;
  estilo?: ViewStyle;
}

export default function Tela({ children, estilo }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={[styles.conteudo, estilo]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
