import { Box, Typography } from "@mui/material";

const Home = () => { 
 return (
   
    <Box sx={{ 
        // ❗️ 2. Márgenes y padding responsivos
        my: { xs: 2, md: 5 }, // Menos margen vertical en celulares ('xs')
        p: { xs: 2, md: 3 },  // Menos padding en celulares ('xs')
        border: '1px dashed #ccc',
        textAlign: 'center' // Centramos todo el contenido
        
         }}>
            <Typography variant="h5" color="text.secondary"
            sx={{ 
                fontSize: { xs: '1.25rem', md: '1.5rem' } // Más chico en 'xs'
            }}
            >
                Bienvenid@s al Panel de Gestión Escolar.
            </Typography>
            <Typography variant="body1" 
            
            sx={{ 
                mt: 1,
                // ❗️ 4. Tamaño de fuente responsivo
                fontSize: { xs: '0.9rem', md: '1rem' } // Más chico en 'xs'
            }}
            >
               Usa los botones de acción para crear un nuevo estudiante o ver el listado.
            </Typography>
        </Box>
   


  
);

};

export default Home;