// method to put a card when the title description or archive status
// is edited on the GUI
Meteor.methods({
    putcard: function(card_id,title,description,archive,bucket,milestone) {
        card = Cards.findOne({_id:card_id});
        ID = card.id;
        card.title=title;
        card.description=description;
        card.archived=archive;
        // if valid bucket pk given update card bucket
        if(bucket)
            card.bucket=bucket;
        // if zero given set no bucket, if null given keep old bucket
        else if(bucket==0)
            card.bucket=null;
        // if valid milest pk given updatecard milest
        if(milestone)
            card.milestone=milestone;
        // if zero given set no milest, if null given keep old milest
        else if(milestone==0)
            card.milestone=null;
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
