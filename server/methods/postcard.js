Meteor.methods({
    putcard: function(card_id,title,description) {
        ID = Cards.findOne({_id:card_id}).header.cardNumber;
        content = {'title':title,'description':description}
        url = HOST+API+'card/'+ID+'/';
        try {
            r = HTTP.call("PUT",url,content);
        }
        catch (e) {
            console.log(e);
            console.log(url)
        }
    }
});
