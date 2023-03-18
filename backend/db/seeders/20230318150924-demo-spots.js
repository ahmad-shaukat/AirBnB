'use strict';


const { sequelize } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots'
   await queryInterface.bulkInsert(options,[
    {
     
      ownerId: 1,
      address: "123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 123
    },
    {
    
      ownerId: 2,
      address: "456 Central Avenue",
      city: "Los Angeles",
      state: "California",
      country: "United States of America",
      lat: 34.0522,
      lng: -118.2437,
      name: "Hollywood Sign",
      description: "Famous Hollywood landmark",
      price: 50
    }
   ], {} )
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots'
   const Op = Sequelize.Op
   return queryInterface.bulkDelete(options, {
    ownerId: {[Op.in]: [1,2]}
   }, {})
  }
};
