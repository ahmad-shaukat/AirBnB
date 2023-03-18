'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   options = 'Bookings';
   return queryInterface.bulkInsert(options, [
    {
      userId: 1,
      spotId: 1,
      startDate: "2023-02-01",
      endDate: "2023-02-01"
    },
    {  userId: 2,
      spotId: 2,
      startDate: "2023-02-01",
      endDate: "2023-02-01"
    }
   ])
  },

  async down (queryInterface, Sequelize) {
   options.tableName = 'Bookings';
   const Op = Sequelize.Op;
   return queryInterface.bulkDelete(options, {
    userId: {[Op.in]: [1,2]}
   })
  }
};
