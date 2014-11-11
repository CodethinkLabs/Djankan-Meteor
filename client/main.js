function initialSortable() {
    // allow users to pickup and sort lanes
    $('.board').sortable({
        handle: '.lane_header',
        placeholder: 'lane_placeholder',
        helper: 'clone',
        update: function(event, ui) {
            // put lane Ids in an array according to their order on the page
            var laneIds = $(this).sortable('toArray');
            var lanes = Lanes.find({});
            // for each lane id find it's lane in the collection and update it's position
            laneIds.forEach(function (laneId) {
                var lane = Lanes.findOne({_id:laneId});
                var position = laneIds.indexOf(laneId);
                lane.position=position;
                Lanes.update({_id:lane._id},lane);
            });
            Meteor.call('putlanes');
            Meteor.call('updateLanes');
        },
        stop: function(event, ui) {
            initialSortable();
        }
    })

    $('ul').sortable({
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
                // put card
                Meteor.call('changeLane',cardId,newLane.id);
                // update cards
                Meteor.call('updateCards');
            }
            initialSortable();
        }
    })
}

// set the menu to be off by default
Session.set("menu",0);

Template.lane.rendered = function() {
  initialSortable();
};
