const owners = [];

// Join user to chat
function ownerJoin(id, name, room) {
  const owner = { id, name, room };

  owners.push(owner);

  return owner;
}

// Get current user
function getCurrentOwner(id) {
  return owners.find(owner => owner.id === id);
}

// User leaves chat
function ownerLeave(id) {
  const index = owners.findIndex(owner => owner.id === id);

  if (index !== -1) {
    return owners.splice(index, 1)[0];
  }
}

// Get room users
function getRoomOwners(room) {
  return owners.filter(owner => owner.room === room);
}

module.exports = {
  ownerJoin,
  getCurrentOwner,
  ownerLeave,
  getRoomOwners
};