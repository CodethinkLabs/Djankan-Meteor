//method to post a new card created on the GUI
Meteor.methods({
    postlane: function(boardId,lane) {
        console.log(boardId);
        url = HOST+API+'boards/'+boardId+'/lanes/';
        try {
            r = HTTP.call("POST",url,{data: lane});
        }
        catch (e) {
            console.log(e);
        }
    }
});
