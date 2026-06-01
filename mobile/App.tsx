import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList } from './src/navigation/types';
import { cores } from './src/theme/colors';

import DashboardScreen from './src/screens/DashboardScreen';
import RecursosScreen from './src/screens/RecursosScreen';
import RecursoFormScreen from './src/screens/RecursoFormScreen';
import RecursoDetalheScreen from './src/screens/RecursoDetalheScreen';
import SensoresScreen from './src/screens/SensoresScreen';
import SensorFormScreen from './src/screens/SensorFormScreen';
import AlertasScreen from './src/screens/AlertasScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const tema: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: cores.fundo,
    card: cores.superficie,
    text: cores.texto,
    border: cores.borda,
    primary: cores.primaria,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={tema}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: cores.superficie },
            headerTintColor: cores.texto,
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: cores.fundo },
          }}
        >
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Base Lunar' }} />
          <Stack.Screen name="Recursos" component={RecursosScreen} options={{ title: 'Recursos' }} />
          <Stack.Screen name="RecursoForm" component={RecursoFormScreen} options={{ title: 'Cadastrar Recurso' }} />
          <Stack.Screen name="RecursoDetalhe" component={RecursoDetalheScreen} options={{ title: 'Detalhe do Recurso' }} />
          <Stack.Screen name="Sensores" component={SensoresScreen} options={{ title: 'Sensores' }} />
          <Stack.Screen name="SensorForm" component={SensorFormScreen} options={{ title: 'Cadastrar Sensor' }} />
          <Stack.Screen name="Alertas" component={AlertasScreen} options={{ title: 'Alertas' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
