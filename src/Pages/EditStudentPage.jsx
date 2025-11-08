import * as React from 'react';

import { useParams, useNavigate, useLocation } from 'react-router-dom'; 
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import EditStudentForm from '../components/EditStudentForm';
import { useStudent } from '../hooks/useStudents'; // El hook para 1 estudiante

const EditStudentPage = () => {
    const navigate = useNavigate();
    const { studentId } = useParams(); 
    const location = useLocation();
    const studentFromState = location.state?.student;
    const { student: studentFromFetch, isLoading, error } = useStudent(studentFromState ? null : studentId);

    const student = studentFromState || studentFromFetch;
    const effectiveIsLoading = studentFromState ? false : isLoading;
    const effectiveError = studentFromState ? null : error;

   
    if (effectiveIsLoading) {
        return (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <CircularProgress color="warning" />
                <Typography sx={{ mt: 2 }}>Cargando datos del estudiante...</Typography>
            </Box>
        );
    }

    if (effectiveError) {
        return <Alert severity="error" sx={{ mt: 5 }}>Error de API: {effectiveError}</Alert>;
    }
    
    if (!student) {
        return <Alert severity="warning" sx={{ mt: 5 }}>Estudiante no encontrado.</Alert>;
    }

    // Renderiza el formulario
    return (
        <EditStudentForm 
            student={student} // Pasa el estudiante del 'state'
            onComplete={() => navigate('/students/manage')} 
            onCancel={() => navigate('/students/manage')} 
        />
    );
};

export default EditStudentPage;