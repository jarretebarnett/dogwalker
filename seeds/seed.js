const sequelize = require('../config/connection');
const Owner = require('../models/Owner');
const ownerData = require('./ownerData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Owner.bulkCreate(ownerData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();



/*const sequelize = require('../config/connection');
const { Owner, Request} = require('../models');

const ownerData = require('./ownerData.json');
const ??= require('./??.json');
const ?? = require('./??.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const owners = await Owner.bulkCreate(ownerData, {
    individualHooks: true,
    returning: true,
  });
  for (const request of ownerData) {
    await Request.create({
      ...request,
      owner_id: owners[Math.floor(Math.random() * owners.length)].id,
    });
  }
    
process.exit(0);
};

seedDatabase();*/
