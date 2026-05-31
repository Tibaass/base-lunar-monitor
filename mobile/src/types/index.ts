export type TipoRecurso = 'AGUA' | 'ENERGIA' | 'CLIMATIZACAO' | 'OXIGENIO';

export type DirecaoCritica = 'ABAIXO' | 'ACIMA';

export type StatusOperacional = 'NORMAL' | 'ATENCAO' | 'CRITICO';

export interface Recurso {
  id: number;
  nome: string;
  tipo: TipoRecurso;
  unidade: string;
  valorAtual: number;
  limiteCritico: number;
  direcaoCritica: DirecaoCritica;
  atualizadoEm: string;
  status: StatusOperacional;
}

export interface Sensor {
  id: number;
  nome: string;
  localizacao: string;
  ativo: boolean;
  recurso: Recurso;
  ultimaLeitura: string;
}

// dados pra criar um recurso (o backend gera id e status)
export interface NovoRecurso {
  nome: string;
  tipo: TipoRecurso;
  unidade: string;
  valorAtual: number;
  limiteCritico: number;
  direcaoCritica: DirecaoCritica;
}

// dados pra criar um sensor
export interface NovoSensor {
  nome: string;
  localizacao: string;
  ativo: boolean;
  recursoId: number;
}
