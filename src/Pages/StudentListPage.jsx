import * as React from 'react';
import { useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import TablaEstudiantes from '../components/TablaEstudiantes';
import { useStudents } from '../hooks/useStudents';
import { deleteStudent } from '../Services/studentService';
import { useNotification } from '../hooks/useNotification';

const StudentListPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { showNotification } = useNotification();
    
    // 1. Obtenemos datos del Custom Hook
    const { students, isLoading, error, refreshStudents } = useStudents();
    
    // 2. Obtenemos el filtro de curso desde la URL
    const filterCourse = searchParams.get('course');

    // 3. Lógica de filtrado (usando useMemo para optimizar)
    const filteredStudents = useMemo(() => {
        if (!filterCourse) {
            return students; // Lista completa
        }
        return students.filter(student => 
            student.cursos && student.cursos.includes(filterCourse)
        );
    }, [students, filterCourse]);

    // 4. Handlers de acciones
     const handleEdit = (id) => {
      
      // Busca el estudiante completo en la lista que ya tenemos
      const studentToEdit = students.find(s => s._id === id);
      
      if (studentToEdit) {
        // Pasa el objeto 'student' a través del 'state' del router
        navigate(`/students/edit/${id}`, { state: { student: studentToEdit } });
      } else {
        // Fallback (por si acaso, aunque no debería pasar)
        showNotification('Error: No se encontró el estudiante en la lista local', 'error');
        navigate(`/students/edit/${id}`);
      }
     
  };



    const handleDelete = async (id) => {
        // Usamos confirm para la eliminación (se puede reemplazar por un Modal)
        if (window.confirm("¿Estás seguro de que deseas eliminar este estudiante?")) {
            try {
                await deleteStudent(id);
                showNotification('Estudiante eliminado correctamente', 'success');
                refreshStudents(); // Recargamos la lista
            } catch (err) {
                showNotification(err.message || 'Error al eliminar', 'error');
            }
        }
    };

    // 5. Renderizado de estados
    if (isLoading) {
        return (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <CircularProgress color="primary" />
                <Typography sx={{ mt: 2 }}>Cargando estudiantes...</Typography>
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error" sx={{ mt: 5 }}>Error de Conexión: {error}</Alert>;
    }

    // 6. Renderizado de la tabla
    return (
        <div style={{ padding: '20px', paddingTop: 0 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
                {filterCourse ? `Estudiantes en ${filterCourse}` : 'Listado de Todos los Estudiantes'}
            </Typography>
            
            <TablaEstudiantes 
                students={filteredStudents} 
                onEdit={handleEdit}
                onDelete={handleDelete}
                filterCourse={filterCourse}
            />
        </div>
    );
};

export default StudentListPage;