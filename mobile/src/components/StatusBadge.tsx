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
    <View style={[styles.badge, { borderColor: cor }]}>
      <Text style={[styles.texto, { color: cor }]}>{rotuloStatus(status)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  texto: {
    fontSize: 12,
    fontWeight: '700',
  },
});
