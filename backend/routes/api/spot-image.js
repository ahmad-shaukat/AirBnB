const express = require('express');
const { check } = require('express-validator');
const { restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize, ReviewImage, Booking } = require('../../db/models')
const router = express.Router();
const { Sequelize, fn, literal, col, EmptyResultError } = require('sequelize');
const app = require('../../app');
const spot = require('../../db/models/spot');
const { validationResult } = require('express-validator');
const { route } = require('./session');

// delete a spot image 

router.delete('/:imageId', restoreUser, async(req, res) => {
    const imageId = req.params.imageId
    const currentUser = req.user.dataValues.id
    const deleteImage = await SpotImage.findByPk(imageId, {
        include: {
            model: Spot,
            attributes: ['ownerId']
        },
    })
    if (!deleteImage) {
        return res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }
    const spotImageSpotOwnerId = deleteImage.dataValues.Spot.dataValues.ownerId
  
    if (spotImageSpotOwnerId === currentUser) {
        await deleteImage.destroy()
        return res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } 
    res.status(403).json({
        "message": "Current user is not authorized to delete the Spot image",
        "status": 403
    })
    
    
})










module.exports = router