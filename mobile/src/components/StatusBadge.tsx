import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusOperacional } from '../types';
import { corDoStatus, rotuloStatus } from '../theme/colors';

interface Props {
  status: StatusOperacional;
}

export default function StatusBadge({ status }: Props) {
  const cor = corDoStatus(status);
  return (
    <View style={[styles.badge, { backgroundColor: cor + '22', borderColor: cor }]}>
      <View style={[styles.ponto, { backgroundColor: cor }]} />
      <Text style={[styles.texto, { color: cor }]}>{rotuloStatus(status)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  ponto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  texto: {
    fontSize: 12,
    fontWeight: '700',
  },
});
