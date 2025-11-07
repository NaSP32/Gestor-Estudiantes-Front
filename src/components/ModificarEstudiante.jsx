import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, FormControl, InputLabel, 
    Select, MenuItem, Grid, Button, Paper, Box, CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TablaEstudiantes from './TablaEstudiantes';
import { useStudents } from '../hooks/useStudents'; // Importa el hook
import { deleteStudent } from '../Services/studentService'; // Importa el servicio
import { useNotification } from '../hooks/useNotification'; // Importa el hook de notificación

const AVAILABLE_COURSES = ["Matemática", "Historia", "Ciencias", "Arte"]; 

const ModificarEstudiante = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  
  // 1. Obtiene los datos del hook
  const { students, isLoading, error, refreshStudents } = useStudents();
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterCourse, setFilterCourse] = React.useState('');

  // 2. Lógica de Doble Filtro (sin cambios)
  const filteredStudents = React.useMemo(() => {
    let list = students; 
    const lowerCaseSearch = searchTerm.toLowerCase();

    if (lowerCaseSearch) {
      list = list.filter(student => 
        (student.nombre && student.nombre.toLowerCase().includes(lowerCaseSearch)) ||
        (student.apellido && student.apellido.toLowerCase().includes(lowerCaseSearch))
      );
    }
    if (filterCourse) {
      list = list.filter(student => 
        student.cursos && student.cursos.includes(filterCourse)
      );
    }
    return list;
  }, [students, searchTerm, filterCourse]);
  
  // 3. Handlers de acción
  const handleEdit = (id) => {
      navigate(`/students/edit/${id}`);
  };

  const handleDelete = async (id) => {
      if (window.confirm("¿Estás seguro de que deseas eliminar este estudiante?")) {
          try {
              await deleteStudent(id);
              showNotification('Estudiante eliminado', 'success');
              refreshStudents(); // Refresca la lista
          } catch (err) {
              showNotification(err.message, 'error');
          }
      }
  };

  return (
    <Paper sx={{ p: 3, mt: 3, background: '#fff', borderRadius: 2 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, color: '#FBC02D' }}>
        Gestión de Estudiantes
      </Typography>

      {/* Controles de Búsqueda y Filtro */}
      <Grid container spacing={2} sx={{ mb: 4, alignItems: 'center' }}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Buscar por Nombre o Apellido"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="filter-course-search-label">Filtrar por Curso</InputLabel>
            <Select
              labelId="filter-course-search-label"
              value={filterCourse}
              label="Filtrar por Curso"
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <MenuItem value="">
                <em>Todos los cursos</em>
              </MenuItem>
              {AVAILABLE_COURSES.map(course => (
                <MenuItem key={course} value={course}>{course}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
           <Button 
                variant="outlined" 
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/')} // Vuelve al Home
                fullWidth
            >
                Atras
            </Button>
        </Grid>
      </Grid>

      {/* Tabla de Resultados */}
      {isLoading && (
          <Box sx={{ textAlign: 'center', my: 5 }}>
              <CircularProgress />
              <Typography>Cargando...</Typography>
          </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      
      {!isLoading && !error && (
          <TablaEstudiantes 
            students={filteredStudents}
            onEdit={handleEdit}
            onDelete={handleDelete} // Ahora pasamos el handler de borrado real
            filterCourse={filterCourse}
          />
      )}
    </Paper>
  );
};

export default ModificarEstudiante;