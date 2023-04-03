const express = require('express');
const { restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize, ReviewImage, Booking } = require('../../db/models')
const router = express.Router();

// Delete a review Image 

router.delete('/:imageId', restoreUser, async(req, res) => {
    const imageId = req.params.imageId
    const currentUser = req.user.dataValues.id
    const deleteReviewImage = await ReviewImage.findByPk(imageId, {
        include: {
            model: Review

        }
    })
    if (!deleteReviewImage) {
        return res.status(404).json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }
    // console.log (reviewUserId)
    // console.log(currentUser)
    // console.log(deleteReviewImage.dataValues.Review.userId)
    const reviewUserId = deleteReviewImage.dataValues.Review.userId;

    if (reviewUserId === currentUser) {
        await deleteReviewImage.destroy()
        return res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
    res.status(403).json({
        "message": "User is not authorized to delete this review image",
        "statusCode": 403
    })
    // console.log (imageId)
    // console.log (currentUser)
    // console.log (reviewUserId)
    // res.json(deleteReviewImage)
})

module.exports = router