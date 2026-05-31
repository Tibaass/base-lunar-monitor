import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme/colors';

interface Opcao<T> {
  valor: T;
  rotulo: string;
}

interface Props<T extends string> {
  rotulo: string;
  opcoes: Opcao<T>[];
  selecionado: T;
  onSelecionar: (valor: T) => void;
}

export default function Seletor<T extends string>({
  rotulo,
  opcoes,
  selecionado,
  onSelecionar,
}: Props<T>) {
  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <View style={styles.linha}>
        {opcoes.map((op) => {
          const ativo = op.valor === selecionado;
          return (
            <Pressable
              key={op.valor}
              onPress={() => onSelecionar(op.valor)}
              style={[styles.chip, ativo && styles.chipAtivo]}
            >
              <Text style={[styles.chipTexto, ativo && styles.chipTextoAtivo]}>{op.rotulo}</Text>
            </Pressable>
          );
        })}
      </View>
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
  linha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.superficie,
  },
  chipAtivo: {
    borderColor: cores.primaria,
    backgroundColor: cores.primaria + '22',
  },
  chipTexto: {
    color: cores.textoSecundario,
    fontWeight: '600',
  },
  chipTextoAtivo: {
    color: cores.texto,
  },
});
