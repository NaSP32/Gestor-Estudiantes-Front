// 📍 src/pages/EditStudentPage.jsx

import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import EditStudentForm from '../components/EditStudentForm';
import { useStudent } from '../hooks/useStudents'; // El hook para 1 estudiante

const EditStudentPage = () => {
    const navigate = useNavigate();
    const { studentId } = useParams(); // Obtiene el ID de la URL
    
    // 2. Llama al hook para buscar ESE estudiante
    const { student, isLoading, error } = useStudent(studentId);

    // 3. Handlers de estado
    if (isLoading) {
        return (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <CircularProgress color="warning" />
                <Typography sx={{ mt: 2 }}>Cargando datos del estudiante...</Typography>
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error" sx={{ mt: 5 }}>Error: {error}</Alert>;
    }
    
    if (!student) {
        return <Alert severity="warning" sx={{ mt: 5 }}>Estudiante no encontrado.</Alert>;
    }

    // 4. Renderiza el formulario con los datos
    return (
        <EditStudentForm 
            student={student} // Pasa el estudiante encontrado
            onComplete={() => navigate('/students/manage')} // A dónde ir después de guardar/eliminar
            onCancel={() => navigate('/students/manage')} // A dónde ir si cancela
        />
    );
};

export default EditStudentPage;