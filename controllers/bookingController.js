'use strict';

const db = require('../models'); // Asegúrate de que la ruta sea correcta

// Crear una nueva reserva
const createBooking = async (req, res) => {
    try {
        const { id_usuario, id_paquete, booking_date, status } = req.body;

        // Crear la reserva en la base de datos
        const booking = await db.Booking.create({
            id_usuario,
            id_paquete,
            booking_date,
            status,
        });
        res.status(201).json(booking); // Devolver la reserva creada
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creando la reserva' });
    }
};

// Obtener todas las reservas
const getAllBookings = async (req, res) => {
    try {
        const bookings = await db.Booking.findAll({
            include: [
                { model: db.User, attributes: ['id', 'name'] }, // Incluir información del usuario
                { model: db.Package, attributes: ['id', 'name'] } // Incluir información del paquete
            ]
        });
        res.status(200).json(bookings); // Devolver todas las reservas
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo las reservas' });
    }
};

// Obtener una reserva por ID
const getBookingById = async (req, res) => {
    const { id } = req.params; // Obtener el ID desde los parámetros de la URL

    try {
        const booking = await db.Booking.findByPk(id, {
            include: [
                { model: db.User, attributes: ['id', 'name'] }, // Incluir información del usuario
                { model: db.Package, attributes: ['id', 'name'] } // Incluir información del paquete
            ]
        });
        if (!booking) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json(booking); // Devolver la reserva encontrada
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo la reserva' });
    }
};

// Actualizar una reserva
const updateBooking = async (req, res) => {
    const { id } = req.params; // Obtener el ID desde los parámetros de la URL

    try {
        const booking = await db.Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        // Actualizar la reserva con los nuevos datos
        const updatedBooking = await booking.update(req.body);
        res.status(200).json(updatedBooking); // Devolver la reserva actualizada
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la reserva' });
    }
};

// Eliminar una reserva
const deleteBooking = async (req, res) => {
    const { id } = req.params; // Obtener el ID desde los parámetros de la URL

    try {
        const booking = await db.Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        await booking.destroy(); // Eliminar la reserva
        res.status(204).send(); // Respuesta sin contenido
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
};
