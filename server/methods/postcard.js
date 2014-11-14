//method to post a new card created on the GUI
Meteor.methods({
    postcard: function(card,boardId) {
        var board = Boards.findOne({id:boardId})
        var url = HOST+API+'boards/'+boardId+'/cards/';
        var nextCardNumber = ++board.nextCardNumber;
        Boards.update({id:boardId},{ '$set': {'nextCardNumber':nextCardNumber}});
        card.header.cardNumber=nextCardNumber;
        try {
            var r = HTTP.call("POST",url,{data: card});
        }
        catch (e) {
            console.log(e);
        }
    }
});
