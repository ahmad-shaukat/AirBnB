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
      url: 'https://ap.rdcpix.com/71065b8309dca02ca88a392e3035c28fl-m2971680444od-w1024_h768_x2.webp',
      preview: true,
    },
    {
      spotId: 1,
      url: 'https://ap.rdcpix.com/71065b8309dca02ca88a392e3035c28fl-m3254423481od-w1024_h768_x2.webp',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://ap.rdcpix.com/71065b8309dca02ca88a392e3035c28fl-m3142368695od-w1024_h768_x2.webp',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://ap.rdcpix.com/71065b8309dca02ca88a392e3035c28fl-m902964867od-w1024_h768_x2.webp',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://ap.rdcpix.com/71065b8309dca02ca88a392e3035c28fl-m3898867252od-w1024_h768_x2.webp',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://ap.rdcpix.com/e61b5caf93d4766e7f1660ee37022583l-m142010183od-w1024_h768_x2.webp',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://ap.rdcpix.com/e61b5caf93d4766e7f1660ee37022583l-m3303046956od-w1024_h768_x2.webp',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://ap.rdcpix.com/e61b5caf93d4766e7f1660ee37022583l-m62318033od-w1024_h768_x2.webp',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://ap.rdcpix.com/e61b5caf93d4766e7f1660ee37022583l-m940958021od-w1024_h768_x2.webp',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://ap.rdcpix.com/e61b5caf93d4766e7f1660ee37022583l-m1461957993od-w1024_h768_x2.webp',
      preview: false
    }, 
    {
      spotId: 3,
      url: 'https://ap.rdcpix.com/8ddd0dbe57db5198880c17a5929ec1eal-m226850825od-w1024_h768_x2.webp',
      preview: true
    }, 
    {
      spotId: 3,
      url: 'https://ap.rdcpix.com/8ddd0dbe57db5198880c17a5929ec1eal-m2173261106od-w1024_h768_x2.webp',
      preview: false
    }, 
    {
      spotId: 3,
      url: 'https://ap.rdcpix.com/8ddd0dbe57db5198880c17a5929ec1eal-m1042314132od-w1024_h768_x2.webp',
      preview: false
    }, 

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
