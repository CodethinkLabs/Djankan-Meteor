Template.menu_bar.helpers({
    boardName: function() {
        if(Boards.findOne({}))
            return Boards.findOne({}).title;
        else
            return "Kanban";
    }
});

Template.menu_bar.events({
    'click input.add': function() {
        Meteor.call('refreshData');
    }
});
