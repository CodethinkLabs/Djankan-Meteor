Meteor.methods({
    refreshAllBoards: function(boardId) {
        Boards.remove({});
        board_url = HOST+API+'boards/';
        getToCollection(board_url,Boards);
        //add active=false
        boards = Boards.find({})
        boards.forEach( function(board) {
        Boards.update(board, {'$set' : {'active' : false }})
        Boards.update(board, {'$set' : {'nextCardNumber' : 0 }})
    });

    }
});
