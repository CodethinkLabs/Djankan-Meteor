Meteor.publish('buckets', function(board_id) {
  return Buckets.find({board: board_id});
});
