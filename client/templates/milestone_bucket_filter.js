Template.milestone_bucket_filter.helpers({
    milestones: Filters.find({type: "Milestone"}),
    buckets: Filters.find({type: "Bucket"})
});

Template.milestone_bucket_filter.events({
    'change select': function(evt) {
        var ID = parseInt($(evt.target).val())
        if (ID >= 0) {
            var filter = Filters.findOne({id: ID});
            Session.set('currentFilter', filter);
        }
        else {
            Session.set('currentFilter', null);
        }
    }
});
