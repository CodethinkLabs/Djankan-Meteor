Meteor.publish('allUsers', function(board_id) {
  return Users.find({});
});

Meteor.publish('permittedUsers', function(board_id) {
    permissions = Permissions.find({board:board_id});
    var permittedUserIDs = new Array();
    // make array of each user with permission for this board
    permissions.forEach(function(permission) {
        var id = permission.user;
        if(!$.inArray(id, permittedUserIds))
            permittedUserIds.push(id);
    });
    return Users.find({id: {$in: permittedUserIds}});
});

