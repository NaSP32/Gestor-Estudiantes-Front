# 🎓 Gestor de Estudiantes - Proyecto Final Integrador

Esta es una aplicación web SPA (Single Page Application) desarrollada en React.js como proyecto final integrador. El objetivo es consumir una API REST de Node.js (desplegada en Vercel) para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una base de datos de estudiantes.

##  Funcionalidades Principales

* **Listado y Filtrado:** Visualización de todos los estudiantes en una tabla y filtrado por curso.
* **Creación:** Formulario para registrar nuevos estudiantes.
* **Gestión (Modificar/Eliminar):** Panel de búsqueda para encontrar, modificar o eliminar estudiantes existentes.
* **Navegación:** Múltiples vistas (Inicio, Lista, Nuevo, Editar) gestionadas con React Router.
* **Notificaciones:** Feedback global para el usuario tras realizar acciones (crear, editar, eliminar) usando `useContext`.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React + Vite
* **Librería de UI:** Material UI (MUI)
* **Routing:** React Router DOM
* **Backend (Consumido):** API de Node.js/Express desplegada en Vercel.
* **Base de Datos (del Backend):** MongoDB Atlas

---

## 📐 Justificación de las Decisiones Técnicas

La arquitectura del proyecto se diseñó para cumplir con los requisitos obligatorios del proyecto, priorizando la separación de responsabilidades.

### 1. `react-router-dom` (Ruteo Obligatorio)

### 2. `useContext` (Contexto Obligatorio)

### 3. Custom Hooks (Hooks)

* Se crearon hooks personalizados para separar la lógica de estado de los componentes visuales:
    * `useStudents`: Abstrae toda la lógica de `fetch` (GET), estado de carga (`isLoading`), manejo de errores (`error`) y los datos (`students`) de la lista completa.
    * `useStudent`: Hook similar pero para obtener un solo estudiante por ID (usado en la vista de edición).
    * `useNotification`: Un hook simple para consumir el `NotificationContext` de forma limpia.

### 4. Capa de Servicios (`/services/studentService.js`)

* Este archivo se comunica con la API. Centraliza todas las llamadas `fetch` (GET, POST, PUT, DELETE) y el manejo de las URLs. Si la API cambia, solo se modifica este archivo.

### 5. Estructura de Carpetas (`/pages`, `/components`)

* Se adoptó la arquitectura sugerida:
    * `/pages`: Contienen las vistas principales (ej. `StudentListPage`, `EditStudentPage`). Obtienen datos usando los hooks
    * `/components`: Contienen componentes reutilizables (ej. `TablaEstudiantes`, `EditStudentForm`). Son componentes que reciben props y renderizan UI.


---

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio

```
git clone https://github.com/NaSP32/FrontGestorDeEstudiantes/tree/main.git
cd gestor-estudiantes
npm install
``` 

### 2. Instalar dependencias

```bash
npm install
``` 

### 3. Conexión con la API (Proxy de Vite)
Este proyecto utiliza un proxy de Vite para evitar problemas de CORS al conectarse a la API desplegada en Vercel. La configuración ya está incluida en vite.config.js.

Importante: La API de backend debe estar desplegada y funcionando en la URL especificada en vite.config.js.

```bash
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // URL de la API desplegada en Vercel
        target: '[https://api-crud-gestion-escolar.vercel.app](https://api-crud-gestion-escolar.vercel.app)',
        changeOrigin: true,
        secure: true,
        // Mantiene el prefijo /api en la ruta de destino
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```
La aplicación estará disponible en Vercel. Todas las peticiones a /api/... serán redirigidas automáticamente a la API de Vercel.
