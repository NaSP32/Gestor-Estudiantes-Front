import * as React from 'react';
import { Paper, Typography, TextField, FormControl, FormGroup, FormControlLabel,
     Checkbox, FormHelperText, Grid, Button, Alert, Box } from '@mui/material';
import { updateStudent, deleteStudent } from '../Services/studentService'; // Importa servicios
import { useNotification } from '../hooks/useNotification'; // Importa hook

const AVAILABLE_COURSES = ["Matemática", "Historia", "Ciencias", "Arte"]; 

const EditStudentForm = ({ student, onComplete, onCancel }) => {
    
    const { showNotification } = useNotification();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submissionError, setSubmissionError] = React.useState(null);

    // Inicializa el formulario con los datos del estudiante
    const [formData, setFormData] = React.useState({
        nombre: student.nombre || '',
        apellido: student.apellido || '',
        email: student.email || '',
        cursos: student.cursos || [],
    });

    // ... (handleChange y handleCourseChange sin cambios) ...
     const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            cursos: checked
                ? [...prev.cursos, value]
                : prev.cursos.filter(c => c !== value),
        }));
    };
    
    // Función que envía (PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.nombre || !formData.email || formData.cursos.length === 0) {
            setSubmissionError("Todos los campos son obligatorios.");
            return;
        }

        setIsSubmitting(true);
        setSubmissionError(null);

        try {
            await updateStudent(student._id, formData);
            showNotification('Estudiante actualizado con éxito', 'success');
            onComplete();

        } catch (err) {
            setSubmissionError(err.message);
            showNotification(err.message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Función para ELIMINAR (DELETE)
    const handleDelete = async () => {
        if (!window.confirm(`¿Seguro que quieres eliminar a ${student.nombre} ${student.apellido}?`)) {
            return;
        }
        
        setIsSubmitting(true);
        setSubmissionError(null);

        try {
            await deleteStudent(student._id);
            showNotification('Estudiante eliminado', 'warning');
            onComplete(); // Vuelve a la lista

        } catch (err) {
            setSubmissionError(err.message);
            showNotification(err.message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 600, margin: '0 auto', my: 4 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
                Modificar Estudiante: {student.nombre} {student.apellido}
            </Typography>

            {submissionError && <Alert severity="error" sx={{ mb: 2 }}>{submissionError}</Alert>}

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* ... (Campos del formulario sin cambios) ... */}
                    <Grid item xs={12} sm={6}>
                        <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} fullWidth required disabled={isSubmitting}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} fullWidth required disabled={isSubmitting}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth required type="email" sx={{ mt: 1 }} disabled={isSubmitting} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset" required disabled={isSubmitting}>
                            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                                Cursos Inscriptos:
                            </Typography>
                            <FormGroup row>
                                {AVAILABLE_COURSES.map(course => (
                                    <FormControlLabel
                                        key={course}
                                        control={
                                            <Checkbox 
                                                checked={formData.cursos.includes(course)} 
                                                onChange={handleCourseChange} 
                                                value={course} 
                                                name="cursos"
                                            />
                                        }
                                        label={course}
                                    />
                                ))}
                            </FormGroup>
                            <FormHelperText>{formData.cursos.length === 0 ? "Debe seleccionar al menos un curso." : ""}</FormHelperText>
                        </FormControl>
                    </Grid>

                     {/* Botones de Acción */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 3 }}>
                        <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>
                            Cancelar
                        </Button>
                        
                        <Box>
                             <Button 
                                variant="outlined" 
                                color="error" 
                                onClick={handleDelete}
                                disabled={isSubmitting} 
                                sx={{ mr: 2 }}
                             >
                                {isSubmitting ? 'Eliminando...' : 'Eliminar'}
                            </Button>
                            
                            <Button variant="contained" color="warning" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                            </Button>
                        </Box>

                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default EditStudentForm;