import { StatusOperacional, TipoRecurso } from '../types';

export const cores = {
  fundo: '#0B1020',
  superficie: '#161D33',
  borda: '#2A3550',
  texto: '#E8ECF6',
  textoSecundario: '#9AA6C4',
  primaria: '#5B8DEF',
  normal: '#2FBF71',
  atencao: '#F2B705',
  critico: '#E5484D',
};

export function corDoStatus(status: StatusOperacional): string {
  switch (status) {
    case 'CRITICO':
      return cores.critico;
    case 'ATENCAO':
      return cores.atencao;
    default:
      return cores.normal;
  }
}

export function rotuloStatus(status: StatusOperacional): string {
  switch (status) {
    case 'CRITICO':
      return 'Critico';
    case 'ATENCAO':
      return 'Atencao';
    default:
      return 'Normal';
  }
}

export function iconeTipo(tipo: TipoRecurso): string {
  switch (tipo) {
    case 'AGUA':
      return 'Agua';
    case 'ENERGIA':
      return 'Energia';
    case 'CLIMATIZACAO':
      return 'Clima';
    case 'OXIGENIO':
      return 'O2';
    default:
      return '';
  }
}
