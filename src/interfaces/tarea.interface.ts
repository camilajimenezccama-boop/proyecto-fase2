export type Prioridad = 'Alta' | 'Media' | 'Baja';

export interface ITarea {
  id: number;
  titulo: string;
  prioridad: Prioridad;
  completada: boolean;
}