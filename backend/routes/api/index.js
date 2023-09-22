const router = require('express').Router();
const spotRouter = require('./spot.js')
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js')
const { restoreUser } = require('../../utils/auth.js');
const reviewRouter = require('./review')
const bookingRouter = require('./booking.js')
const spotImageRouter = require('./spot-image.js')
const reviewImageRouter = require('./review-image.js')
// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null

router.use(restoreUser);

router.use('/spots',spotRouter)

router.use('/reviews', reviewRouter)

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/bookings', bookingRouter)

router.use('/spot-images', spotImageRouter)

router.use('/review-images', reviewImageRouter)


module.exports = router
  