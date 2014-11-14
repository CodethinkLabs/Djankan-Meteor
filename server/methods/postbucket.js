//method to post a new bucket created on the GUI
Meteor.methods({
    postbucket: function(bucket,boardId) {
        url = HOST+API+'boards/'+boardId+'/buckets/';
        try {
            r = HTTP.call("POST",url,{data: bucket});
        }
        catch (e) {
            console.log(e);
        }
    }
});
