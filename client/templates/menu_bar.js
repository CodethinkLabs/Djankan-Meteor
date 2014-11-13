// set left of menu_bar to be left of screen
$(window).scroll(function(){
    var leftEdge = $(this).scrollLeft();
    var rightBound = $(".board").width()-$(window).width();
    var leftBound = 0;
    $('.menu_bar').css({
        'left': Math.max(leftBound,Math.min(leftEdge,rightBound))
    });
});

Template.menu_bar.helpers({
    boardName: function() {
        boardId = Session.get('boardId');
        if(boardId)
            return Boards.findOne({id:boardId}).title;
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
    },
    'click .buckets': function() {
        Session.set('menu_edit',0);
        Session.set('menu','bucket');
    },
    'click .milestones': function() {
        Session.set('menu_edit',0);
        Session.set('menu','milestone');
    }
});
