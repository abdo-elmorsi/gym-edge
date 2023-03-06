const express= require('express')
const router= express.Router({mergeParams: true})
const reviewController= require('./../controller/reviewController')
const authConroller= require('./../controller/authController')

router.route('/').get(reviewController.getAllReviews).post(authConroller.protect,authConroller.restrictTo('user') ,reviewController.createReview)
router.route('/:id')
    .get(reviewController.getReview)
    .delete(reviewController.deleteReview)
    .patch(reviewController.updateReview)

module.exports= router