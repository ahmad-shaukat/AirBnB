// restore user is global for all incoming requests
const express = require('express');
const { check } = require('express-validator');
const { restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize } = require('../../db/models')
const router = express.Router();
const { Sequelize, fn, literal, col, EmptyResultError } = require('sequelize');
const app = require('../../app');
const spot = require('../../db/models/spot');
const { validationResult } = require('express-validator')
// const { handleValidationErrors } = require('../../utils/validation');
// const { validationResult } = require('express-validator');


// const handleValidationErrors = (req, _res, next) => {
//   const validationErrors = validationResult(req);

//   if (!validationErrors.isEmpty()) { 

//     const errors = {};
//     validationErrors
//       .array()
//       .forEach(error => errors[error.param] = error.msg);

//     const err = Error('Validation Error');
//     err.errors = errors;
//     err.status = 400;
//     // err.title = 'sdfasf'
//     // err.message = "Validation Error";
//     err.statusCode = 400
//     delete err.stack
//     delete err.title

//     next(err);
//   }
//   next();
// };
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
  

};


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
      attributes: ['id', 'url', 'preview']
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


// get all the spots 


router.get('/', restoreUser, async (req, res) => {

  const allSpots = await Spot.findAll({
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
        fn('AVG', literal('stars')),
        'avgRating'
      ],
      [col('url'), 'previewImage']
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

// get spots that belong to current user


router.get('/current', restoreUser, async (req, res) => {

  const allSpots = await Spot.findAll({
    where: {
      id: 1
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
        fn('AVG', literal('stars')),
        'avgRating'
      ],
      [col('url'), 'previewImage']
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
  let spot = await Spot.findByPk(spotId)
  if (!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
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
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  // await spot.destroy()
  res.status(200).json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})


// add spot image based on spot id 



router.post('/:spotId/images', restoreUser, async (req, res) => {
  let { url, preview } = req.body
  let spotId = req.params.spotId
  let spot = await Spot.findByPk(spotId)
  if (!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  let newSpotImage = await SpotImage.create({
    spotId, url, preview
  })
  // ['createdAt', 'updatedAt'].forEach(prop => delete newSpotImage.dataValues[prop])
  // console.log (newSpotImage.createdAt, '------')
  // console.log(newSpotImage.dataValues['updatedAt'])
  delete newSpotImage.dataValues.updatedAt
  delete newSpotImage.dataValues.createdAt
  res.status(200), res.json(
    newSpotImage
  )
})





module.exports = router