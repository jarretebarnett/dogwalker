const sequelize = require('../config/connection');
const { Owner, Comment} = require('../models');

const ownerData = require('./ownerData.json');
//const commentData= require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const owners = await Owner.bulkCreate(ownerData, {
    individualHooks: true,
    returning: true,
  });

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      owner_id: owners[Math.floor(Math.random() * owners.length)].id,
      name: owners[Math.floor(Math.random() * owners.length)].id,
    });
  }
  
    process.exit(0);
  };
  
  seedDatabase();
  
 