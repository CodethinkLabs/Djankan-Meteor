Meteor.methods({
    putcard: function(card_id,title,description) {
        card = Cards.findOne({_id:card_id});
        ID = card.header.cardNumber;
        card.title=title;
        card.description=description;
        console.log(description)
        delete card['_id'];
        url = HOST+API+'card/'+ID+'/';
        try {
            r = HTTP.call("PUT",url,{data: card});
        }
        catch (e) {
            console.log(e);
        }
    }
});
