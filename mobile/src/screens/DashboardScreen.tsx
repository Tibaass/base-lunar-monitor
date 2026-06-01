import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Recurso } from '../types';
import { listarRecursos } from '../api/recursos';
import { listarSensores } from '../api/sensores';
import { listarAlertas } from '../api/alertas';
import { cores } from '../theme/colors';
import Tela from '../components/Tela';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

export default function DashboardScreen({ navigation }: Props) {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [alertas, setAlertas] = useState<Recurso[]>([]);
  const [totalSensores, setTotalSensores] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    try {
      setErro(null);
      const [r, s, a] = await Promise.all([listarRecursos(), listarSensores(), listarAlertas()]);
      setRecursos(r);
      setTotalSensores(s.length);
      setAlertas(a);
    } catch (e) {
      setErro('Nao foi possivel conectar a API. Verifique se o backend esta rodando.');
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={carregando} onRefresh={carregar} tintColor={cores.primaria} />
        }
      >
        <Text style={styles.titulo}>Base Lunar</Text>
        <Text style={styles.subtitulo}>Monitoramento de Recursos</Text>

        {erro && <Text style={styles.erro}>{erro}</Text>}

        {carregando && recursos.length === 0 ? (
          <ActivityIndicator color={cores.primaria} style={{ marginTop: 40 }} />
        ) : (
          <>
            <View style={styles.cards}>
              <Indicador rotulo="Recursos" valor={recursos.length} cor={cores.primaria} />
              <Indicador rotulo="Sensores" valor={totalSensores} cor={cores.normal} />
              <Indicador
                rotulo="Alertas"
                valor={alertas.length}
                cor={alertas.length > 0 ? cores.critico : cores.normal}
              />
            </View>

            <Text style={styles.secao}>Navegacao</Text>
            <ItemMenu titulo="Recursos" descricao="Listar e cadastrar recursos" onPress={() => navigation.navigate('Recursos')} />
            <ItemMenu titulo="Sensores" descricao="Listar e cadastrar sensores" onPress={() => navigation.navigate('Sensores')} />
            <ItemMenu
              titulo="Alertas"
              descricao={alertas.length > 0 ? `${alertas.length} recurso(s) em risco` : 'Nenhum alerta ativo'}
              destaque={alertas.length > 0}
              onPress={() => navigation.navigate('Alertas')}
            />
          </>
        )}
      </ScrollView>
    </Tela>
  );
}

function Indicador({ rotulo, valor, cor }: { rotulo: string; valor: number; cor: string }) {
  return (
    <View style={styles.indicador}>
      <Text style={[styles.indicadorValor, { color: cor }]}>{valor}</Text>
      <Text style={styles.indicadorRotulo}>{rotulo}</Text>
    </View>
  );
}

function ItemMenu({
  titulo,
  descricao,
  onPress,
  destaque,
}: {
  titulo: string;
  descricao: string;
  onPress: () => void;
  destaque?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.item, destaque && styles.itemDestaque, pressed && { opacity: 0.8 }]}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitulo}>{titulo}</Text>
        <Text style={styles.itemDescricao}>{descricao}</Text>
      </View>
      <Text style={styles.seta}>{'>'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: cores.texto,
    fontSize: 30,
    fontWeight: '800',
    marginTop: 8,
  },
  subtitulo: {
    color: cores.textoSecundario,
    fontSize: 15,
    marginBottom: 20,
  },
  erro: {
    color: cores.critico,
    backgroundColor: cores.critico + '22',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  cards: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  indicador: {
    flex: 1,
    backgroundColor: cores.superficie,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingVertical: 18,
    alignItems: 'center',
  },
  indicadorValor: {
    fontSize: 30,
    fontWeight: '800',
  },
  indicadorRotulo: {
    color: cores.textoSecundario,
    fontSize: 13,
    marginTop: 4,
  },
  secao: {
    color: cores.texto,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.superficie,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginBottom: 12,
  },
  itemDestaque: {
    borderColor: cores.critico,
  },
  itemTitulo: {
    color: cores.texto,
    fontSize: 16,
    fontWeight: '700',
  },
  itemDescricao: {
    color: cores.textoSecundario,
    fontSize: 13,
    marginTop: 2,
  },
  seta: {
    color: cores.textoSecundario,
    fontSize: 20,
    fontWeight: '700',
  },
});
