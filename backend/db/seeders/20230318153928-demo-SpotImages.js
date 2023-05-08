'use strict';

// const { Sequelize } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
   options.tableName = 'SpotImages'
   return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
      preview: false
    }

   ], {})
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages'
    // const sequelize = require('../models')
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      spotId: {[Op.in]: [1,2]}
    }, {})
  }
};
