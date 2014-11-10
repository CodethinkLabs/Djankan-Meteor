// this makes the menu_bar stay fixed when scrolling sideways
$(window).scroll(function(){
    $('.menu_bar').css({
        'left': Math.min($(this).scrollLeft(),$(".board").width() - $(window).width())
    });
});

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
    },
    'click .new_lane_link': function() {
        blankLane = {
            "board": 1,
            "title": "LANE",
            "cardLimit": 0,
            "colour": "blue",
            "lane_role": "NORM",
            "position": 0,
            "inTriageView": false,
            "inKanbanView": true,
            "deletedDate": "2014-11-10T13:35:59.345Z"
        };
        Meteor.call('postlane',blankLane);
        Meteor.call('updateLanes');
    }
});
