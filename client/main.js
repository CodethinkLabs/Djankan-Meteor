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
            var lanes = Lanes.find({});
            // for each lane id find it's lane in the collection and update it's position
            laneIds.forEach(function (laneId) {
                var lane = Lanes.findOne({_id:laneId});
                var position = laneIds.indexOf(laneId);
                lane.position=position;
                Lanes.update({_id:lane._id},lane);
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
Session.set('bucketId',0);
Session.set('milestoneId',0);

Meteor.subscribe('boards', function() {
});
Meteor.subscribe('allUsers', function() {
});

Template.lane.rendered = function() {
  initialSortable();
};
