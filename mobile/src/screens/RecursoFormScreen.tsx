import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { DirecaoCritica, TipoRecurso } from '../types';
import { criarRecurso } from '../api/recursos';
import { cores } from '../theme/colors';
import Tela from '../components/Tela';
import Campo from '../components/Campo';
import Seletor from '../components/Seletor';
import Botao from '../components/Botao';

type Props = NativeStackScreenProps<RootStackParamList, 'RecursoForm'>;

const TIPOS: { valor: TipoRecurso; rotulo: string }[] = [
  { valor: 'AGUA', rotulo: 'Agua' },
  { valor: 'ENERGIA', rotulo: 'Energia' },
  { valor: 'CLIMATIZACAO', rotulo: 'Climatizacao' },
  { valor: 'OXIGENIO', rotulo: 'Oxigenio' },
];

const DIRECOES: { valor: DirecaoCritica; rotulo: string }[] = [
  { valor: 'ABAIXO', rotulo: 'Critico abaixo do limite' },
  { valor: 'ACIMA', rotulo: 'Critico acima do limite' },
];

export default function RecursoFormScreen({ navigation }: Props) {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState<TipoRecurso>('AGUA');
  const [unidade, setUnidade] = useState('%');
  const [valorAtual, setValorAtual] = useState('');
  const [limiteCritico, setLimiteCritico] = useState('');
  const [direcaoCritica, setDirecaoCritica] = useState<DirecaoCritica>('ABAIXO');
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    if (!nome.trim() || !unidade.trim() || !valorAtual.trim() || !limiteCritico.trim()) {
      Alert.alert('Atencao', 'Preencha todos os campos.');
      return;
    }
    const valor = Number(valorAtual.replace(',', '.'));
    const limite = Number(limiteCritico.replace(',', '.'));
    if (Number.isNaN(valor) || Number.isNaN(limite)) {
      Alert.alert('Atencao', 'Valor atual e limite devem ser numericos.');
      return;
    }
    try {
      setSalvando(true);
      await criarRecurso({
        nome: nome.trim(),
        tipo,
        unidade: unidade.trim(),
        valorAtual: valor,
        limiteCritico: limite,
        direcaoCritica,
      });
      Alert.alert('Sucesso', 'Recurso cadastrado!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Nao foi possivel cadastrar o recurso.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Tela>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 16 }}>
        <Text style={styles.titulo}>Novo recurso</Text>
        <Campo rotulo="Nome" valor={nome} onChangeText={setNome} placeholder="Ex.: Reservatorio de Agua" />
        <Seletor rotulo="Tipo" opcoes={TIPOS} selecionado={tipo} onSelecionar={setTipo} />
        <Campo rotulo="Unidade" valor={unidade} onChangeText={setUnidade} placeholder="%, kWh, L, Celsius" />
        <Campo
          rotulo="Valor atual"
          valor={valorAtual}
          onChangeText={setValorAtual}
          placeholder="Ex.: 78"
          keyboardType="numeric"
        />
        <Campo
          rotulo="Limite critico"
          valor={limiteCritico}
          onChangeText={setLimiteCritico}
          placeholder="Ex.: 20"
          keyboardType="numeric"
        />
        <Seletor
          rotulo="Direcao critica"
          opcoes={DIRECOES}
          selecionado={direcaoCritica}
          onSelecionar={setDirecaoCritica}
        />
        <Botao titulo="Salvar" onPress={salvar} carregando={salvando} estilo={{ marginTop: 8 }} />
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
});
