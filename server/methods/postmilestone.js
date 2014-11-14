//method to post a new milestone created on the GUI
Meteor.methods({
    postmilestone: function(milestone,boardId) {
        url = HOST+API+'boards/'+boardId+'/milestones/';
        try {
            r = HTTP.call("POST",url,{data: milestone});
        }
        catch (e) {
            console.log(e);
        }
    }
});
