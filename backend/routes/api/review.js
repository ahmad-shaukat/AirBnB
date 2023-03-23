const express = require('express');
const { check } = require('express-validator');
const { restoreUser } = require('../../utils/auth');
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




// get reviews of the current user


router.get('/current', restoreUser, async (req, res) => {
    const userId = req.user.dataValues.id;
    console.log(userId, '-----');
    const allReviews = await Review.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: [
                    'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price',
                    [
                        sequelize.literal(
                            `(SELECT url FROM "SpotImages" WHERE "SpotImages"."spotId" = "Spot"."id" LIMIT 1)`
                        ),
                        'previewImage'
                    ]
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ],
        group: ['Spot.id']
    });
    res.json(allReviews);
});

// get all reviews by spot id this is in the spot route file


// create a review for a spot based on spots id in spot routes 





// Add an image to a review based on the review's id


router.post('/:reviewId/images', restoreUser, async (req, res) => {
    const reviewId = req.params.reviewId
    const { url } = req.body
    const review = await Review.findByPk(reviewId)
    if (!review) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
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
    console.log(imageLength)
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
    console.log(review, stars)
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


router.delete('/:reviewId', restoreUser, async (req, res) => {
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

} )

module.exports = router
