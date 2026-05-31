import axios from 'axios';
import { Platform } from 'react-native';

// no celular fisico troque pelo ip da sua maquina (ipconfig)
const LAN_IP = '192.168.0.10';
const PORTA = 8080;

function resolverBaseURL(): string {
  if (Platform.OS === 'web') {
    return `http://localhost:${PORTA}`;
  }
  if (Platform.OS === 'android') {
    // 10.0.2.2 = localhost do pc visto pelo emulador android
    return `http://10.0.2.2:${PORTA}`;
  }
  return `http://${LAN_IP}:${PORTA}`;
}

export const api = axios.create({
  baseURL: `${resolverBaseURL()}/api`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});
