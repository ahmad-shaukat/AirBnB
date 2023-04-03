const express = require('express');
const { check } = require('express-validator');
const { restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require('../../db/models')
const router = express.Router();
const { Sequelize, fn, literal, col, EmptyResultError } = require('sequelize');
const { validationResult } = require('express-validator');
const { crossOriginResourcePolicy } = require('helmet');






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


//-----------------------validations for bookig----------------------------
const bookingValidations = [
    check('startDate')
    .exists({ checkFalsy: true })
    .withMessage('startDate text is required'),
  check('endDate')
    .exists({ checkFalsy: true })
    .withMessage('end date is required'),
    (req, res, next) => {
      const {startDate, endDate} = req.body
      if(startDate>= endDate) {
        return res.status(400).json({
          "message": "Validation error",
          "statusCode": 400, 
          "error": {
            "endDate": "endDate cannot be on or before startDate"
          }
        })
      }
      return next()
    },
    handleValidationErrors
  ]

// get all the booking 


router.get('/current', restoreUser, async(req, res) => {
    const currentUser = req.user.dataValues.id
    const allBookings = await Booking.findAll({
        where: {
            userId: currentUser
        },
        include: {
            model: Spot,
            include: {
                model: SpotImage
            },
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price',]
        },
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
    })

    const modifiedBookings = allBookings.map(booking => ({
      id: booking.id,
      spotId: booking.spotId,
      Spot: {
        id: booking.Spot.id,
        ownerId: booking.Spot.ownerId,
        address: booking.Spot.address,
        city: booking.Spot.city,
        state: booking.Spot.state,
        country: booking.Spot.country,
        lat: booking.Spot.lat,
        lng: booking.Spot.lng,
        name: booking.Spot.name,
        price: booking.Spot.price,
        previewImage: booking.Spot.SpotImages[0].url
      },
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    }))


    res.json({ Bookings: modifiedBookings })
})


// Edit a Booking 

router.put('/:bookingId', restoreUser, bookingValidations,  async(req, res) => {
    const currentDate = new Date().toISOString().slice(0,10)
    // let currentDate = new  Date(). 
    const {endDate, startDate} = req.body
    const bookingId = req.params.bookingId
    const editBooking = await Booking.findByPk(bookingId)
    if (!editBooking) {
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    
    const checkEndDate = editBooking.dataValues.endDate
  
    if (checkEndDate<=currentDate) {
       return res.status(403).json(
            {
                "message": "Past bookings can't be modified",
                "statusCode": 403
              }
        )
    }
    const Bookingcheck = await Booking.findAll({
        attributes: ['id', 'startDate', 'endDate'],
        where: {
          startDate: startDate,
          endDate: endDate
        }
      })
      if (Bookingcheck.length>0) {
        return res.status(403).json({
          "message": "Sorry, this spot is already booked for the specified dates",
          "statusCode": 403,
          "errors": {
            "startDate": "Start date conflicts with an existing booking",
            "endDate": "End date conflicts with an existing booking"
          }
        })
      }
    editBooking.set({
        endDate, startDate, updatedAt: Sequelize.literal('CURRRENT')
    }, {
        fields: ['startDate', 'endDate', 'updatedAt']
    })
    await editBooking.save()

    

    res.json(editBooking)
})


// Delete a Booking 


router.delete ('/:bookingId', restoreUser, async(req, res) => {
    const currentDate = new Date().toISOString().slice(0,10)
    const bookingId = req.params.bookingId
    const userId = req.user.dataValues.id
    const deleteBooking = await  Booking.findByPk(bookingId, {
        include:{
            model: Spot,
            attributes: ['ownerId']
        }
    })
    // console.log(deleteBooking.dataValues.startDate)
    // console.log (currentDate)
    // console.log (bookingStartDate>=currentDate)
    // console.log (bookingStartDate)
    if (!deleteBooking) {
      return res.status(404).json({
        "message": "Booking couldn't be found",
        "statusCode": 404
      })
    }
    const bookingStartDate = deleteBooking.dataValues.startDate
    const spotId = deleteBooking.dataValues.spotId
    const userBookingId = deleteBooking.dataValues.userId
    const spotOwnerId = deleteBooking.Spot.dataValues.ownerId
    if (bookingStartDate>currentDate) {
         if (userId === userBookingId || spotOwnerId === userId) { // bookind or spot must belong to the current user
        await deleteBooking.destroy()
    } else {
        return res.status(403).json({
            "message": "Booking doesn't belong to the current user",
            "status": 403
        })
    }
    } else {
        return res.status(403).json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
          }
          )
    }
    

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })


   


    
})
module.exports = router

