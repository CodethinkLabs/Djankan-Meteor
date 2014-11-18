// method to put a lane when the title is edited on the GUI
Meteor.methods({
    putlane: function(lane_id,title) {
        lane = Lanes.findOne({_id:lane_id});
        ID = lane.id;
        lane.title=title;
        delete lane['_id'];
        url = HOST+API+'boards/'+BOARD_ID+'/lanes/'+ID+'/';
        try {
            r = HTTP.call("PUT",url,{data: lane});
        }
        catch (e) {
            console.log(lane);
            console.log(e);
        }
    }
});
