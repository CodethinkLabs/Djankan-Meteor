Template.bucket_filter.helpers({
    buckets: Buckets.find({}),
    selectCurrent: function(id) {
        if(Session.get("bucketId")==id)
            return 'selected';
    } 
});

Template.bucket_filter.events({
    'change select': function(evt) {
        var ID = parseInt($(evt.target).val())
        if (ID > 0)
            Session.set('bucketId', ID);
        else
            Session.set('bucketId', 0);
        updateCardSub();
    }
});
