import express from 'express'
import ActivitiesController from '../controllers/activities.js'
const router = express.Router()


router.get('/', ActivitiesController.getActivities)
router.get('/:id', ActivitiesController.getAactivity)
router.post('/', ActivitiesController.createActivity)
router.delete('/:id', ActivitiesController.deleteActivity)
router.patch('/:id', ActivitiesController.updateActivityLikes)

export default router