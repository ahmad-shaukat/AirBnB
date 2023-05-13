'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  options.tableName = 'Reviews'
  return queryInterface.bulkInsert(options, [
    {
      spotId:1,
      userId:1,
      review: 'i like this place',
      stars: 5
    },
    {
      spotId:1,
      userId:2,
      review: "i didn't have good experience",
      stars:1
    },
    {
      spotId:2,
      userId:1,
      review: 'i like this place',
      stars: 5
    }
  ], {})

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: {[Op.in]: [1,2]}
    }, {})
  }
};
