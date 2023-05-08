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
      description: "This beautiful house is the perfect place for tourists to stay during their vacation. With its spacious layout and luxurious amenities, it offers a truly memorable experience for guests. The house features multiple bedrooms, each with its own private bathroom and comfortable beds with high-quality linens. The living room is elegantly furnished with plush sofas, a large flat-screen TV, and a cozy fireplace, providing the perfect place to relax and unwind. The kitchen is fully equipped with top-of-the-line appliances, including a gas range and a dishwasher, as well as plenty of cookware, dishes, and utensils.",
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
      description: "This charming house is the perfect place for tourists to stay during their visit to the area. With its cozy interior and comfortable furnishings, it offers a warm and welcoming atmosphere that will make guests feel right at home. The house features spacious bedrooms with comfortable beds, clean linens, and plenty of storage space for luggage and personal belongings. The living room is a great place to relax and unwind after a day of sightseeing, with comfortable sofas, a flat-screen TV, and a selection of books and games.",
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
      description: "This stunning loft offers a luxurious and spacious living space with an open floor plan, high ceilings, and large windows that let in plenty of natural light. The loft features a modern and stylish interior with elegant furnishings, high-end appliances, and top-of-the-line amenities. Guests will enjoy the comfortable king-sized bed, plush linens, and spa-like bathroom with a deep soaking tub and rain shower. The loft also offers a private balcony with panoramic views of the city skyline, perfect for relaxing and enjoying a cup of coffee or a glass of wine.",
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
