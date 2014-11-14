// method to put a card when the title description or archive status
// is edited on the GUI
Meteor.methods({
    putlanes: function(boardId) {
        lanes=Lanes.find({board:boardId});
        lanes.forEach(function (lane) {
            ID = lane.id;
            url = HOST+API+'boards/'+boardId+'/lanes/'+ID+'/';
            try {
                r = HTTP.call("PUT",url,{data: lane});
            }
            catch (e) {
                console.log(card);
                console.log(e);
            }
        });
    }
});
