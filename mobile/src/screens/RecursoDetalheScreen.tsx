import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Recurso } from '../types';
import { atualizarLeitura, buscarRecurso } from '../api/recursos';
import { cores, iconeTipo } from '../theme/colors';
import Tela from '../components/Tela';
import StatusBadge from '../components/StatusBadge';
import Campo from '../components/Campo';
import Botao from '../components/Botao';

type Props = NativeStackScreenProps<RootStackParamList, 'RecursoDetalhe'>;

export default function RecursoDetalheScreen({ route }: Props) {
  const { id } = route.params;
  const [recurso, setRecurso] = useState<Recurso | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [novaLeitura, setNovaLeitura] = useState('');
  const [salvando, setSalvando] = useState(false);

  const carregar = useCallback(async () => {
    try {
      const r = await buscarRecurso(id);
      setRecurso(r);
      setNovaLeitura(String(r.valorAtual));
    } catch (e) {
      Alert.alert('Erro', 'Nao foi possivel carregar o recurso.');
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      setCarregando(true);
      carregar();
    }, [carregar]),
  );

  async function salvarLeitura() {
    const valor = Number(novaLeitura.replace(',', '.'));
    if (Number.isNaN(valor)) {
      Alert.alert('Atencao', 'Informe um numero valido.');
      return;
    }
    try {
      setSalvando(true);
      const atualizado = await atualizarLeitura(id, valor);
      setRecurso(atualizado);
      Alert.alert('Sucesso', 'Leitura atualizada!');
    } catch (e) {
      Alert.alert('Erro', 'Nao foi possivel atualizar a leitura.');
    } finally {
      setSalvando(false);
    }
  }

  if (carregando || !recurso) {
    return (
      <Tela>
        <ActivityIndicator color={cores.primaria} style={{ marginTop: 40 }} />
      </Tela>
    );
  }

  return (
    <Tela>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 16 }}>
        <Text style={styles.tipo}>{iconeTipo(recurso.tipo)}</Text>
        <Text style={styles.nome}>{recurso.nome}</Text>
        <StatusBadge status={recurso.status} />

        <View style={styles.painel}>
          <Text style={styles.valor}>
            {recurso.valorAtual}
            <Text style={styles.unidade}> {recurso.unidade}</Text>
          </Text>
          <Linha rotulo="Limite critico" valor={`${recurso.limiteCritico} ${recurso.unidade}`} />
          <Linha
            rotulo="Direcao critica"
            valor={recurso.direcaoCritica === 'ABAIXO' ? 'Abaixo do limite' : 'Acima do limite'}
          />
          <Linha rotulo="Atualizado em" valor={formatarData(recurso.atualizadoEm)} />
        </View>

        <Text style={styles.secao}>Registrar nova leitura</Text>
        <Campo
          rotulo={`Valor atual (${recurso.unidade})`}
          valor={novaLeitura}
          onChangeText={setNovaLeitura}
          keyboardType="numeric"
        />
        <Botao titulo="Atualizar leitura" onPress={salvarLeitura} carregando={salvando} />
      </ScrollView>
    </Tela>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View style={styles.linha}>
      <Text style={styles.linhaRotulo}>{rotulo}</Text>
      <Text style={styles.linhaValor}>{valor}</Text>
    </View>
  );
}

function formatarData(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR');
}

const styles = StyleSheet.create({
  tipo: {
    color: cores.textoSecundario,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  nome: {
    color: cores.texto,
    fontSize: 26,
    fontWeight: '800',
    marginVertical: 6,
  },
  painel: {
    backgroundColor: cores.superficie,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 18,
    marginTop: 16,
    marginBottom: 24,
  },
  valor: {
    color: cores.texto,
    fontSize: 40,
    fontWeight: '800',
    marginBottom: 12,
  },
  unidade: {
    fontSize: 18,
    color: cores.textoSecundario,
    fontWeight: '600',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
  },
  linhaRotulo: {
    color: cores.textoSecundario,
    fontSize: 14,
  },
  linhaValor: {
    color: cores.texto,
    fontSize: 14,
    fontWeight: '600',
  },
  secao: {
    color: cores.texto,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
});
