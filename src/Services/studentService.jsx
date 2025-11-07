const API_URL = '/api/estudiantes'; // URL base de la API

/**
 * Maneja las respuestas de fetch.
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
    const response = await fetch(API_URL);
    return handleResponse(response);
};

/**
 * Obtiene un estudiante por ID.
  */
export const getStudentById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return handleResponse(response);
};

/**
 * Crea un nuevo estudiante.
 */
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
 */
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
 */
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
};