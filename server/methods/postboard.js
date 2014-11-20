//method to post a new card created on the GUI
Meteor.methods({
    postboard: function(board) {
        url = HOST+API+'boards/';
        try {
            r = HTTP.call("POST",url,{data: board});
        }
        catch (e) {
            console.log(e);
        }
    }
});
