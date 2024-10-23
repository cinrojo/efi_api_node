'use strict';

const db = require('../models'); 

// Crear un paquete de viaje
const createPackage = async (req, res) => {
    try {
        const { name, description, id_destino, start_date, end_date, price, availability } = req.body; 
        const newPackage = await db.Package.create({
            name,
            description,
            id_destino,
            start_date,  
            end_date,    
            price,
            availability
        });
        res.status(201).json(newPackage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creando el paquete' });
    }
};

// Obtener todos los paquetes de viaje
const getAllPackages = async (req, res) => {
    try {
        const packages = await db.Package.findAll({
            include: {
                model: db.Destination,
                attributes: ['id', 'name'], 
            }
        });
        res.status(200).json(packages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo los paquetes' });
    }
};

// Obtener un paquete por ID
const getPackageById = async (req, res) => {
    const { id } = req.params; 

    try {
        const pkg = await db.Package.findByPk(id, {
            include: {
                model: db.Destination,
                attributes: ['id', 'name'],
            }
        });
        if (!pkg) {
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }
        res.status(200).json(pkg);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo el paquete' });
    }
};

// Actualizar un paquete
const updatePackage = async (req, res) => {
    const { id } = req.params; 

    try {
        const pkg = await db.Package.findByPk(id);  
        if (!pkg) {
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }

        const updatedPackage = await pkg.update(req.body);
        res.status(200).json(updatedPackage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el paquete' });
    }
};

// Eliminar un paquete
const deletePackage = async (req, res) => {
    const { id } = req.params; 

    try {
        const pkg = await db.Package.findByPk(id);  
        if (!pkg) {
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }

        await pkg.destroy();
        res.status(204).send(); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el paquete' });
    }
};

module.exports = {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage,
};

