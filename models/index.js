const Owner = require('./Owner');
const Request = require('./Request');
const Comment = require('./Comment')

Owner.hasMany(Comment, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Owner, {
  foreignKey: 'owner_id'
});



module.exports = { Owner, Request, Comment };

