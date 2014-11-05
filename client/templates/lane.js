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
        Meteor.call('postcard',blankCard);
        Meteor.call('getallcards');
    }
}
