import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioNuevoEstudiante from '../components/FormularioNuevoEstudiante';

const NewStudentPage = () => {
    const navigate = useNavigate();

    
    return (
        <FormularioNuevoEstudiante
            onComplete={() => navigate('/students/manage')} // Vuelve a la lista de gestión
            onCancel={() => navigate('/')} // Vuelve al Home
        />
    );
};

export default NewStudentPage;