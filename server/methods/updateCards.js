// when a card is created or edited this is called to refresh the cards
// because it is serverside it refreshes the cards for all clients 
Meteor.methods({
    updateCards: function() {
        url=HOST+API+'boards/'+BOARD_ID+'/cards/';
        try {
            var r = HTTP.call("GET", url);
            var respJson = JSON.parse(r.content)
            for(var i=0;i<respJson.length;i++) {
                gotCard=respJson[i]
                localCard=Cards.findOne({id:gotCard.id})
                // if no correspoding in collection insert it
                if(!localCard)
                    if(!gotCard.archived)
                        Cards.insert(gotCard);
                // else check to see if been archived
                else if(gotCard.archived)
                    Cards.remove(localCard)
                // else check to see if title or description changed
                else if(gotCard.description!=localCard.description || gotCard.title != localCard.title)
                    Cards.update(localCard,gotCard);
            }
        }
        catch (e) {
            console.log("Response issue: url: "+url);
        }
    }
});
