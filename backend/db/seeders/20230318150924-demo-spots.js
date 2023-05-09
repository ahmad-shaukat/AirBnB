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
      description: "This beautiful house is the perfect place for tourists to stay during their vacation. With its spacious layout and luxurious amenities, it offers a truly memorable experience for guests.",
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
      description: "This charming house is the perfect place for tourists to stay during their visit to the area. With its cozy interior and comfortable furnishings, it offers a warm and welcoming atmosphere that will make guests feel right at home. The house features spacious bedrooms with comfortable beds, clean linens, and plenty of storage space for luggage and personal belongings.",
      price: 250
    }, 
    {
      ownerId: 1,
      address: "123 Main Street",
      city: "New York",
      state: "New York",
      country: "United States of America",
      lat: 40.7128,
      lng: -74.0060,
      name: "Luxury Loft",
      description: "This stunning loft offers a luxurious and spacious living space with an open floor plan, high ceilings, and large windows that let in plenty of natural light. The loft features a modern and stylish interior with elegant furnishings, high-end appliances, and top-of-the-line amenities.",
      price: 110
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
