const express = require('express');
const {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage,
} = require('../controllers/packageController');

const router = express.Router();

// Definición de rutas
router.post('/packages', createPackage);               // Crear un nuevo paquete
router.get('/packages', getAllPackages);               // Obtener todos los paquetes
router.get('/packages/:id', getPackageById);          // Obtener un paquete por ID
router.put('/packages/:id', updatePackage);           // Actualizar un paquete por ID
router.delete('/packages/:id', deletePackage);        // Eliminar un paquete por ID

module.exports = router;
