// 📍 Pega esto en tu archivo: src/services/studentService.js

// 1. Lee la URL BASE de la variable de entorno
const BASE_URL = import.meta.env.VITE_API_URL;

// 2. Define la ruta específica (el "endpoint")
const API_ENDPOINT = '/api/estudiantes';

/**
 * Maneja las respuestas de fetch (versión mejorada).
 */
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({
            message: `Error ${response.status}: ${response.statusText}`
        }));
        throw new Error(errorData.message || `Error ${response.status}`);
    }
    if (response.status === 204) {
        return { message: "Operación exitosa" };
    }
    return response.json();
};

/**
 * Obtiene todos los estudiantes.
 */
export const getStudents = async () => {
    // ⬇️ ESTA ES LA MAGIA ⬇️
    // Local: fetch( '' + '/api/estudiantes' ) -> Llama al proxy
    // Vercel: fetch( 'https://api...' + '/api/estudiantes' ) -> Llama a la API
    const response = await fetch(`${BASE_URL}${API_ENDPOINT}`);
    return handleResponse(response);
};

/**
 * Obtiene un estudiante por ID.
 */
export const getStudentById = async (id) => {
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

/**  
const API_URL = '/api/estudiantes'; 
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
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
    }
    
    if (response.status === 204) {
        return { message: "Estudiante eliminado correctamente" };
    }
    
    return handleResponse(response);
};*/