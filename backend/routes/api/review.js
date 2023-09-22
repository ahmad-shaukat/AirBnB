const express = require('express');
const { check } = require('express-validator');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require('../../db/models')
const router = express.Router();
const { Sequelize, fn, literal, col, EmptyResultError } = require('sequelize');
const app = require('../../app');
const spot = require('../../db/models/spot');
const { validationResult } = require('express-validator')

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {

        const errors = {};
        validationErrors
            .array()
            .forEach(error => errors[error.param] = error.msg);

        return res.status(400).json({
            "message": 'Validation Error',
            "statusCode": 400,
            "errors": errors
        })
    }
    next()

};


const reviewEditValidations = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isIn([1, 2, 3, 4, 5])
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]




// get reviews of the current user without aggragate functions


router.get('/current',
    restoreUser,
    async (req, res) => {

        const userId = req.user.dataValues.id
       

        const allReviews = await Review.findAll({
            where: { userId},
            include: [Spot, ReviewImage, User]
        })
       

        const allSpotImages = await SpotImage.findAll({})
       

        const resultObj = { "Reviews": [] }



        allReviews.forEach(reviews => {
            const key = "previewImage";
          
            const spotImages = []

            allSpotImages.forEach(images => {  
   
                if (reviews.Spot.dataValues.id = images.dataValues.spotId) {
                    spotImages.push(images.dataValues.url)
                }
            })
            
            reviews.Spot.dataValues['previewImage'] = spotImages[0]

            reviews.ReviewImages.forEach(ele3 => {
               

                delete ele3.dataValues.reviewId
                delete ele3.dataValues.updatedAt
                delete ele3.dataValues.createdAt
            })

            delete reviews.Spot.dataValues.createdAt
            delete reviews.Spot.dataValues.updatedAt
            delete reviews.User.dataValues.user

            resultObj.Reviews.push(reviews)
        })

        res.status(200).json(resultObj)
    })










router.post('/:reviewId/images', restoreUser, async (req, res) => {
    const reviewId = req.params.reviewId
    const userId = req.user.dataValues.id
    const { url } = req.body
    const review = await Review.findByPk(reviewId)
    if (!review) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    const reviewUserId = review.dataValues.userId


    if (userId !== reviewUserId) {
        return res.status(403).json({
            "message": "Access denied for current User",
            "statusCode": 403
        })
    }

    const reviewImages = await Review.findByPk(reviewId, {
        attributes: [],
        include: {
            model: ReviewImage,


        }
    })
    // consol
    let imageLength = JSON.stringify(reviewImages["ReviewImages"].length)
    if (imageLength < 10) {
        const newReviewImage = await ReviewImage.create({
            reviewId, url
        })
        delete newReviewImage.dataValues.updatedAt
        delete newReviewImage.dataValues.createdAt
        delete newReviewImage.dataValues.reviewId

        res.status(200).json(newReviewImage)
    } else {
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "status": 403
        })
    }
})

// Edit a review


router.put('/:reviewId', restoreUser, reviewEditValidations, async (req, res) => {
    const reivewId = req.params.reviewId
    const { review, stars } = req.body
    const editReview = await Review.findByPk(reivewId)
    if (!editReview) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    editReview.set({
        review, stars, updatedAt: sequelize.literal('CURRENT_TIMESTAMP')
    }, { fields: ['body', 'stars', 'updatedAt'] })
    await editReview.save()
    res.json(editReview)
})


router.delete('/:reviewId',requireAuth , async (req, res) => {
    let reviewId = req.params.reviewId
    let deleteReview = await Review.findByPk(reviewId)
    if (!deleteReview) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    await deleteReview.destroy()
    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

})

module.exports = router
