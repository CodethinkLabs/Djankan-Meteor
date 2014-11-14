// update lanes when they are rearranged
Meteor.methods({
    updateLanes: function(boardId) {
        url=HOST+API+'boards/'+boardId+'/lanes/';
        try {
            var r = HTTP.call("GET", url);
            var respJson = JSON.parse(r.content)
            respJson.sort(function(obj1, obj2) {
                return obj1.position - obj2.position;
            });
            Lanes.remove({})
            for(var i=0;i<respJson.length;i++) {
                Lanes.insert(respJson[i]);
            }
        }
        catch (e) {
            console.log("Response issue: url: "+url);
        }
    }
});
