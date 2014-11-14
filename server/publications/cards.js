Meteor.publish('cardsByBoard', function(board_id) {
  return Cards.find({board: board_id});
});
Meteor.publish('cardsByBucket', function(bucket_id) {
  return Cards.find({bucket: bucket_id});
});
Meteor.publish('cardsByMilestone', function(milestone_id) {
  return Cards.find({milestone: milestone_id});
});
Meteor.publish('cards', function(board_id,bucket_id,milestone_id) {
    if(bucket_id==0 && milestone_id==0)
        return Cards.find({board:board_id});
    if(bucket_id==0)
        return Cards.find({milestone:milestone_id});
    if(milestone_id==0)
        return Cards.find({bucket:bucket_id});
    return Cards.find({bucket:bucket_id,milestone:milestone_id});
});
