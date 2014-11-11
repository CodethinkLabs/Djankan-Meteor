// method to put a bucket when the title or description
// is edited on the GUI
Meteor.methods({
    putbucket: function(bucket_id,title,description) {
        var bucket = Buckets.findOne({_id:bucket_id});
        var ID = bucket.id;
        bucket.title=title;
        bucket.description=description;
        delete bucket['_id'];
        var url = HOST+API+'boards/'+BOARD_ID+'/buckets/'+ID+'/';
        try {
            r = HTTP.call("PUT",url,{data: bucket});
        }
        catch (e) {
            console.log(bucket);
            console.log(e);
        }
    }
});
