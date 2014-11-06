Meteor.methods({
    changeLane: function(card_id,lane) {
        card = Cards.findOne({_id:card_id});
        card.lane=lane;
        ID = card.id;
        delete card['_id'];
        url = HOST+API+'card/'+ID+'/';
        try {
            r = HTTP.call("PUT",url,{data: card});
        }
        catch (e) {
            console.log(card);
            console.log(e);
        }
    }
});
