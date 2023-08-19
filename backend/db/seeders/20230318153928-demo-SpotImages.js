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
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47025046/original/4d713a1e-ab4c-4d70-905f-d24b4042189f.jpeg?im_w=1200',
      preview: true,
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47025046/original/7f98dcc6-18f9-4cf6-8f83-798c20f1ba7f.jpeg?im_w=1440',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47025046/original/fa670b4e-cb55-470b-a84c-ffc4b9422710.jpeg?im_w=1440',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47025046/original/fb0b52c5-ffbf-400d-b41a-bb656eb47468.jpeg?im_w=1440',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47025046/original/b6beeabe-6cb5-4020-a55f-0609c5c980a2.jpeg?im_w=1440',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635437605163910390/original/eaf8887f-410f-41e4-be1b-88c2a74fbfcf.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635437605163910390/original/e22d9d0e-fa0b-48e1-9d35-ab7c3463b357.jpeg?im_w=1440',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635437605163910390/original/0db5cffd-7f0d-4e13-bd59-39cb9861cdaa.jpeg?im_w=1440',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635437605163910390/original/5a6ee29b-2c64-440a-aee6-481d4d8d1bd5.jpeg?im_w=1440',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635437605163910390/original/5d53f571-dc5c-449a-b333-22ed2afef829.jpeg?im_w=1440',
      preview: false
    }, 
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-626254961090027634/original/1843249b-cf76-4527-9b22-d5325c82ce12.jpeg?im_w=1200',
      preview: true
    }, 
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-626254961090027634/original/c65a5417-ccc7-40f9-ad71-c8d5189f39bf.jpeg?im_w=1440',
      preview: false
    }, 
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-626254961090027634/original/5a2eee49-8eec-4494-ae2e-fae2146053a4.jpeg?im_w=1440',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-626254961090027634/original/9c49367b-4754-4819-81a0-c4c1e51be89b.jpeg?im_w=1440',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-930549678198865025/original/6c2dc5bb-1b51-415d-9fb5-dfe3949fe447.jpeg?im_w=1200',
      preview: true
    }, 
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-930549678198865025/original/1986b44c-47d1-47b7-ad09-563480be9440.jpeg?im_w=1440', 
      preview: false
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-930549678198865025/original/2a89f6c6-60ac-43ae-bd97-914118a9c918.jpeg?im_w=1440', 
      preview: false
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-42654284/original/f17521b0-f947-4793-b6b4-4a8b19a85eec.jpeg?im_w=1440', 
      preview: false
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-930549678198865025/original/d58da6b0-0cab-458d-b3d6-398e5f683148.jpeg?im_w=1440', 
      preview: false
    },
    {
      spotId: 5,
      url: 'https://ap.rdcpix.com/48c9911bf74a48c6734b9f3fbdf677abl-m1607154818od-w1024_h768_x2.webp', 
      preview: true
    },
    {
      spotId: 5,
      url: 'https://ap.rdcpix.com/48c9911bf74a48c6734b9f3fbdf677abl-m2935903856od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 5,
      url: 'https://ap.rdcpix.com/48c9911bf74a48c6734b9f3fbdf677abl-m2935903856od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 5,
      url: 'https://ap.rdcpix.com/48c9911bf74a48c6734b9f3fbdf677abl-m2935903856od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 5,
      url: 'https://ap.rdcpix.com/48c9911bf74a48c6734b9f3fbdf677abl-m2935903856od-w1024_h768_x2.webp', 
      preview: false
    },
    {spotId: 6,
      url: 'https://ap.rdcpix.com/03ac58ca286aaf8dd5b4deba9550cd84l-m618037773od-w1024_h768_x2.webp',
      preview: true
    }, 
    {
      spotId: 6,
      url: 'https://ap.rdcpix.com/03ac58ca286aaf8dd5b4deba9550cd84l-m1695050502od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 6,
      url: 'https://ap.rdcpix.com/03ac58ca286aaf8dd5b4deba9550cd84l-m1695050502od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 6,
      url: 'https://ap.rdcpix.com/03ac58ca286aaf8dd5b4deba9550cd84l-m1695050502od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 6,
      url: 'https://ap.rdcpix.com/03ac58ca286aaf8dd5b4deba9550cd84l-m1695050502od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 7,
      url: 'https://nh.rdcpix.com/7efaee0ba6758e85bfa47a8d4fc0e69fe-f699763212od-w1024_h768_x2.webp', 
      preview: true
    },
    {
      spotId: 7,
      url: 'https://nh.rdcpix.com/7efaee0ba6758e85bfa47a8d4fc0e69fi-f323317888od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 7,
      url: 'https://nh.rdcpix.com/7efaee0ba6758e85bfa47a8d4fc0e69fi-f323317888od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 7,
      url: 'https://nh.rdcpix.com/7efaee0ba6758e85bfa47a8d4fc0e69fi-f323317888od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 7,
      url: 'https://nh.rdcpix.com/7efaee0ba6758e85bfa47a8d4fc0e69fi-f323317888od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 8,
      url: 'https://ap.rdcpix.com/1ebb12a1253a648f21ab5f1897d172ecl-m1014407670od-w1024_h768_x2.webp',
      preview:true 
    }, 
    {
      spotId: 8,
      url: 'https://ap.rdcpix.com/1ebb12a1253a648f21ab5f1897d172ecl-m2291791080od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 8,
      url: 'https://ap.rdcpix.com/1ebb12a1253a648f21ab5f1897d172ecl-m2291791080od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 8,
      url: 'https://ap.rdcpix.com/1ebb12a1253a648f21ab5f1897d172ecl-m2291791080od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 8,
      url: 'https://ap.rdcpix.com/1ebb12a1253a648f21ab5f1897d172ecl-m2291791080od-w1024_h768_x2.webp', 
      preview: false
    },
    {
      spotId: 9, 
      url: 'https://nh.rdcpix.com/4595d526af422743c5235c7537c36b94e-f2978416410od-w1024_h768_x2.webp',
      preview: true
    },
    {
      spotId: 9, 
      url: 'https://nh.rdcpix.com/4595d526af422743c5235c7537c36b94i-f3654568770od-w1024_h768_x2.webp',
      preview: false
    },
    {
      spotId: 9, 
      url: 'https://nh.rdcpix.com/4595d526af422743c5235c7537c36b94i-f3654568770od-w1024_h768_x2.webp',
      preview: false
    },
    {
      spotId: 9, 
      url: 'https://nh.rdcpix.com/4595d526af422743c5235c7537c36b94i-f3654568770od-w1024_h768_x2.webp',
      preview: false
    },
    {
      spotId: 9, 
      url: 'https://nh.rdcpix.com/4595d526af422743c5235c7537c36b94i-f3654568770od-w1024_h768_x2.webp',
      preview: false
    }

   ], {})
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages'
    // const sequelize = require('../models')
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      spotId: {[Op.in]: [1,2,3]}
    }, {})
  }
};
