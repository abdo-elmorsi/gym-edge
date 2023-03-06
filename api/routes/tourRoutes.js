const express= require('express')
const router= express.Router()
const tourConroller= require("./../controller/tourController")
const authController= require('./../controller/authController')
const reviewController= require('./../controller/reviewController')
const reviewRouter= require('./../routes/reviewRoutes')

router.use('/:tourId/reviews', reviewRouter)

router.route('/get-statistics').get(tourConroller.getStatistics)
router.route('/top-5-tours').get(tourConroller.aliasTopTours, tourConroller.getAllTours)
router.route("/").get(authController.protect, tourConroller.getAllTours).post(tourConroller.createTour)
router.route("/:id").get(tourConroller.getTour).patch(tourConroller.updateTour).delete(authController.protect, authController.restrictTo('admin', 'lead-guide') ,tourConroller.deleteTour)

// POST /tour/tour:id/review
// GET /tour/tour:id/review
// GET /tour/tour:id/review/review:id

module.exports= router