Meteor.startup(function() {
    Boards.remove({});
    Users.remove({});
    //get boards
    board_url = HOST+API+'boards/';
    getToCollection(board_url,Boards);
    //add active=false
    boards = Boards.find({})
    boards.forEach( function(board) {
        Boards.update(board, {'$set' : {'active' : false }})
        Boards.update(board, {'$set' : {'nextCardNumber' : 0 }})
    });
    //get users
    users_url = HOST+API+'users/';
    getToCollection(users_url,Users);
});
