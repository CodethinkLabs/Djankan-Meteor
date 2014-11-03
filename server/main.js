function getToCollection(url,Collection) {
    try {
        var r = HTTP.call("GET", url);
        Collection.remove({});
        var respJson = JSON.parse(r.content)
        for(var i=0;i<respJson.length;i++) {
            Collection.insert(respJson[i])
        }
    }
    catch (e) {
        console.log("Response issue: ",e.Error);
    } 
}

Meteor.startup(function() {
    board_url = HOST+API+'boards/'+BOARD_ID;
    lanes_url = board_url+'lanes/';
    cards_url = board_url+'cards/';

    getToCollection(board_url,Boards);
    getToCollection(lanes_url,Lanes);
    getToCollection(cards_url,Cards);
    
    for (var i=0;i<Cards.find({}).count();i++) {
});
