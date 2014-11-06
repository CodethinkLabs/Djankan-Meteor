// method to put a card when the title description or archive status
// is edited on the GUI
Meteor.methods({
    putlanes: function() {
        lanes=Lanes.find({});
        lanes.forEach(function (lane) {
            ID = lane.id;
            url = HOST+API+'boards/'+BOARD_ID+'/lanes/'+ID+'/';
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
