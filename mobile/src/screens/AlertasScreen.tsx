import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Recurso } from '../types';
import { listarAlertas } from '../api/alertas';
import { cores } from '../theme/colors';
import Tela from '../components/Tela';
import RecursoCard from '../components/RecursoCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Alertas'>;

export default function AlertasScreen({ navigation }: Props) {
  const [alertas, setAlertas] = useState<Recurso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    try {
      setErro(null);
      setAlertas(await listarAlertas());
    } catch (e) {
      setErro('Erro ao carregar alertas.');
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

  if (carregando) {
    return (
      <Tela>
        <ActivityIndicator color={cores.primaria} style={{ marginTop: 40 }} />
      </Tela>
    );
  }

  return (
    <Tela>
      {erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : (
        <FlatList
          data={alertas}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          refreshing={carregando}
          onRefresh={carregar}
          contentContainerStyle={{ paddingTop: 12 }}
          ListEmptyComponent={
            <View style={styles.okBox}>
              <Text style={styles.okTitulo}>Tudo sob controle</Text>
              <Text style={styles.okTexto}>Nenhum recurso em nivel de atencao ou critico.</Text>
            </View>
          }
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
  erro: { color: cores.critico, marginTop: 20, textAlign: 'center' },
  okBox: {
    backgroundColor: cores.normal + '15',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.normal,
    padding: 24,
    marginTop: 40,
    alignItems: 'center',
  },
  okTitulo: {
    color: cores.normal,
    fontSize: 18,
    fontWeight: '800',
  },
  okTexto: {
    color: cores.textoSecundario,
    marginTop: 6,
    textAlign: 'center',
  },
});
