//method to post a new bucket created on the GUI
Meteor.methods({
    postbucket: function(bucket) {
        url = HOST+API+'boards/'+BOARD_ID+'/buckets/';
        try {
            r = HTTP.call("POST",url,{data: bucket});
        }
        catch (e) {
            console.log(e);
        }
    }
});
