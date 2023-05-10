'use strict';


const { sequelize } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    await queryInterface.bulkInsert(options, [
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
      },
      {
        ownerId: 2,
        address: "456 Main Street",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.0522,
        lng: -118.2437,
        name: "Modern Condo",
        description: "This modern condo features sleek design and contemporary furnishings, with state-of-the-art appliances and luxurious amenities. Perfect for those seeking a stylish and comfortable stay in the heart of the city.",
        price: 150
      },
      {
        ownerId: 2,
        address: "789 Main Street",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7749,
        lng: -122.4194,
        name: "Charming Victorian",
        description: "This charming Victorian house boasts elegant decor, vintage furnishings, and a cozy atmosphere. Located in a quiet neighborhood with easy access to local attractions and amenities.",
        price: 90
      },
      {
        ownerId: 1,
        address: "321 Main Street",
        city: "Chicago",
        state: "Illinois",
        country: "United States of America",
        lat: 41.8781,
        lng: -87.6298,
        name: "Classic Brownstone",
        description: "This classic brownstone offers traditional charm and character with a modern twist. Featuring tasteful furnishings, updated appliances, and all the amenities needed for a comfortable stay.",
        price: 120
      },
      {
        ownerId: 1,
        address: "654 Main Street",
        city: "Miami",
        state: "Florida",
        country: "United States of America",
        lat: 25.7617,
        lng: -80.1918,
        name: "Tropical Oasis",
        description: "Escape to this beautiful tropical oasis, featuring lush gardens, a private pool, and a spacious living space with plenty of natural light. Perfect for a relaxing vacation in the sun.",
        price: 200
      },
      {
        ownerId: 2,
        address: "987 Main Street",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat: 47.6062,
        lng: -122.3321,
        name: "Contemporary Loft",
        description: "Experience the best of city living in this stylish and contemporary loft, featuring an open floor plan, high ceilings, and stunning views of the city skyline. Ideal for business travelers or couples looking for a romantic getaway.",
        price: 175
      },
      {
        ownerId: 1,
        address: "135 Main Street",
        city: "Austin",
        state: "Texas",
        country: "United States of America",
        lat: 30.2672,
        lng: -97.7431,
        name: "Rustic Retreat",
        description: "Get away from it all in this charming rustic cabin, nestled in the heart of nature. Featuring a cozy interior with wood-burning fireplace, outdoor patio with stunning views, and all the amenities needed for a comfortable stay.",
        price: 80
      }



    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2] }
    }, {})
  }
};
