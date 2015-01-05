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

Template.archive.helpers({
    archivedCards: function() {
        return Cards.find({archived:true});
    },
    dateArchived: function() {
        return this.modifiedDate.split('T')[0]; 
    },
    assignees: function(cardId) {
        return Assignees.find({card:cardId});
    },
    laneName: function(lane_id) {
        lane = Lanes.findOne({id: lane_id});
        return lane.title;
    },
    bucketName: function(bucket_id) {
        bucket = Buckets.findOne({id: bucket_id});
        return bucket.title;
    },
    milestoneName: function(milestone_id) {
        milestone = Milestones.findOne({id: milestone_id});
        return milestone.title;
    },
    assigneeName: function(assignee_id) {
        assignee = Assignees.findOne({id: assignee_id}).person;
        return Users.findOne({id: assignee}).username;
    }
});

Template.archive.events({
    'click .unarchive': function(e) {
        var card_id = e.currentTarget.id;
        var card = Cards.findOne({_id:card_id});
        var boardId = Session.get('boardId');
        card.archived = false;
        Meteor.call('putcard',
            card_id,
            card.title,
            card.description,
            false,
            card.bucket,
            card.milestone
        );
    }
});
