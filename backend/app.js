const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const {environment} = require('./config')
const isProduction = environment === 'production'
const app = express()
app.use(morgan('dev')) 
app.use(cookieParser());
app.use(express.json());
const routes = require('./routes')
// security middlewares
if(!isProduction) {
    app.use(cors());
}
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
  );

  app.use(
    // console.log ('runi')
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
      //   console.log
    })
    // console.log ('')
    );
    app.use(routes)
  module.exports = app;

