Meteor.publish('lanes', function(boardId) {
  return Lanes.find({board:boardId});
});
