import * as React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="h1" color="text.secondary">
                404
            </Typography>
            <Typography variant="h5" sx={{ mb: 3 }}>
                Página no encontrada
            </Typography>
            <Button component={Link} to="/" variant="contained">
                Volver al Inicio
            </Button>
        </Box>
    );
};

export default NotFoundPage;