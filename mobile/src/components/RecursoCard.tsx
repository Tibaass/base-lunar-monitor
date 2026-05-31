import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Recurso } from '../types';
import { cores, corDoStatus, iconeTipo } from '../theme/colors';
import StatusBadge from './StatusBadge';

interface Props {
  recurso: Recurso;
  onPress?: () => void;
}

export default function RecursoCard({ recurso, onPress }: Props) {
  const cor = corDoStatus(recurso.status);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressionado]}
    >
      <View style={[styles.barra, { backgroundColor: cor }]} />
      <View style={styles.conteudo}>
        <View style={styles.linhaTopo}>
          <Text style={styles.nome}>{recurso.nome}</Text>
          <StatusBadge status={recurso.status} />
        </View>
        <Text style={styles.tipo}>{iconeTipo(recurso.tipo)}</Text>
        <View style={styles.linhaValores}>
          <Text style={styles.valor}>
            {recurso.valorAtual}
            <Text style={styles.unidade}> {recurso.unidade}</Text>
          </Text>
          <Text style={styles.limite}>
            limite: {recurso.limiteCritico} {recurso.unidade}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: cores.superficie,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    overflow: 'hidden',
    marginBottom: 12,
  },
  pressionado: {
    opacity: 0.8,
  },
  barra: {
    width: 6,
  },
  conteudo: {
    flex: 1,
    padding: 16,
  },
  linhaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nome: {
    color: cores.texto,
    fontSize: 16,
    fontWeight: '700',
    flexShrink: 1,
    marginRight: 8,
  },
  tipo: {
    color: cores.textoSecundario,
    fontSize: 12,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  linhaValores: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  valor: {
    color: cores.texto,
    fontSize: 26,
    fontWeight: '800',
  },
  unidade: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.textoSecundario,
  },
  limite: {
    color: cores.textoSecundario,
    fontSize: 12,
  },
});
