
$(window).scroll(function(){
    var leftMargin = $(window).width()/2 - 300;
    $('.menu_content').css({
        'left': Math.min($(this).scrollLeft() + leftMargin,$(".board").width() - $(window).width() + leftMargin)
    });
});

$( window ).resize(function() {
    var leftMargin = $(window).width()/2 - 300;
    $('.menu_content').css({
        'left': Math.min($(this).scrollLeft() + leftMargin,$(".board").width() - $(window).width() + leftMargin)
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
            console.log(this._id)
            console.log(this)
            Meteor.call("putbucket",this._id,title,descr);
            Meteor.call("updateBuckets");
            Session.set("menu_edit",0);
        }
        else {
            Meteor.call("putmilestone",this._id,title,descr);
            Meteor.call("updateMilestones");
            Session.set("menu_edit",0);
        } 
    },
        
    "click .new": function() {
        kind = this.kind;
        if(kind=="bucket") {
            blankBucket = {
                "board": 1, 
                "title": "New Bucket", 
                "colour": "blue", 
                "description": "description"
            }
            Meteor.call("postbucket",blankBucket);
            Meteor.call("updateBuckets");
        }
        else {
            blankMilestone = {
                "board": 1,
                "title": "New Milestone", 
                "dueDate": "2014-11-10T09:16:29Z", 
                "colour": "red", 
                "description": "description"
            };
            Meteor.call("postmilestone",blankMilestone);
            Meteor.call("updateMilestones");
        }
    }
});