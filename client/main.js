/*
The MIT License (MIT)

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

function initialSortable() {
    // allow users to pickup and sort lanes
    $('.board').sortable({
        handle: '.lane_header',
        placeholder: 'lane_placeholder',
        helper: 'clone',
        update: function(event, ui) {
            // put lane Ids in an array according to their order on the page
            var boardId = Session.get('boardId');
            var laneIds = $(this).sortable('toArray');
            console.log($(this).sortable('toArray'))
            var lanes = Lanes.find({});
            // for each lane id find it's lane in the collection and update it's position
            laneIds.forEach(function (laneId) {
                if(laneId) {
                    var lane = Lanes.findOne({_id:laneId});
                    var position = laneIds.indexOf(laneId);
                    lane.position=position;
                    Lanes.update({_id:lane._id},lane);
                }
            });
            Meteor.call('putlanes',boardId);
            Meteor.call('updateLanes',boardId);
        },
        stop: function(event, ui) {
            initialSortable();
        }
    })

    $('.list-area').sortable({
        handle: '.card_header',
        placeholder: 'card_placeholder',
        connectWith: 'ul',
        update: function(event, ui) {
        },
        stop: function(event, ui) {
            // get card id
            var cardId = ui.item.context.id;
            var card = Cards.findOne({_id:cardId});
            // get new parent lane
            var newLaneId = ui.item.parent().attr('id');
            var newLane = Lanes.findOne({_id:newLaneId});
            // change card lane attr
            if(newLane.id!=card.lane){
                var boardId = Session.get('boardId');
                // put card
                Meteor.call('changeLane',cardId,newLane.id);
                // update cards
                Meteor.call('updateCards',boardId);
            }
            initialSortable();
        }
    })
}
// set the board/milestones menu to be off by default
Session.set('menu',0);
Session.set('boardId',0);
Session.set('userId',0);
Session.set('bucketId',0);
Session.set('milestoneId',0);
Session.set('view','kanban');

Meteor.subscribe('boards', function() {
});
Meteor.subscribe('allUserProfiles', function() {
});

Template.lane.rendered = function() {
  initialSortable();
};
