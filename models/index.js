const Owner = require('./Owner');
const Message = require('./Message');
const Comment = require('./Comment')

Owner.hasMany(Message, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE'
});

Message.belongsTo(Owner, {
  foreignKey: 'owner_id'
});

Owner.hasMany(Comment, {
  foreignKey: 'owner_id'
});

Comment.belongsTo(Owner, {
  foreignKey: 'owner_id'
});

Message.hasMany(Comment, {
  foreignKey: 'post_id',
  allowNull: true
});

Comment.belongsTo(Message, {
  foreignKey: 'post_id',
});

module.exports = { Owner, Message, Comment };

