Template.milestone_filter.helpers({
    milestones: Milestones.find({})
});

Template.milestone_filter.events({
    'change select': function(evt) {
        var ID = parseInt($(evt.target).val())
        if (ID > 0)
            Session.set('milestoneId', ID);
        else
            Session.set('milestoneId', 0);
        updateCardSub();
    }
});
