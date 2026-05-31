import { api } from './client';
import { Recurso } from '../types';

export async function listarAlertas(): Promise<Recurso[]> {
  const { data } = await api.get<Recurso[]>('/alertas');
  return data;
}
