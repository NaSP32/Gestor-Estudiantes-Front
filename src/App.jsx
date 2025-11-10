/*import * as React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Typography, Box, Container } from '@mui/material';

// Contexto y Notificaciones
import { NotificationProvider } from './contexts/NotificationContext';
import GlobalNotification from './components/GlobalNotification';

// Componentes y Páginas
import Estudiantes from './components/Estudiantes'; // Barra de navegación
import HomePage from './Pages/HomePage';
import StudentListPage from './Pages/StudentListPage';
import NewStudentPage from './Pages/NewStudentPage';
import ManageStudentsPage from './Pages/ManageStudentsPage';
import EditStudentPage from './Pages/EditStudentPage';
import NotFoundPage from './Pages/NotFoundPage';

import './App.css';

//Layout
const AppLayout = () => {
    return (
        <Container maxWidth="lg" sx={{ padding: '20px' }}>
            
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 3 }}>
                Gestor de Estudiantes
            </Typography>

            {/* Barra de botones /}
            <Estudiantes />

            <hr style={{ margin: '30px 0' }} />

            {/* Aquí se renderiza la página de la ruta actual /}
            <Box component="main">
                <Outlet />
            </Box>
            
        </Container>
    );
};

/**
 * Componente App principal
 * Configura los proveedores de contexto y las rutas.
 /
function App() {
    return (
        <NotificationProvider>
            
            {/* El componente de notificación global /}
            <GlobalNotification />

            {/* Definición de las rutas de la aplicación /}
            <Routes>
                {/* Usamos una "Ruta de Layout". Todas las rutas anidadas
                  dentro de AppLayout compartirán su UI (título, nav).
                /}
                <Route path="/" element={<AppLayout />}>
                    {/* Ruta índice (equivale a path="/") /}
                    <Route index element={<HomePage />} />
                    
                    {/* Rutas de Estudiantes /}
                    <Route path="students" element={<StudentListPage />} />
                    <Route path="students/new" element={<NewStudentPage />} />
                    <Route path="students/manage" element={<ManageStudentsPage />} />
                    <Route path="students/edit/:studentId" element={<EditStudentPage />} />

                    {/* Ruta para 404 /}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </NotificationProvider>
    );
}

export default App;
*/


import { Routes, Route, Outlet } from 'react-router-dom';
import { Typography, Box, Container } from '@mui/material';

// 
import { IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Contexto y Notificaciones
import { NotificationProvider } from './contexts/NotificationContext';
import GlobalNotification from './components/GlobalNotification';

// Componentes y Páginas
import Estudiantes from './components/Estudiantes'; // Barra de navegación
import HomePage from './Pages/HomePage';
import StudentListPage from './Pages/StudentListPage';
import NewStudentPage from './Pages/NewStudentPage';
import ManageStudentsPage from './Pages/ManageStudentsPage';
import EditStudentPage from './Pages/EditStudentPage';
import NotFoundPage from './Pages/NotFoundPage';

import './App.css';

//Layout 
const AppLayout = () => {
    return (
        <Container 
            maxWidth="lg" 
            sx={{ 
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh' 
            }}
        >
            
            {/* --- Contenido Superior (Título y Navegación) --- */}
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 3 }}>
                Gestor de Estudiantes
            </Typography>
            <Estudiantes />
            <hr style={{ margin: '30px 0' }} />

            {/* --- Contenido Principal (Tus páginas) --- */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
            
            {/* FOOTER */}
            <Box 
                component="footer" 
                sx={{
                    py: 3, 
                    mt: 'auto', 
                    textAlign: 'center',
                    color: 'text.secondary'
                }}
            >
                {/* Redes */}
                <Box sx={{ mb: 1 }}>
                    <IconButton
                        component="a" // Lo convierte en un link <a>
                        href="https://github.com/NaSP32"
                        target="_blank" // Abre en una nueva pestaña
                        rel="noopener noreferrer" // Seguridad
                        aria-label="Perfil de GitHub de Nadia" // Accesibilidad
                        color="inherit" // Hereda el color gris
                    >
                        <GitHubIcon />
                    </IconButton>

                    <IconButton
                        component="a"
                        href="https://www.linkedin.com/in/nadia-pereyra-0643aa236/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Perfil de LinkedIn de Nadia"
                        color="inherit"
                    >
                        <LinkedInIcon />
                    </IconButton>
                </Box>

                {/* CopiyR */}
                <Typography variant="body2">
                    © 2025 - Desarrollado por Nadia Perayra
                </Typography>
            </Box>
            
        </Container>
    );
};

/**
 * Componente App principal
 * 
 */
function App() {
    return (
        <NotificationProvider>
            
            <GlobalNotification />

            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="students" element={<StudentListPage />} />
                    <Route path="students/new" element={<NewStudentPage />} />
                    <Route path="students/manage" element={<ManageStudentsPage />} />
                    <Route path="students/edit/:studentId" element={<EditStudentPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </NotificationProvider>
    );
}

export default App;
