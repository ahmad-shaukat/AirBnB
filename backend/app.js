const express = require('express');
require('express-async-errors');

const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const {environment} = require('./config')
const isProduction = environment === 'production'
const {ValidationError} = require('sequelize');
const app = express()
app.use(morgan('dev')) 
app.use(cookieParser());
const routes = require('./routes')
app.use(express.json());



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
    
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
      
    })

    );
    app.use(routes)

    // catch unhandeled requests
    app.use((_req, _res, next) => {
      const err = new Error("The requested resource couldn't be found.");
      err.title = "Resource Not Found";
      err.errors = { message: "The requested resource couldn't be found." };
      err.status = 404;
      next(err);
    });
    // catch validation errors
    app.use((err, _req, _res, next) => {
      // check if error is a Sequelize error:
      if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
          errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors;
      }
      next(err);
    });
    // error formatter. This decides what the client sees. 
    app.use((err, _req, res, _next) => {

      res.status(err.status || 500);
      res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
      });
    });

   
  module.exports = app;

