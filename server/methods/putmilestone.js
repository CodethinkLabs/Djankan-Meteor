// method to put a milestone when the title or description
// is edited on the GUI
Meteor.methods({
    putmilestone: function(milestone_id,title,description) {
        var milestone = Milestones.findOne({_id:milestone_id});
        var ID = milestone.id;
        milestone.title=title;
        milestone.description=description;
        delete milestone['_id'];
        var url = HOST+API+'boards/'+BOARD_ID+'/milestones/'+ID+'/';
        try {
            r = HTTP.call("PUT",url,{data: milestone});
        }
        catch (e) {
            console.log(milestone);
            console.log(e);
        }
    }
});
