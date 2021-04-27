const Owner = require('./Owner');
const Request = require('./Request');

Owner.hasMany(Request, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE'
});

Request.belongsTo(Owner, {
  foreignKey: 'owner_id'
});

module.exports = { Owner, Request };