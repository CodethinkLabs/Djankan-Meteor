// update lanes when they are rearranged
Meteor.methods({
    updateBuckets: function() {
        url=HOST+API+'boards/'+BOARD_ID+'/buckets/';
        try {
            var r = HTTP.call("GET", url);
            var respJson = JSON.parse(r.content)
            Buckets.remove({})
            for(var i=0;i<respJson.length;i++) {
                Buckets.insert(respJson[i]);
            }
        }
        catch (e) {
            console.log("Response issue: url: "+url);
        }
    }
});
