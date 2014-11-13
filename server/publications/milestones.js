Meteor.publish('milestones', function(board_id) {
  return Milestones.find({board: board_id});
});
