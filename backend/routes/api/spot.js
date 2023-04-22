// restore user is global for all incoming requests
const express = require('express');
const { check } = require('express-validator');
const { restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize, ReviewImage, Booking } = require('../../db/models')
const router = express.Router();
const { Sequelize, fn, literal, col, EmptyResultError } = require('sequelize');
const app = require('../../app');
const spot = require('../../db/models/spot');
const { validationResult } = require('express-validator');



//-------------------------Error Handeler for validations-----------
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

//-----------------validations for spot----------------//
//sdfkj;slfjl;sdfj
const ValidationSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage('Latitude is required'),
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage('Longitude is required'),
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price is required'),
  handleValidationErrors
]

//---------------------validations for review-------------------//

const reviewValidations = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isIn([1, 2, 3, 4, 5])
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]

//-----------------------bookings validations--------------------//

// get spots that belong to current user


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


//--------------------------------------query validations--------------------

const queryValidations = [
  check('page')
  .exists({checkFalsy: true})
  .isInt({ min:1})
  .withMessage("Page must be greater than or equal to 1"),
  check('size')
  .exists({checkFalsy: true})
  .isInt({min:1})
  .withMessage("Size must be greater than or equal to 1"),
  check('maxLat')
  .optional()
  .isDecimal()
  .withMessage('"Maximum latitude is invalid"'),
  check('minLat')
  .optional()
  .isDecimal()
  .withMessage("Minimum latitude is invalid"),
  check('minLng')
  .optional()
  .isDecimal()
  .withMessage("Minimum longitude is invalid"),
  check('maxLng')
  .optional()
  .isDecimal()
  .withMessage("Maximum longitude is invalid"),
  check('minPrice')
  .optional()
  .isFloat({min:0})
  .withMessage("Minimum price must be greater than or equal to 0"),
  check('maxPrice')
  .optional()
  .isFloat({min:0})
  .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors
]


router.get('/current', restoreUser, async (req, res) => {
  console.log (req.user.dataValues.id)
  const allSpots = await Spot.findAll({
    where: {
      ownerId: req.user.dataValues.id
    },
    attributes: [
      'id',
      'ownerId',
      'address',
      'city',
      'state',
      'country',
      'lat',
      'lng',
      'name',
      'description',
      'price',
      'createdAt',
      'updatedAt',
      [
        fn('AVG', literal('Reviews.stars')),
        'avgRating'
      ],
      [col('SpotImages.url'), 'previewImage']
    ],
    include: [
      {
        model: Review,
        attributes: []
      },
      {
        model: SpotImage,
        attributes: []
      }
    ],
    group: ['Spot.id']
  });
  allSpots.forEach(spot => {
    if (spot.dataValues.avgRating === null) {
      spot.dataValues.avgRating = 0;
    }
  });
  res.status(200).json({ "Spots": allSpots })
})





// get details of spot based on spot id 



router.get('/:spotId', restoreUser, async (req, res) => {
  let spotId = req.params.spotId
  let checkSpot = await Spot.findByPk(spotId)
  if (!checkSpot) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  let spot = await Spot.findByPk((spotId), {
    include: [{
      model: SpotImage,
      attributes: ['id', 'url', 'preview'],
      
    limit: 10000
      
    },
    {
      model: Review,
      attributes: [],
      // duplicating: false
    },
    {
      model: User,
      attributes: ['id', 'firstName', 'lastName'],
      as: 'Owner'
    }
    ],
    attributes: {
      include: [[Sequelize.fn('COUNT', Sequelize.col('Reviews.id')), 'numReviews'], [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating']]

    }

  })
  

  console.log(spot)
  res.json(spot)
})


// router.get('/', restoreUser, async (req, res) => {

//   const allSpots = await Spot.findAll({
//     attributes: [
//       'id',
//       'ownerId',
//       'address',
//       'city',
//       'state',
//       'country',
//       'lat',
//       'lng',
//       'name',
//       'description',
//       'price',
//       'createdAt',
//       'updatedAt'
      
//     ],
//     include: [
//       {
//         model: Review,
//         attributes: []
//       },
//       {
//         model: SpotImage,
//         attributes: []
//       }
//     ],
//     group: ['Spot.id']
//   });
//   allSpots.forEach(spot => {
//     if (spot.dataValues.avgRating === null) {
//       spot.dataValues.avgRating = 0;
//     }
//   });
//   res.status(200).json({ "Spots": allSpots })
// })



router.get('/', restoreUser, queryValidations,  async (req, res) => {
  const {page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice} = req.query


  const limit = parseInt(size);

  const offset = Number((parseInt(page)-1)*limit)



  const {Op} = require('sequelize')


const options = {
  

    attributes: [
      'id',
      'ownerId',
      'address',
      'city',
      'state',
      'country',
      'lat',
      'lng',
      'name',
      'description',
      'price',
      'createdAt',
      'updatedAt',
      [literal('(SELECT AVG(stars) FROM reviews WHERE reviews.spotId = Spot.id)'), 'avgRating'],
      [
        Sequelize.literal('(SELECT url FROM "SpotImages" WHERE "SpotImages"."spotId" = "Spot"."id" LIMIT 1)'),
        'previewImage'
      ],
    ],
    include: [
      {
        model: Review,
        attributes: []
      },
      {
        model: SpotImage,
        attributes: []
      }
    ],
    group: ['Spot.id'],
    where: {
      
    },
    limit:limit,
    offset:offset,
   
  };
  console.log (options.where)
  
  
  if (minLat) {
  options.where.lat = {
    [Op.gte]: parseFloat(maxLat)
  }
};
if (maxLat) {
  options.where.lat = {
    ...options.where.lat, [Op.lte]: parseFloat(maxLat)
  }
};
if (minLng) {
  options.where.lng = {
    [Op.gte]:parseFloat(minLng)
  }
};
if (maxLng) {
  options.where.lng = {
    ...options.where.lng, [Op.lte]:parseFloat(maxLng)
  }
};
if (minPrice) {
  options.where.price = {
    [Op.gte]: Number(minPrice)
  }
  // console.log (options.where)
};
if (maxPrice) {
  options.where.price = {
    ...options.where.price, [Op.lte]:parseInt(maxPrice)
  }
}

  
  
  const allSpots = await Spot.findAll(options);
  
  
  allSpots.forEach(spot => {
    if (spot.dataValues.avgRating === null) {
      spot.dataValues.avgRating = 0;
    }
  });
  
  res.status(200).json({ "Spots": allSpots, 
page, 
size
})
  
})






























// add new spot on current user


router.post('/', restoreUser, ValidationSpot, async (req, res) => {
  let { address, city, state, country, lat, lng, name, description, price } = req.body
  let ownerId = req.user.dataValues.id
  // console.log (userId)
  const newSpot = await Spot.create({
    ownerId, address, city, state, country, lat, lng, name, description, price,
  })
  res.json(newSpot)
})


// edit a spot 

router.put('/:spotId', restoreUser, ValidationSpot, async (req, res) => {
  let { address, city, state, country, lat, lng, name, description, price } = req.body
  let spotId = req.params.spotId
  let userId = req.user.dataValues.id
  let spot = await Spot.findByPk(spotId)
  if (!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const spotUserId = spot.dataValues.ownerId

  
  if (userId !== spotUserId) {
    return res.status(403).json({
      "message": "Access denied for current User",
      "statusCode": 403
    })
  }



  //-------this is more simpilar way but i think increases big o-------//
  // spot.address = address
  // spot.city = city
  // spot.state = state
  // spot.country = country
  // spot.lat = lat
  // spot.lng = lng
  // spot.name = name
  // spot.description = description
  // spot.price = price
  // spot.updatedAt = Sequelize.literal('CURRENT_TIMESTAMP')
  // await spot.save(spot)
  // res.json (spot)

  spot.set({
    address, city, state, country, lat, lng, name, description, price, updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
  }, { fields: ['adress', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'updatedAt'] })
  await spot.save()
  res.json(spot)
})

// delete a spot 

router.delete('/:spotId', restoreUser, async (req, res) => {
  const spotId = req.params.spotId
  const userId = req.user.dataValues.id
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  const spotUserId = spot.dataValues.ownerId

  
  if (userId !== spotUserId) {
    return res.status(403).json({
      "message": "Access denied for current User",
      "statusCode": 403
    })
  }
  await spot.destroy()
  res.status(200).json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})


// add spot image based on spot id 



router.post('/:spotId/images', restoreUser, async (req, res) => {
  let { url, preview } = req.body
  // console.log (req.user)
  const userId = req.user.dataValues.id
  let spotId = Number(req.params.spotId)
  let spot = await Spot.findByPk(spotId)
  if (!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  const SpotUserId = spot.dataValues.ownerId

  
  if (userId !== SpotUserId) {
    return res.status(403).json({
      "message": "Access denied for current User",
      "statusCode": 403
    })
  }
 
  let newSpotImage = await SpotImage.create({
    spotId, url, preview
  })

  delete newSpotImage.dataValues.updatedAt
  delete newSpotImage.dataValues.createdAt
  delete newSpotImage.dataValues.spotId
  res.status(200), res.json(
    newSpotImage
  )

})


// create a review for a spot based on spots id
router.post('/:spotId/reviews', restoreUser, reviewValidations, async (req, res) => {
  const { Op } = require('sequelize')
  let userId = req.user.dataValues.id
  const spotId = Number(req.params.spotId)
  const spotCheck = await Spot.findByPk(spotId)
  if (!spotCheck) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  const UserSpotCheck = await Spot.findByPk(spotId, {
    include: {
      model: Review,
      where: {
        userId: {
          [Op.eq]: userId
        }
      }
    }
  })
  if (UserSpotCheck) {
    return res.status(403).json({
      "message": "User already has a review for this spot",
      "statusCode": 403
    })
  }
  const { review, stars } = req.body
  const newReview = await Review.create({
    userId, spotId, review, stars
  })


  // console.log (req.user.dataValues)
  res.json(newReview)
})




// get all reviews by the spot Id


router.get('/:spotId/reviews', restoreUser, async (req, res) => {
  let spotId = req.params.spotId
  let spot = await Spot.findByPk(spotId)
  if (!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  let reviews = await Review.findAll({
    where: {
      spotId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }

    ]
  })
  res.json({"Reviews": reviews})
})

// Get all Bookings for a spot based on Spot's id


router.get('/:spotId/bookings', restoreUser, async(req, res) => {
  let userId = req.user.dataValues.id
  let spotId = req.params.spotId
  let spot = await Spot.findByPk(spotId)
  if(!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  if (userId=== spot.dataValues.ownerId) {
    const bookings = await Booking.findAll({
      where: {
        userId
      },
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
    })
    const result = bookings.map(booking => {
      return {
        "User":{
          "id": booking.User.id,
          "firstName": booking.User.firstName,
          "lastName": booking.User.lastName
        },
        "id": booking.id,
        "spotId": booking.spotId,
        "startDate": booking.startDate,
        "endDate": booking.endDate,
        "createdAt": booking.createdAt,
        "updatedAt": booking.updatedAt
      }
    })
    res.json({
      "Booking": result
    })
  }
  const allBookings = await Booking.findAll({
    where: {
      spotId
    },
    attributes: ['spotId', 'startDate', 'endDate']
  })
res.json({"Bookings":allBookings})


})

// create a booking from a spot based on spot's id 

router.post('/:spotId/bookings', restoreUser, bookingValidations, async (req, res) => {
  let { startDate, endDate } = req.body
  const userId = req.user.dataValues.id
  const { Op } = require('sequelize')
  const spotId = Number(req.params.spotId)
  const spot = await Spot.findByPk(spotId, {
    include: Booking,
 
  })
  if (!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  if (spot.dataValues.ownerId === req.user.dataValues.id) {
    return res.status(403).json({
      "message": "Access denied for current User"
    })
  }



  // find if booking already exsists 


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

  const newBooking = await Booking.create({
    spotId, userId, startDate, endDate
  })

  res.json(newBooking)

})





module.exports = router