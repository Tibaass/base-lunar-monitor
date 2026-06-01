import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Sensor } from '../types';
import { listarSensores } from '../api/sensores';
import { cores } from '../theme/colors';
import Tela from '../components/Tela';
import Botao from '../components/Botao';

type Props = NativeStackScreenProps<RootStackParamList, 'Sensores'>;

export default function SensoresScreen({ navigation }: Props) {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    try {
      setErro(null);
      setSensores(await listarSensores());
    } catch (e) {
      setErro('Erro ao carregar sensores.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setCarregando(true);
      carregar();
    }, [carregar]),
  );

  return (
    <Tela>
      <Botao
        titulo="+ Cadastrar sensor"
        onPress={() => navigation.navigate('SensorForm')}
        estilo={{ marginVertical: 12 }}
      />
      {carregando ? (
        <ActivityIndicator color={cores.primaria} style={{ marginTop: 40 }} />
      ) : erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : (
        <FlatList
          data={sensores}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          refreshing={carregando}
          onRefresh={carregar}
          ListEmptyComponent={<Text style={styles.vazio}>Nenhum sensor cadastrado.</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.linhaTopo}>
                <Text style={styles.nome}>{item.nome}</Text>
                <View style={[styles.tag, { backgroundColor: (item.ativo ? cores.normal : cores.textoSecundario) + '22' }]}>
                  <Text style={[styles.tagTexto, { color: item.ativo ? cores.normal : cores.textoSecundario }]}>
                    {item.ativo ? 'Ativo' : 'Inativo'}
                  </Text>
                </View>
              </View>
              <Text style={styles.local}>{item.localizacao}</Text>
              <Text style={styles.recurso}>Recurso: {item.recurso?.nome ?? '-'}</Text>
            </View>
          )}
        />
      )}
    </Tela>
  );
}

const styles = StyleSheet.create({
  erro: { color: cores.critico, marginTop: 20, textAlign: 'center' },
  vazio: { color: cores.textoSecundario, textAlign: 'center', marginTop: 40 },
  card: {
    backgroundColor: cores.superficie,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginBottom: 12,
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
  local: {
    color: cores.textoSecundario,
    fontSize: 13,
    marginTop: 4,
  },
  recurso: {
    color: cores.primaria,
    fontSize: 13,
    marginTop: 8,
    fontWeight: '600',
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagTexto: {
    fontSize: 12,
    fontWeight: '700',
  },
});
