Meteor.methods({
    updateAssignees: function(card_mongo_id) {
        card = Cards.findOne({_id: card_mongo_id});
        url = HOST+API+'card/'+ card.id +'/assignees/';
        try {
            var r = HTTP.call("GET", url);
            var respJson = JSON.parse(r.content);
            for(var i=0;i<respJson.length;i++) {
                gotAssignee=respJson[i];
                localAssignee=Assignees.findOne({id: gotAssignee.id});
                if (!localAssignee) {
                    Assignees.insert(gotAssignee);
                }
            }
        }
        catch (e) {
            console.log("Response issue: url: "+url);
        }
    }
});
