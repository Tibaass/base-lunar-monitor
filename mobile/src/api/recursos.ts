import { api } from './client';
import { NovoRecurso, Recurso, StatusOperacional } from '../types';

export async function listarRecursos(): Promise<Recurso[]> {
  const { data } = await api.get<Recurso[]>('/recursos');
  return data;
}

export async function buscarRecurso(id: number): Promise<Recurso> {
  const { data } = await api.get<Recurso>(`/recursos/${id}`);
  return data;
}

export async function criarRecurso(novo: NovoRecurso): Promise<Recurso> {
  const { data } = await api.post<Recurso>('/recursos', novo);
  return data;
}

export async function atualizarLeitura(id: number, valorAtual: number): Promise<Recurso> {
  const { data } = await api.put<Recurso>(`/recursos/${id}/leitura`, { valorAtual });
  return data;
}

export interface StatusResposta {
  id: number;
  nome: string;
  valorAtual: number;
  unidade: string;
  status: StatusOperacional;
}

export async function consultarStatus(id: number): Promise<StatusResposta> {
  const { data } = await api.get<StatusResposta>(`/recursos/${id}/status`);
  return data;
}
