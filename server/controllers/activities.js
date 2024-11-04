import pool from '../config/database.js'

const createActivity = async(req, res) => {
    try {
        // Extracting activity, num_votes, and trip_id from the request body
        const {activity, num_votes, trip_id} = req.body
        // Insert the new activity into the database
        const results = await pool.query(
            'INSERT INTO activities (activity, num_votes, trip_id) VALUES($1, $2, $3) RETURNING *',
            [activity, num_votes, trip_id]
        )
        // Respond with the newly created activity
        res.status(201).json(results.rows[0])
    } catch (error) {
        // Handle errors such as conflicts or bad data
        res.status(409).json( { error: error.message } )
    }
}

const getActivities = async(req, res) => {
    try {
        
        // get all the activities from the activities table
        const results = await pool.query('SELECT * FROM activities ORDER BY id ASC' )
        // Respond with the all activities
        res.status(200).json(results.rows)
    } catch (error) {
        // handle error such as server error
        res.status(500).json( { error: error.message } )
    }
}

const getActivity = async(req, res) => {
    try {
        //extract trip_id from url parameters
        const trip_id = req.params.id

        

         // Query the database for activities with the specified trip_id
        const results = await pool.query('SELECT * FROM activities WHERE trip_id = $1', [trip_id]);

        // If no activities are found, return a 404 status
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'No activities found for the given trip_id' + req.params.json });
        }
        // Respond with the activities for the given trip_id
        res.status(200).json(results.rows);
    } catch (error) {
        // handle error such as server error
        res.status(500).json( { error: error.message } );
    }
}

const updateActivityLikes = async(req, res) => {
    try {
        // Extract the activity id from the URL parameters
        const id = req.params.id;

        // Extract num_votes from the request body
        const {num_votes} = req.body

        // Update the num_votes field for the activity with the specified id
        const results = await pool.query('UPDATE activities SET num_votes=$1 WHERE id=$2 RETURNING *', [num_votes, id])

        // Check if the update was successful and if any activity was found
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        // Respond with the updated activity
        res.status(200).json(results.rows[0])
    } catch (error) {
        // Handle errors, such as conflicts or invalid data
        res.status(500).json({error: error.message})
    }
}

const deleteActivity = async(req, res) => {
    try {
        const id = req.params.id;
         // Execute the DELETE query

        const results = await pool.query('DELETE FROM activities WHERE id = $1', [id])
        // Check if any rows were affected (i.e., if the activity was found and deleted)

        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        // Respond with a success message if the activity was deleted
        res.status(200).json({ message: 'Activity successfully deleted' });

    } catch (error) {
        // Handle errors such as server issues
        res.status(500).json({ error: error.message });
    }
}

export default {
    getActivities,
    createActivity,
    getActivity, 
    updateActivityLikes,
    deleteActivity
}
