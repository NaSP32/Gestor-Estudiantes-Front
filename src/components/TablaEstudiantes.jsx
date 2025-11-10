//Tabla de estudiantes
/*import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote'; 
import DeleteIcon from '@mui/icons-material/Delete'; 

const TablaEstudiantes = ({ students, onEdit, onDelete , filterCourse}) => {
    
    if (!students || students.length === 0) {
        return (
            <Typography variant="h6" align="center" sx={{ p: 5, color: 'text.secondary' }}>
                {filterCourse 
                    ? `No se encontraron estudiantes inscriptos en ${filterCourse}.`
                    : `No hay estudiantes que coincidan con la búsqueda.`
                }
            </Typography>
        );
    }
    
    return (
        <Box sx={{
            width: '100%',
            overflowX: 'auto', // ❗️ Esta es la magia
            WebkitOverflowScrolling: 'touch', // Scroll suave en iOS
        }}>
        <TableContainer component={Paper} sx={{ mt: 4, mb: 8 }}>
            <Table sx={{ minWidth: 800 }} aria-label="Tabla de gestión de estudiantes">
                
                <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell>ID (Ref)</TableCell>
                        <TableCell>Nombre Completo</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Cursos</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {students.map((student) => (
                        <TableRow
                            key={student._id}
                            sx={{ '&:hover': { bgcolor: '#fafafa' } }}
                        >
                            <TableCell component="th" scope="row">
                                {student._id ? student._id.substring(0, 6) + '...' : 'N/A'} 
                            </TableCell>
                            <TableCell>{student.nombre} {student.apellido}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>
                                {Array.isArray(student.cursos) ? student.cursos.join(', ') : 'N/A'} 
                            </TableCell>
                            
                            <TableCell align="center">
                                {/* Llama al onEdit de la página padre /}
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    startIcon={<EditNoteIcon />}
                                    onClick={() => onEdit(student._id)} 
                                    sx={{ mr: 1, color: '#FBC02D', borderColor: '#FBC02D' }}
                                    
                                >
                                    Modificar
                                </Button>

                                {/* Llama al onDelete de la página padre /}
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    startIcon={<DeleteIcon />}
                                    onClick={()=> onDelete(student._id)} 
                                    sx={{
                                        bgcolor: '#D32F2F', 
                                        color: '#FFFFFF',
                                        '&:hover': { bgcolor: '#B71C1C' },
                                     }}
                                >
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
       
    );
};

export default TablaEstudiantes;
*/





// 📍 Pega esto en tu archivo: src/components/TablaEstudiantes.jsx

import * as React from 'react';
// ❗️ Ya no necesitamos un 'Box' extra
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote'; 
import DeleteIcon from '@mui/icons-material/Delete'; 

const TablaEstudiantes = ({ students, onEdit, onDelete , filterCourse}) => {
    
    // Si la tabla está vacía, muestra el mensaje (esto está bien)
    if (!students || students.length === 0) {
        return (
            <Typography variant="h6" align="center" sx={{ p: 5, color: 'text.secondary' }}>
                {filterCourse 
                    ? `No se encontraron estudiantes inscriptos en ${filterCourse}.`
                    : `No hay estudiantes que coincidan con la búsqueda.`
                }
            </Typography>
        );
    }
    
    // ❗️ 2. LA SOLUCIÓN: Aplicar los estilos al TableContainer
    return (
        <TableContainer 
            component={Paper} 
            sx={{ 
                mt: 4, 
                mb: 8,
                // ❗️ ESTA ES LA MAGIA
                width: '100%',
                overflowX: 'auto', // ❗️ Permite el scroll horizontal
                WebkitOverflowScrolling: 'touch' // Scroll suave en iOS
            }}
        >
            
            {/* 3. Tu tabla sigue forzando 800px, pero ahora SÍ tendrá scroll */}
            <Table sx={{ minWidth: 800 }} aria-label="Tabla de gestión de estudiantes">
                
                <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell>ID (Ref)</TableCell>
                        <TableCell>Nombre Completo</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Cursos</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {students.map((student) => (
                        <TableRow
                            key={student._id}
                            sx={{ '&:hover': { bgcolor: '#fafafa' } }}
                        >
                            <TableCell component="th" scope="row">
                                {student._id ? student._id.substring(0, 6) + '...' : 'N/A'} 
                            </TableCell>
                            <TableCell>{student.nombre} {student.apellido}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>
                                {Array.isArray(student.cursos) ? student.cursos.join(', ') : 'N/A'} 
                            </TableCell>
                            
                            <TableCell align="center">
                                {/* (Tus botones de Modificar y Eliminar no cambian) */}
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    startIcon={<EditNoteIcon />}
                                    onClick={() => onEdit(student._id)} 
                                    sx={{ mr: 1, color: '#FBC02D', borderColor: '#FBC02D' }} 
                                >
                                    Modificar
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    startIcon={<DeleteIcon />}
                                    onClick={()=> onDelete(student._id)} 
                                    sx={{
                                        bgcolor: '#D32F2F', 
                                        color: '#FFFFFF',
                                        '&:hover': { bgcolor: '#B71C1C' },
                                        }}
                                >
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> // ❗️ Ya no hay un </Box>
        
    );
};

export default TablaEstudiantes;