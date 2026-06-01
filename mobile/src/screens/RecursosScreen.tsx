import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Recurso } from '../types';
import { listarRecursos } from '../api/recursos';
import { cores } from '../theme/colors';
import Tela from '../components/Tela';
import RecursoCard from '../components/RecursoCard';
import Botao from '../components/Botao';

type Props = NativeStackScreenProps<RootStackParamList, 'Recursos'>;

export default function RecursosScreen({ navigation }: Props) {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    try {
      setErro(null);
      setRecursos(await listarRecursos());
    } catch (e) {
      setErro('Erro ao carregar recursos.');
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
        titulo="+ Cadastrar recurso"
        onPress={() => navigation.navigate('RecursoForm')}
        estilo={{ marginVertical: 12 }}
      />
      {carregando ? (
        <ActivityIndicator color={cores.primaria} style={{ marginTop: 40 }} />
      ) : erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : (
        <FlatList
          data={recursos}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          refreshing={carregando}
          onRefresh={carregar}
          ListEmptyComponent={<Text style={styles.vazio}>Nenhum recurso cadastrado.</Text>}
          renderItem={({ item }) => (
            <RecursoCard
              recurso={item}
              onPress={() => navigation.navigate('RecursoDetalhe', { id: item.id })}
            />
          )}
        />
      )}
    </Tela>
  );
}

const styles = StyleSheet.create({
  erro: {
    color: cores.critico,
    marginTop: 20,
    textAlign: 'center',
  },
  vazio: {
    color: cores.textoSecundario,
    textAlign: 'center',
    marginTop: 40,
  },
});
