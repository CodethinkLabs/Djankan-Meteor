// set left of menu_bar to be left of screen
$(window).scroll(function(){
    var leftBound = $(window).width()/2 - 300;
    var rightBound = leftBound+$(".board").width()-$(window).width();
    var leftEdge = $(this).scrollLeft()+leftBound;
    $('.menu_content').css({
        'left': Math.max(leftBound,Math.min(leftEdge,rightBound))
    });
});

$( window ).resize(function() {
    var leftBound = $(window).width()/2 - 300;
    var rightBound = leftBound+$(".board").width()-$(window).width();
    var leftEdge = $(this).scrollLeft()+leftBound;
    $('.menu_content').css({
        'left': Math.max(leftBound,Math.min(leftEdge,rightBound))
    });
});

Template.menu_content.helpers({
    leftEdge: function() {
        return $(window).width()/2 - 300;
    },
    edit: function() {
        if(Session.get("menu_edit"))
            return true;
        return false;
    },
    items: function(kind) {
        if(kind == "bucket")
            return Buckets.find({});
        return Milestones.find({});
    },
    itemEdit: function(kind) {
        _id = Session.get("menu_edit");
        if(kind == "bucket") 
            return Buckets.findOne({_id:_id});
        else if(kind == "board") {
            blankBoard = {
                "title": "Title", 
                "createDate": "2014-11-14T16:46:11.543Z", 
                "archived": false, 
                "description": "description"
            };
            Session.set("tempBoard",blankBoard);
            return blankBoard;
        }
        return Milestones.findOne({_id:_id});
    },
    isMilestone: function(kind) {
        if(kind == "bucket")
            return false;
        return true;
    }
});

Template.menu_content.events({
    "click .close": function() {
        Session.set("menu",0);
    },
    "click .edit": function() {
        Session.set("menu_edit",this._id);
    },
    "click .discard": function() {
        Session.set("menu_edit",0);
    },
    "click .save": function() {
        kind=Session.get("menu");
        title = $('.editor').find('textarea[name="title"]').val();
        descr = $('.editor').find('textarea[name="descr"]').val();
        if(kind=="bucket") {
            var boardId=Session.get("boardId");
            Meteor.call("putbucket",boardId,this._id,title,descr);
            Meteor.call("updateBuckets",boardId);
            Session.set("menu_edit",0);
        }
        else if(kind=="board") {
            var board = Session.get("tempBoard");
            board.title = title;
            board.description = descr;
            Meteor.call("postboard",board);
            delete Session.keys["tempBoard"];
            Meteor.call('refreshAllBoards');
            Session.set("menu",0);
        }
        else {
            var boardId = Session.get("boardId");
            Meteor.call("putmilestone",boardId,this._id,title,descr);
            Meteor.call("updateMilestones",boardId);
            Session.set("menu_edit",0);
        } 
    },
        
    "click .new": function() {
        kind = this.kind;
        boardId=Session.get("boardId");
        if(kind=="bucket") {
            blankBucket = {
                "board": boardId, 
                "title": "New Bucket", 
                "colour": "blue", 
                "description": "description"
            }
            Meteor.call("postbucket",blankBucket,boardId);
            Meteor.call("updateBuckets",boardId);
        }
        else {
            blankMilestone = {
                "board": boardId,
                "title": "New Milestone", 
                "dueDate": "2014-11-10T09:16:29Z", 
                "colour": "red", 
                "description": "description"
            };
            Meteor.call("postmilestone",blankMilestone,boardId);
            Meteor.call("updateMilestones",boardId);
        }
    }
});
