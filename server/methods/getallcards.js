Meteor.methods({
    getallcards: function() {
        Cards.remove({});
        url=HOST+API+'boards/'+BOARD_ID+'/cards/';
        try {
            var r = HTTP.call("GET", url);
            var respJson = JSON.parse(r.content)
            for(var i=0;i<respJson.length;i++) {
                if(!respJson[i].archived)
                    Cards.insert(respJson[i]);
            }
        }
        catch (e) {
            console.log("Response issue: url: "+url);
        }
    }
});
