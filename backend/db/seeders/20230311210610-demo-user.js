'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {   
        email: 'demo@user.io',
        firstName: 'demo',
        lastName: 'user',
        userName: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: 'user',
        lastName: 'fake',
        userName: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        userName: 'FakeUser2',
        firstName: 'user2',
        lastName: 'fake2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user3@user.io',
        userName: 'FakeUser3',
        firstName: 'user3',
        lastName: 'fake3',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'user4@user.io',
        userName: 'FakeUser4',
        firstName: 'user4',
        lastName: 'fake4',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'user5@user.io',
        userName: 'FakeUser5',
        firstName: 'user5',
        lastName: 'fake5',
        hashedPassword: bcrypt.hashSync('password6')
      }

      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser4', 'FakeUser3', 'FakeUser5'] }
    }, {});
  }
};