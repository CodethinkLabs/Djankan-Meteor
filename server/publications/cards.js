Meteor.publish('cardsByBoard', function(board_id) {
  return Cards.find({board: board_id});
});
Meteor.publish('cardsByBucket', function(bucket_id) {
  return Cards.find({bucket: bucket_id});
});
Meteor.publish('cardsByMilestone', function(milestone_id) {
  return Cards.find({milestone: milestone_id});
});
