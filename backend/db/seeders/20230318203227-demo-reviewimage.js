'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'image-url'
      },
      {
        reviewId: 2,
        url: 'image2-url'
      }
    ], {})

  },

  async down (queryInterface, Sequelize) {
   options.tableName = 'ReviewImages';
   const Op = Sequelize.Op;
   return queryInterface.bulkDelete(options, {
    reviewId: {[Op.in]:[1,2]}
   }, {})
  }
};
