Meteor.publish('boards', function() {
  return Boards.find({archived:false});
});
