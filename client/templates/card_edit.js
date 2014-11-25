/*The MIT License (MIT)

Copyright (c) 2013 Andy Dai
Copyright (c) 2014 Codethink

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

flag = 0;

Template.card_edit.events = {
    "click .save_card_edit": function () {
        var boardId = Session.get('boardId');
        var _id = this._id
        var title = $('#'+_id).find('textarea[name="title"]').val();
        var descr = $('#'+_id).find('textarea[name="descr"]').val();
        var archived = $('#'+_id+'archive').is(':checked');
        /* if bucket has been changed get pk else this is null and
        bucket remains the same. takes 0 for remove from bucket */
        var bucket = Session.get('tempBucket');
        // remove temp session variable as no longer needed
        delete Session.keys['tempBucket'];
        var milestone = Session.get('tempMilestone');
        delete Session.keys['tempMilestone'];
        Meteor.call('putcard',_id,title,descr,archived,bucket,milestone);
        Meteor.call('updateCards',boardId);
        // when edit set to 0 in session card_edit template is removed
        // and card_content rendered
        Session.set("edit",0);
    },
    "click .discard_card_edit": function () {
        // remove temp session variables
        delete Session.keys['tempBucket'];
        delete Session.keys['tempMilestone'];
        // set no card being edited
        Session.set("edit",0);
    },
    "click .add_assignee": function () {
        var card_mongo_id = this._id;
        var card_id = Cards.findOne({_id: card_mongo_id}).id;
        var selectBox = document.getElementById("assignee_picker");
        var selectValue = selectBox.options[selectBox.selectedIndex].value;
        Meteor.call('postAssignee', card_mongo_id, selectValue);
        Meteor.call('updateAssignees', card_id);
    },
    "click .remove_assignee_link": function (e) {
        var assignee_id = parseInt(e.currentTarget.id);
        var card_id = Assignees.findOne({id: assignee_id}).card;
        Meteor.call('deleteAssignee', assignee_id);
        Meteor.call('updateAssignees', card_id);
    },
    "change .bucket_picker": function(evt) {
        /*  put the bucket in a temporary session var so that the data
            is not PUT until the user clicks save, this variable is
            removed on clicking save or delete */
        var bucketId = parseInt($(evt.target).val());
        Session.set('tempBucket',bucketId);
    },
    "change .milestone_picker": function(evt) {
        /*  put the milest in a temporary session var so that the data
            is not PUT until the user clicks save, this variable is
            removed on clicking save or delete */
        var milestoneId = parseInt($(evt.target).val());
        Session.set('tempMilestone',milestoneId);
    }
}

Template.card_edit.helpers({
    users: function (cardId) {
        var users = Users.find({});
        var toReturn = new Array;
        // take only users not already assigned to card
        users.forEach(function(user) {
            if(!Assignees.findOne({person:user.id,card:cardId}))
                toReturn.push(user);
        });
        return toReturn;
    },
    assignees: function(cardId) {
        return Assignees.find({card:cardId});
    },
    assigneeName: function(assignee_id) {
        assignee = Assignees.findOne({id: assignee_id}).person;
        return Users.findOne({id: assignee}).username;
    },
    getAssigneeColor: function() {
        if (flag) {
            flag = 0;
            return "#FCDAC0";
        }
        flag = 1;
        return "#FCCEAA";
    },
    buckets: function() {
        return Buckets.find({});
    },
    milestones: function() {
        return Milestones.find({}); 
    },
    selectMyBucket: function(cardId,bucketId) {
        card = Cards.findOne({id:cardId});
        if(card.bucket == bucketId)
            return "selected";
    },
    selectMyMilestone: function(cardId,milestoneId) {
        card = Cards.findOne({id:cardId});
        if(card.milestone == milestoneId)
            return "selected";
    }
});
