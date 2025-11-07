import * as React from 'react';
import NotificationContext from '../contexts/NotificationContext';

/**
 * Hook personalizado para acceder fácilmente al contexto de notificación.
 */
export const useNotification = () => {
    const context = React.useContext(NotificationContext);
    
    if (!context) {
        throw new Error('useNotification debe ser usado dentro de un NotificationProvider');
    }
    
    return context;
};