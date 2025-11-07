import * as React from 'react';

// 1. Crear el Contexto
const NotificationContext = React.createContext(null);

/**
 * 2. Crear el Proveedor (Provider)
 * Este componente envolverá nuestra App y proveerá el estado
 * y la función para mostrar notificaciones.
 */
export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = React.useState(null); // { message, severity }

    // Función para mostrar una notificación
    const showNotification = (message, severity = 'success') => {
        setNotification({ message, severity });
    };

    // Función para cerrar la notificación
    const hideNotification = () => {
        setNotification(null);
    };

    // 3. Definir el valor que compartirá el contexto
    const value = {
        notification,
        showNotification,
        hideNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

// 4. Exportar el contexto para ser usado por el hook
export default NotificationContext;