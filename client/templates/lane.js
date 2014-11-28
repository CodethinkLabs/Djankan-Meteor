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

Template.lane.helpers({
    cards: function(mongo_id) {
        laneID = Lanes.findOne({_id: mongo_id}).id;
        return Cards.find({lane: laneID})
    },
    lanetitle: function(mongo_id) {
        title = Lanes.findOne({_id:mongo_id}).title;
        return title;
    },
    laneposition: function(mongo_id) {
        position = Lanes.findOne({_id:mongo_id}).position;
        return position;
    },
    edit: function(_id) {
        if(Session.get("edit")==_id)
            return true;
        return false;
    }
});
Template.lane.events = {
    "click .add_card_link": function() {
        id = this.id
        //put a new card header and blank card then get
        blankCard = {
            "header": {
                "cardNumber": 0,
                "createDate": "2014-11-05T11:49:38.077Z", 
                 "creator": 1
            }, 
            "lane": id,
            "milestone": null, 
            "bucket": null, 
            "title": "Title", 
            "description": "Description", 
            "dueDate": "2014-11-05T13:20:16Z", 
            "timeEstimate": 1, 
            "result": "", 
            "modifiedDate": "2014-11-05T13:38:52.905Z", 
            "archived": false, 
            "position": 1, 
            "lastUser": 1, 
            "supersededBy": null
        };
        boardId = Session.get('boardId');
        Meteor.call('postcard',blankCard,boardId);
        Meteor.call('updateCards',boardId);
    },
    "click .edit_lane": function() {
        Session.set("edit",this._id);
    },
    "click .save_lane_edit": function() {
        var boardId = Session.get('boardId');
        _id=this._id
        title = $('#'+_id).find('textarea[name="title"]').val();
        Meteor.call("putlane",_id,title);
        Session.set("edit",0);
        Meteor.call("updateLanes",boardId);
    }
}
