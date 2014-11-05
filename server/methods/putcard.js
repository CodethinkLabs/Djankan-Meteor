Meteor.methods({
    putcard: function(card_id,title,description,archive) {
        card = Cards.findOne({_id:card_id});
        ID = card.id;
        card.title=title;
        card.description=description;
        card.archived=archive;
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
