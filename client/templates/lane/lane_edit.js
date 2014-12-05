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

Template.lane_edit.helpers({
    lanetitle: function(mongo_id) {
        title = Lanes.findOne({_id:mongo_id}).title;
        return title;
    },

    checkedInTriage: function(mongo_id) {
        var lane = Lanes.findOne({_id:mongo_id});
        if(lane.inTriageView)
            return "checked";
        return "";
    },

    checkedInKanban: function(mongo_id) {
        var lane = Lanes.findOne({_id:mongo_id});
        if(lane.inKanbanView)
            return "checked";
        return "";
    }
});

Template.lane_edit.events = {
    "click .save_lane_edit": function() {
        var boardId = Session.get('boardId');
        var _id=this._id
        var title = $('#'+_id).find('textarea[name="title"]').val();
        var inTriageView = $('#inTriageCheck').prop('checked');
        var inKanbanView = $('#inKanbanCheck').prop('checked');
        Meteor.call("putlane",_id,title,inTriageView,inKanbanView);
        Session.set("edit",0);
        Meteor.call("updateLanes",boardId);
    },

    "click .delete_lane": function() {
        var boardId = Session.get('boardId');
        var id=this.id
        Meteor.call("deleteLane",id);
        Session.set("edit",0);
        Meteor.call("updateLanes",boardId);
    }
}
