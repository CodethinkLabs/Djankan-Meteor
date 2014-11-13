Meteor.publish('lanes', function(board_id) {
  return Lanes.find({board:board_id});
});
