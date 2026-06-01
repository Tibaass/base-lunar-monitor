import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Recurso } from '../types';
import { listarRecursos } from '../api/recursos';
import { criarSensor } from '../api/sensores';
import { cores } from '../theme/colors';
import Tela from '../components/Tela';
import Campo from '../components/Campo';
import Seletor from '../components/Seletor';
import Botao from '../components/Botao';

type Props = NativeStackScreenProps<RootStackParamList, 'SensorForm'>;

export default function SensorFormScreen({ navigation }: Props) {
  const [nome, setNome] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [ativo, setAtivo] = useState<'true' | 'false'>('true');
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [recursoId, setRecursoId] = useState<string>('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const carregar = useCallback(async () => {
    try {
      const lista = await listarRecursos();
      setRecursos(lista);
      if (lista.length > 0) setRecursoId(String(lista[0].id));
    } catch (e) {
      Alert.alert('Erro', 'Nao foi possivel carregar os recursos.');
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

  async function salvar() {
    if (!nome.trim() || !localizacao.trim() || !recursoId) {
      Alert.alert('Atencao', 'Preencha todos os campos e escolha um recurso.');
      return;
    }
    try {
      setSalvando(true);
      await criarSensor({
        nome: nome.trim(),
        localizacao: localizacao.trim(),
        ativo: ativo === 'true',
        recursoId: Number(recursoId),
      });
      Alert.alert('Sucesso', 'Sensor cadastrado!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Nao foi possivel cadastrar o sensor.');
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <Tela>
        <ActivityIndicator color={cores.primaria} style={{ marginTop: 40 }} />
      </Tela>
    );
  }

  return (
    <Tela>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 16 }}>
        <Text style={styles.titulo}>Novo sensor</Text>
        <Campo rotulo="Nome" valor={nome} onChangeText={setNome} placeholder="Ex.: Sensor de Nivel A1" />
        <Campo
          rotulo="Localizacao"
          valor={localizacao}
          onChangeText={setLocalizacao}
          placeholder="Ex.: Modulo A - Tanque 1"
        />
        <Seletor
          rotulo="Situacao"
          opcoes={[
            { valor: 'true', rotulo: 'Ativo' },
            { valor: 'false', rotulo: 'Inativo' },
          ]}
          selecionado={ativo}
          onSelecionar={setAtivo}
        />
        {recursos.length === 0 ? (
          <Text style={styles.aviso}>
            Cadastre um recurso antes de criar um sensor.
          </Text>
        ) : (
          <Seletor
            rotulo="Recurso monitorado"
            opcoes={recursos.map((r) => ({ valor: String(r.id), rotulo: r.nome }))}
            selecionado={recursoId}
            onSelecionar={setRecursoId}
          />
        )}
        <Botao
          titulo="Salvar"
          onPress={salvar}
          carregando={salvando}
          desabilitado={recursos.length === 0}
          estilo={{ marginTop: 8 }}
        />
      </ScrollView>
    </Tela>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: cores.texto,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16,
  },
  aviso: {
    color: cores.atencao,
    marginBottom: 16,
  },
});
