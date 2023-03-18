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
      url: 'image url',
      preview: true
    },
    {
      spotId: 2,
      url: 'image url',
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
