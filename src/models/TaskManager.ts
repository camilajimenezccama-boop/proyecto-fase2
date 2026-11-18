import { ITarea, Prioridad } from '../interfaces/tarea.interface';

export class TaskManager {
  private tareas: ITarea[];
  private filtroActual: string;

  private formulario: HTMLFormElement;
  private inputTitulo: HTMLInputElement;
  private selectPrioridad: HTMLSelectElement;
  private listaContenedor: HTMLElement;
  private loadingState: HTMLElement;
  private botonesFiltro: NodeListOf<HTMLButtonElement>;

  constructor() {
    // 1. Estado inicial requerido por la Fase 1
    this.tareas = [
      { id: 1, titulo: 'Aprender la sintaxis de ES6', prioridad: 'Alta', completada: true },
      { id: 2, titulo: 'Dominar la asincronía y Fetch', prioridad: 'Media', completada: false },
      { id: 3, titulo: 'Migrar el proyecto a Angular', prioridad: 'Baja', completada: false }
    ];
    this.filtroActual = 'Todas';

    // 2. Selección segura de elementos del DOM con aserciones de tipo
    this.formulario = document.querySelector('#form-tareas') as HTMLFormElement;
    this.inputTitulo = document.querySelector('#input-titulo') as HTMLInputElement;
    this.selectPrioridad = document.querySelector('#select-prioridad') as HTMLSelectElement;
    this.listaContenedor = document.querySelector('#lista-tareas') as HTMLElement;
    this.loadingState = document.querySelector('#loading-state') as HTMLElement;
    this.botonesFiltro = document.querySelectorAll('.btn-filtro');

    this.inicializarEventos();
    this.inicializarApp();
  }

  // 3. Inicio asíncrono simulado (AJAX)
  private async inicializarApp(): Promise<void> {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 1500);
    });

    if (this.loadingState) {
      this.loadingState.style.display = 'none';
    }

    this.pintarTareas();
  }

  // 4. Configuración de Eventos
  private inicializarEventos(): void {
    // Envío del formulario
    this.formulario.addEventListener('submit', (event: SubmitEvent) => {
      event.preventDefault();
      this.agregarTarea();
    });

    // Clics en los botones de filtrado
    this.botonesFiltro.forEach((boton) => {
      boton.addEventListener('click', (event: MouseEvent) => {
        const target = event.currentTarget as HTMLButtonElement;
        
        const botonActivo = document.querySelector('.btn-filtro.active');
        if (botonActivo) {
          botonActivo.classList.remove('active');
        }

        target.classList.add('active');
        this.filtroActual = target.dataset.filtro || 'Todas';
        this.pintarTareas();
      });
    });
  }

  // 5. Método Público: Añadir una nueva tarea de forma inmutable
  public agregarTarea(): void {
    const titulo = this.inputTitulo.value.trim();
    const prioridad = this.selectPrioridad.value as Prioridad;

    if (titulo === '') return;

    const nuevaTarea: ITarea = {
      id: Date.now(),
      titulo,
      prioridad,
      completada: false
    };

    // Actualización inmutable del estado usando el operador spread
    this.tareas = [...this.tareas, nuevaTarea];

    this.pintarTareas();
    this.formulario.reset();
    this.inputTitulo.focus();
  }

  // 6. Método Público: Cambiar el estado completado/pendiente de forma inmutable
  public cambiarEstado(id: number): void {
    this.tareas = this.tareas.map((tareaActual) => {
      if (tareaActual.id === id) {
        return {
          ...tareaActual,
          completada: !tareaActual.completada
        };
      }
      return tareaActual;
    });

    this.pintarTareas();
  }

  // 7. Método Público: Renderizar los elementos en el DOM según el filtro actual
  public pintarTareas(): void {
    this.listaContenedor.innerHTML = '';

    const tareasFiltradas = this.tareas.filter((tarea) => {
      if (this.filtroActual === 'Pendientes') return !tarea.completada;
      if (this.filtroActual === 'Completadas') return tarea.completada;
      return true;
    });

    tareasFiltradas.forEach((tarea) => {
      const li = document.createElement('li');
      li.classList.add('item-tarea', tarea.prioridad);

      if (tarea.completada) {
        li.classList.add('completada');
      }

      const texto = document.createElement('span');
      texto.textContent = tarea.titulo;

      const botonEstado = document.createElement('button');
      botonEstado.type = 'button';
      botonEstado.textContent = tarea.completada ? 'Marcar pendiente' : 'Completar';

      botonEstado.addEventListener('click', () => {
        this.cambiarEstado(tarea.id);
      });

      li.appendChild(texto);
      li.appendChild(botonEstado);
      this.listaContenedor.appendChild(li);
    });
  }
}