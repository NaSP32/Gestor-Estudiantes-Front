/*const API_URL = '/api/estudiantes'; // URL base de la API

/**
 * Maneja las respuestas de fetch.
 
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
    }
    return response.json();
};

/**
 * Obtiene todos los estudiantes.
 
export const getStudents = async () => {
    const response = await fetch(API_URL);
    return handleResponse(response);
};

/**
 * Obtiene un estudiante por ID.
  
export const getStudentById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return handleResponse(response);
};

/**
 * Crea un nuevo estudiante.
 
export const createStudent = async (studentData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
    });
    return handleResponse(response);
};

/**
 * Actualiza un estudiante existente.
 
export const updateStudent = async (id, studentData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
    });
    return handleResponse(response);
};

/**
 * Elimina un estudiante.
 
export const deleteStudent = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    // DELETE 
    if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || `Error ${response.status}`);
    }
    // Si la respuesta está vacía
    if (response.status === 204) {
        return { message: "Estudiante eliminado correctamente" };
    }
    return handleResponse(response);
};*/


// 📍 src/services/studentService.js

// 1. Lee SÓLO LA URL BASE de las variables de entorno
const BASE_URL = import.meta.env.VITE_API_URL;

// 2. Define la ruta específica de los estudiantes
const API_ENDPOINT = '/api/estudiantes';

/**
 * Maneja las respuestas de fetch.
 */
const handleResponse = async (response) => {
    if (!response.ok) {
        // Intenta leer el error como JSON, si falla, devuelve un error genérico
        const errorData = await response.json().catch(() => ({ 
            message: `Error ${response.status}: ${response.statusText}. La respuesta no es JSON.` 
        }));
        throw new Error(errorData.message || `Error ${response.status}`);
    }
    // Si la respuesta es 204 (No Content), no intentes parsear JSON
    if (response.status === 204) {
        return { message: "Operación exitosa" };
    }
    return response.json(); // Procesa la respuesta JSON
};

/**
 * Obtiene todos los estudiantes.
 */
export const getStudents = async () => {
    // Llama a BASE_URL + API_ENDPOINT
    const response = await fetch(`${BASE_URL}${API_ENDPOINT}`);
    return handleResponse(response);
};

/**
 * Obtiene un estudiante por ID.
 */
export const getStudentById = async (id) => {
    // Llama a BASE_URL + API_ENDPOINT + /id
    const response = await fetch(`${BASE_URL}${API_ENDPOINT}/${id}`);
    return handleResponse(response);
};

/**
 * Crea un nuevo estudiante.
 */
export const createStudent = async (studentData) => {
    const response = await fetch(`${BASE_URL}${API_ENDPOINT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
    });
    return handleResponse(response);
};

/**
 * Actualiza un estudiante existente.
 */
export const updateStudent = async (id, studentData) => {
    const response = await fetch(`${BASE_URL}${API_ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
    });
    return handleResponse(response);
};

/**
 * Elimina un estudiante.
 */
export const deleteStudent = async (id) => {
    const response = await fetch(`${BASE_URL}${API_ENDPOINT}/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};