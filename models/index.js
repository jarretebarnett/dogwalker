const Owner = require('./Owner');
const Request = require('./Request');
const Comment = require('./Comment')

Owner.hasMany(Request, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE'
});

Request.belongsTo(Owner, {
  foreignKey: 'owner_id'
});

Owner.hasMany(Comment, {
  foreignKey: 'owner_id'
});

Comment.belongsTo(Owner, {
  foreignKey: 'owner_id'
});

Request.hasMany(Comment, {
  foreignKey: 'post_id',
  allowNull: true
});

Comment.belongsTo(Request, {
  foreignKey: 'post_id',
});

module.exports = { Owner, Request, Comment };

