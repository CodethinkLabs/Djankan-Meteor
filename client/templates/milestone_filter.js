Template.milestone_filter.helpers({
    milestones: Milestones.find({}),
    selectCurrent: function(id) {
        if(Session.get("milestoneId")==id)
            return 'selected';
    } 
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