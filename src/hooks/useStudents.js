import * as React from 'react';
import { getStudents, getStudentById } from '../Services/studentService';

/**
 * Hook personalizado para gestionar la lista de estudiantes.
 */
export const useStudents = () => {
    const [students, setStudents] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    // Función para (re)cargar la lista de estudiantes
    const fetchStudents = React.useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getStudents();
            console.log(data)
            setStudents(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Carga inicial de datos
    React.useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    // Retornamos el estado y la función de recarga
    return { students, isLoading, error, refreshStudents: fetchStudents };
};

/**
 * Hook personalizado para gestionar un *único* estudiante (para la vista de detalle/editar).
 */
export const useStudent = (id) => {
    const [student, setStudent] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const fetchStudent = React.useCallback(async () => {
        if (!id) return; // No hacer nada si no hay ID

        setIsLoading(true);
        setError(null);
        try {
            const data = await getStudentById(id);
            setStudent(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    React.useEffect(() => {
        fetchStudent();
    }, [fetchStudent]);
    
    return { student, isLoading, error, refreshStudent: fetchStudent };
};