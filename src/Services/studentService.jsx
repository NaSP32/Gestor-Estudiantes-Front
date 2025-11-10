// 1. Lee la URL BASE (que será la URL completa)
const API_URL = import.meta.env.VITE_API_URL;
const API_ENDPOINT = '/api/estudiantes';

// ... handleResponse ...





/* 
 Maneja las respuestas de fetch.
 */
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
    }
    return response.json();
};

/**
 * Obtiene todos los estudiantes.
*/
export const getStudents = async () => {
    const response = await fetch(` ${API_URL}${API_ENDPOINT}`)
    return handleResponse(response);
};

/**
 * Obtiene un estudiante por ID.
*/
export const getStudentById = async (id) => {
    const response = await fetch(`${API_URL}${API_ENDPOINT}/${id}`);
    return handleResponse(response);
};

/**
 * Crea un nuevo estudiante.
*/ 
export const createStudent = async (studentData) => {
    const response = await fetch(`${API_URL}${API_ENDPOINT}`,{
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
    const response = await fetch(`${API_URL}${API_ENDPOINT}/${id}`, {
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
    const response = await fetch(`${API_URL}${API_ENDPOINT}/${id}`, {
        method: 'DELETE',
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
    }
    
    // Si la respuesta es 204 (sin contenido), retorna mensaje de éxito
    if (response.status === 204) {
        return { message: "Estudiante eliminado correctamente" };
    }
    
    return handleResponse(response);
};