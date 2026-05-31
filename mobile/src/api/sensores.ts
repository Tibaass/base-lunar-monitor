import { api } from './client';
import { NovoSensor, Sensor } from '../types';

export async function listarSensores(): Promise<Sensor[]> {
  const { data } = await api.get<Sensor[]>('/sensores');
  return data;
}

export async function criarSensor(novo: NovoSensor): Promise<Sensor> {
  const { data } = await api.post<Sensor>('/sensores', novo);
  return data;
}
