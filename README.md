#  DevTask - Fase 2 (TypeScript Puro)

Refactorización de la aplicación de gestión de tareas DevTask de JavaScript Vanilla a TypeScript estricto, aplicando Programación Orientada a Objetos (POO), interfaces y manipulación nativa del DOM (Módulo DWEC).

## Funcionalidades

Carga inicial simulada: Indicador de carga asíncrono antes de mostrar las tareas.
Añadir tareas: Creación de tareas con título y prioridad (Alta, Media o Baja).
Cambiar estado: Marcar tareas como completadas o devolverlas a pendientes.
Filtros: Vista rápida por Todas, Pendientes o Completadas

##  Aspectos Técnicos

Tipado estricto: Uso de la interfaz Tarea y el tipo literal Prioridad (sin uso de any).
Encapsulación (POO): Toda la lógica y las referencias al DOM están privadas dentro de la clase TaskManager.
Inmutabilidad: Actualización del listado mediante spread operator y .map().

## Estructura del Proyecto

dist/
    app.js                     # Código JavaScript compilado
src/
    interfaces/
              tarea.interface.ts     # Interfaz Tarea y tipo Prioridad
     models/
               TaskManager.ts         # Clase principal de gestión
     app.ts                     # Punto de entrada
index.html                     # Estructura HTML
style.css                      # Estilos (Modo Oscuro)
tsconfig.json                  # Configuración del compilador (strict: true)




