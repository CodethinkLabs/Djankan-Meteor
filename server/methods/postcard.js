//method to post a new card created on the GUI
Meteor.methods({
    postcard: function(card) {
        url = HOST+API+'boards/'+BOARD_ID+'/cards/';
        nextCardNumber++;
        card.header.cardNumber=nextCardNumber;
        try {
            r = HTTP.call("POST",url,{data: card});
        }
        catch (e) {
            console.log(e);
        }
    }
});
