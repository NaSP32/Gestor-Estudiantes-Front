import * as React from 'react';
import { Alert, Box } from '@mui/material';
import { useNotification } from '../hooks/useNotification';

const GlobalNotification = () => {
    const { notification, hideNotification } = useNotification();

    if (!notification) {
        return null;
    }

    // Auto-cierra la notificación después de 5 segundos
    React.useEffect(() => {
        const timer = setTimeout(() => {
            hideNotification();
        }, 5000);
        return () => clearTimeout(timer);
    }, [notification, hideNotification]);

    return (
        <Box 
            sx={{
                position: 'fixed',
                top: 20,
                right: 20,
                zIndex: 2000, // Por encima de todo
                minWidth: '300px'
            }}
        >
            <Alert 
                severity={notification.severity}
                onClose={hideNotification} // Permite cierre manual
            >
                {notification.message}
            </Alert>
        </Box>
    );
};

export default GlobalNotification;