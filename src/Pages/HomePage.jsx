import { Box, Typography } from "@mui/material";

const Home = () => { 
 return (
   <div>
    <Box sx={{ my: 5, p: 3, border: '1px dashed #ccc' }}>
            <Typography variant="h5" color="text.secondary">
                Bienvenid@s al Panel de Gestión Escolar.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                Usa los botones de acción para crear un nuevo estudiante o ver el listado completo.
            </Typography>
        </Box>
   </div>


  
);

};

export default Home;