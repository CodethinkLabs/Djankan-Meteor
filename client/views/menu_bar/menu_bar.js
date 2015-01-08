/*The MIT License (MIT)

Copyright (c) 2013 Andy Dai
Copyright (c) 2014 Codethink Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

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
    isBoardView: function() {
        if(Session.get('boardId'))
            return true;
        return false;
    },
    isNarrowBrowser: function() {
        if( $(window).width() < 1412 )
            return true
        return false
    }
});

Template.boardMenuBar.helpers({
    boardName: function() {
        var boardId = Session.get('boardId');
        if(boardId)
            return Boards.findOne({id:boardId}).title;
        else
            return "Kanban";
    },
    isOptionTheCurrentView: function(option) {
        currentView = Session.get('view');
        if(option == currentView)
            return 'selected';
    },
    isBoardView: function() {
        if(Session.get('boardId'))
            return true;
        return false;
    },
});
Template.menu_bar.events({
    'click #dashLink': function() {
        Session.set('boardId',0);
    }
});
Template.boardMenuBar.events({
    'click input.refreshBoard': function() {
        var boardId = Session.get('boardId');
        Meteor.call('GETBoard',boardId);
    },
    'click .new_lane_link': function() {
        boardId = Session.get("boardId");
        view = Session.get("view");
        if(view == 'triage')
            inTriage = true;
        else
            inTriage = false;
        blankLane = {
            "board": boardId,
            "title": "LANE",
            "cardLimit": 0,
            "colour": "blue",
            "lane_role": "NORM",
            "position": 0,
            "inTriageView": inTriage,
            "inKanbanView": !inTriage,
            "deletedDate": "2014-11-10T13:35:59.345Z"
        };
        Meteor.call('postlane',boardId,blankLane);
        Meteor.call('updateLanes',boardId, function() {
            var winWidth = $(window).width();
            var laneNum = Lanes.find().count();
            Session.set('laneWidth',Math.max(300, Math.floor(winWidth/laneNum)-12));
        });
    },
    'click .buckets': function() {
        Session.set('menu_edit',0);
        Session.set('menu','bucket');
    },
    'click .milestones': function() {
        Session.set('menu_edit',0);
        Session.set('menu','milestone');
    },
    'change #setBoardView': function(evt) {
        console.log('setboardview')
        var view = $(evt.target).val();
        Session.set("view",view);
        if(view == 'archive'){
            updateCardSub(archived=true);
        }
        else {
            updateLaneSub();
            updateCardSub(archived=false);
        }
    }
});

Template.dashMenuBar.events({
    'click input.refreshAllBoards': function() {
        Meteor.call('refreshAllBoards');
    },
    'click .newBoard': function() {
        Session.set('menu_edit',1);
        Session.set('menu','board');
    }
});
