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
    }).disableSelection();

    $('ul').sortable({
        handle: '.card_header',
        placeholder: 'card_placeholder',
        connectWith: 'ul',
        update: function(event, ui) {
        },
        stop: function(event, ui) {
            // get card id
            cardId = ui.item.context.id;
            card = Cards.findOne({_id:cardId});
            // get new parent lane
            console.log(ui.item.parent().attr('id'))
            // change card lane attr
            // put card
            // update cards
            initialSortable();
        }
    }).disableSelection();
}

Meteor.startup(function () {
  initialSortable();
});
