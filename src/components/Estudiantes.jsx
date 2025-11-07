import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, ButtonGroup, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote'; 
import FilterListIcon from '@mui/icons-material/FilterList'; 

const AVAILABLE_COURSES = ["Matemática", "Historia", "Ciencias", "Arte"];

const Estudiantes = () => {
    // 1. Hook de navegación de React Router
    const navigate = useNavigate();
    
    // 2. Usamos searchParams para leer el filtro actual de la URL
    const [searchParams] = useSearchParams();
    const [selectedCourse, setSelectedCourse] = React.useState(searchParams.get('course') || 'todos');

    // 3. Handler para el filtro
    const handleFilterChange = (event) => {
        const courseValue = event.target.value;
        setSelectedCourse(courseValue);

        if (courseValue === 'todos') {
            // Navega a la lista sin filtros
            navigate('/students');
        } else {
            // Navega a la lista aplicando el filtro como un search param
            navigate(`/students?course=${courseValue}`);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 3 }}>
            
            {/* 1. BOTÓN NUEVO ESTUDIANTE */}
            <Button 
                variant="contained" 
                startIcon={<PersonAddIcon />} 
                size="medium" 
                sx={{ 
                    bgcolor: '#1976D2', 
                    color: '#FFFFFF',
                    '&:hover': { bgcolor: '#115293' },
                    fontSize: '0.875rem',
                    mr: 2 
                }}
                // Navega a la ruta de creación
                onClick={() => navigate('/students/new')} 
            >
                Nuevo estudiante
            </Button>

            {/* 2. GRUPO DE GESTIÓN DE DATOS */}
            <ButtonGroup variant="contained" 
            aria-label="Grupo de botones para gestión de estudiantes"
            size="medium" >
                
                <Button 
                    startIcon={<VisibilityIcon />} 
                    sx={{ 
                        bgcolor: '#388E3C', 
                        color: '#FFFFFF',
                        '&:hover': { bgcolor: '#1B5E20' },
                        fontSize: '0.875rem',
                    }}
                    onClick={() => { 
                        setSelectedCourse('todos');
                        navigate('/students');
                    }} 
                >
                    Ver Todos
                </Button>

                 <Button 
                    startIcon={<EditNoteIcon />}
                    sx={{ 
                        bgcolor: '#FBC02D', 
                        color: '#000000', 
                        '&:hover': { bgcolor: '#E65100' },
                        fontSize: '0.875rem',
                    }} 
                    onClick={() => navigate('/students/manage')}
                >
                    Modificar
                </Button>

                <Button 
                    startIcon={<DeleteIcon />} 
                     sx={{ 
                        bgcolor: '#D32F2F', 
                        color: '#FFFFFF',
                        '&:hover': { bgcolor: '#B71C1C' },
                        fontSize: '0.875rem',
                    }}
                    onClick={() => navigate('/students/manage')}
                >
                    Eliminar
                </Button>
            </ButtonGroup>

             {/* 3. CONTROL DE FILTRO POR CURSO */}
            <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel id="filter-course-label">
                    <FilterListIcon sx={{ mr: 0.5 }} /> Filtrar
                </InputLabel>
                <Select
                    labelId="filter-course-label"
                    value={selectedCourse}
                    label="Filtrar"
                    onChange={handleFilterChange}
                >
                    <MenuItem value={'todos'}>Ver Todos</MenuItem>
                    {AVAILABLE_COURSES.map(course => (
                        <MenuItem key={course} value={course}>{course}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default Estudiantes;
