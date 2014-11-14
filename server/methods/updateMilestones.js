// update lanes when they are rearranged
Meteor.methods({
    updateMilestones: function(boardId) {
        url=HOST+API+'boards/'+boardId+'/milestones/';
        try {
            var r = HTTP.call("GET", url);
            var respJson = JSON.parse(r.content)
            Milestones.remove({})
            for(var i=0;i<respJson.length;i++) {
                Milestones.insert(respJson[i]);
            }
        }
        catch (e) {
            console.log("Response issue: url: "+url);
        }
    }
});
