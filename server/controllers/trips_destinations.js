import pool from '../config/database.js'

// Controller to insert a new trip destination
const createTripDestination = async (req, res) => {
    try {
        const { trip_id, destination_id } = req.body;

        // Insert new record into trips_destinations
        const results = await pool.query(
            'INSERT INTO trips_destinations (trip_id, destination_id) VALUES ($1, $2) RETURNING *',
            [trip_id, destination_id]
        );

        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to retrieve all trip destinations
const getTripsDestinations = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM trips_destinations');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to retrieve all trips associated with a specific destination
const getAllTrips = async (req, res) => {
    try {
        const destination_id = req.params.destination_id;

        // Retrieve trips associated with the specified destination_id
        const results = await pool.query(
            'SELECT trips.* FROM trips JOIN trips_destinations ON trips.id = trips_destinations.trip_id WHERE trips_destinations.destination_id = $1',
            [destination_id]
        );

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'No trips found for this destination' });
        }

        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to retrieve all destinations associated with a specific trip
const getAllDestinations = async (req, res) => {
    try {
        const trip_id = req.params.trip_id;

        // Retrieve destinations associated with the specified trip_id
        const results = await pool.query(
            'SELECT destinations.* FROM destinations JOIN trips_destinations ON destinations.id = trips_destinations.destination_id WHERE trips_destinations.trip_id = $1',
            [trip_id]
        );

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'No destinations found for this trip' });
        }

        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export default {
    createTripDestination,
    getTripsDestinations,
    getAllTrips,
    getAllDestinations
    
}

