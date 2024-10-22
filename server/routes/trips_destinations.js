import express from 'express'
const router = express.Router();
import TripsDestinationsController from '../controllers/trips_destinations.js'

// Route for inserting a new trip destination
router.post('/', TripsDestinationsController.createTripDestination);

// Route for retrieving all trip destinations
router.get('/', TripsDestinationsController.getTripsDestinations);

// Route for retrieving all trips associated with a specific destination
router.get('/trips/:destination_id', TripsDestinationsController.getAllTrips);

// Route for retrieving all destinations associated with a specific trip
router.get('/destinations/:trip_id', TripsDestinationsController.getAllDestinations);

export default router