//method to post a new milestone created on the GUI
Meteor.methods({
    postmilestone: function(milestone) {
        url = HOST+API+'boards/'+BOARD_ID+'/milestones/';
        try {
            r = HTTP.call("POST",url,{data: milestone});
        }
        catch (e) {
            console.log(e);
        }
    }
});
