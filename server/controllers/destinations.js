import pool from '../config/database.js'

const createDestination = async(req, res) => {
    try {
        // Extracting Destination
        const {destination, description, city, country, img_url, flag_img_url} = req.body
        // Insert the new activity into the database
        const results = await pool.query(
            'INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [destination, description, city, country, img_url, flag_img_url]
        )
        // Respond with the newly created Destination
        res.status(201).json(results.rows[0])
    } catch (error) {
        // Handle errors such as conflicts or bad data
        res.status(409).json( { error: error.message } )
    }
}

const getDestinations = async(req, res) => {
    try {
        // get all the destinations from the destinations table
        const results = await pool.query('SELECT * FROM destinations ORDER BY id ASC' )
        // Respond with the all destinations
        res.status(200).json(results.rows)
    } catch (error) {
        // handle error such as server error
        res.status(500).json( { error: error.message } )
    }
}

const getDestination = async(req, res) => {
    try {
        //extract trip_id from url parameters
        const id = req.params.id

         // Query the database for destinations with the specified id
        const results = await pool.query('SELECT * FROM destinations WHERE id = $1', [id]);

        // If no destinations are found, return a 404 status
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'No destinations found for the given id' });
        }
        // Respond with the destinations for the given id
        res.status(200).json(results.rows);
    } catch (error) {
        // handle error such as server error
        res.status(500).json( { error: error.message } );
    }
}

const updateDestination = async(req, res) => {
    try {
        // Extract the destination id from the URL parameters
        const id = req.params.id;

        // Extract fileds from the request body
        const {destination, description, city, country, img_url, flag_img_url} = req.body

        // Update the  fields for the destination with the specified id
        const results = await pool.query('UPDATE destinations SET destination=$1, description=$2, city=$3, country=$4, img_url=$5, flag_img_url=$6  WHERE id=$7 RETURNING *', [destination, description, city, country, img_url, flag_img_url, id])

        // Check if the update was successful and if any destination was not found
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'destination not found' });
        }
        // Respond with the updated destination
        res.status(200).json(results.rows[0])
    } catch (error) {
        // Handle errors, such as conflicts or invalid data
        res.status(500).json({error: error.message})
    }
}

const deleteDestination = async(req, res) => {
    try {
        const id = req.params.id;
         // Execute the DELETE query

        const results = await pool.query('DELETE FROM destination WHERE id = $1', [id])
        // Check if any rows were affected (i.e., if the destination was found and deleted)

        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Destination not found' });
        }
        // Respond with a success message if the activity was deleted
        res.status(200).json({ message: 'Destination successfully deleted' });

    } catch (error) {
        // Handle errors such as server issues
        res.status(500).json({ error: error.message });
    }
}

export default {
    getDestinations,
    createDestination,
    getDestination,
    updateDestination,
    deleteDestination
}
