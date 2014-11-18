Meteor.methods({
    getEventTicked: function(checklist_id) {
        url = HOST+API+"checklist/" + checklist_id + "/tickevent/"
        try {
            var r = HTTP.call("GET", url);
            var respJson = JSON.parse(r.content)
            return respJson.ticked;
        }
        catch (e) {
            console.log(e);
        }
    }
});
