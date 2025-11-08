import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { getStudents, getStudentById } from '../Services/studentService';

/**
 * Hook personalizado para gestionar la lista de estudiantes.
 */
export const useStudents = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para (re)cargar la lista de estudiantes
    const fetchStudents = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getStudents();
            console.log('Estudiantes cargados:', data)
            setStudents(data);
        } catch (err) {
            console.error('Error al cargar estudiantes:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Carga inicial de datos
    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    // Retornamos el estado y la función de recarga
    return { students, isLoading, error, refreshStudents: fetchStudents };
};

/**
 * Hook personalizado para gestionar un *único* estudiante (para la vista de detalle/editar).
 */
export const useStudent = (id) => {
    const [student, setStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudent = useCallback(async () => {
        if (!id) { 
            setIsLoading(false); 
            return;
        } // No hacer nada si no hay ID

        setIsLoading(true);
        setError(null);
        try {
            const data = await getStudentById(id);
            console.log('Estudiante cargado:', data);
            setStudent(data);
        } catch (err) {
            console.log('Error al cargar estudiante', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchStudent();
    }, [fetchStudent]);
    
    return { student, isLoading, error, refreshStudent: fetchStudent };
};