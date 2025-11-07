import * as React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Typography, Box, Container } from '@mui/material';

// Contexto y Notificaciones
import { NotificationProvider } from './contexts/NotificationContext';
import GlobalNotification from './components/GlobalNotification';

// Componentes y Páginas
import Estudiantes from './components/Estudiantes'; // Tu barra de navegación
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

            {/* La barra de botones ahora usa React Router */}
            <Estudiantes />

            <hr style={{ margin: '30px 0' }} />

            {/* Aquí se renderiza la página de la ruta actual */}
            <Box component="main">
                <Outlet />
            </Box>
            
        </Container>
    );
};

/**
 * Componente App principal
 * Configura los proveedores de contexto y las rutas.
 */
function App() {
    return (
        <NotificationProvider>
            
            {/* El componente de notificación global */}
            <GlobalNotification />

            {/* Definición de las rutas de la aplicación */}
            <Routes>
                {/* Usamos una "Ruta de Layout". Todas las rutas anidadas
                  dentro de AppLayout compartirán su UI (título, nav).
                */}
                <Route path="/" element={<AppLayout />}>
                    {/* Ruta índice (equivale a path="/") */}
                    <Route index element={<HomePage />} />
                    
                    {/* Rutas de Estudiantes */}
                    <Route path="students" element={<StudentListPage />} />
                    <Route path="students/new" element={<NewStudentPage />} />
                    <Route path="students/manage" element={<ManageStudentsPage />} />
                    <Route path="students/edit/:studentId" element={<EditStudentPage />} />

                    {/* Ruta "Catch-all" para 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </NotificationProvider>
    );
}

export default App;
