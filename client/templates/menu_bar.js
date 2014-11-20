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
        var boardId = Session.get('boardId');
        if(boardId)
            return Boards.findOne({id:boardId}).title;
        else
            return "Kanban";
    },
    onBoard: function() {
        if(Session.get('boardId'))
            return true;
        return false;
    }
});

Template.menu_bar.events({
    'click input.refreshBoard': function() {
        var boardId = Session.get('boardId');
        Meteor.call('GETBoard',boardId);
    },
    'click input.refreshAllBoards': function() {
        Meteor.call('refreshAllBoards');
    },
    'click .new_lane_link': function() {
        boardId = Session.get("boardId");
        console.log(boardId);
        blankLane = {
            "board": boardId,
            "title": "LANE",
            "cardLimit": 0,
            "colour": "blue",
            "lane_role": "NORM",
            "position": 0,
            "inTriageView": false,
            "inKanbanView": true,
            "deletedDate": "2014-11-10T13:35:59.345Z"
        };
        Meteor.call('postlane',boardId,blankLane);
        Meteor.call('updateLanes',boardId);
    },
    'click .buckets': function() {
        Session.set('menu_edit',0);
        Session.set('menu','bucket');
    },
    'click .milestones': function() {
        Session.set('menu_edit',0);
        Session.set('menu','milestone');
    },
    'click .newBoard': function() {
        Session.set('menu_edit',1);
        Session.set('menu','board');
    }
});
