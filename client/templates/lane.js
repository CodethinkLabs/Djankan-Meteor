Template.lane.helpers({
    cards: function(mongo_id) {
        laneID = Lanes.findOne({_id: mongo_id}).id;
        return Cards.find({lane: laneID})
    },
    lanetitle: function(mongo_id) {
        title = Lanes.findOne({_id:mongo_id}).title;
        return title;
    }
});
Template.lane.events = {
    "click .add_card_link": function() {
        alert("adding a new card not yet implimented");
    }
}
