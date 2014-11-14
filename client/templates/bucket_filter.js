Template.bucket_filter.helpers({
    buckets: Buckets.find({})
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
