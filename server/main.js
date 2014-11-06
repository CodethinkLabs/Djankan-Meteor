// get the board corresponding to BOARD_ID in config.js and store it in
// the collection Board
function boardToCollection(url,Collection) {
    try {
        var r = HTTP.call("GET", url);
        Collection.insert(JSON.parse(r.content));
    }
    catch (e) {
        console.log("Response issue: url: "+url);
    }
}
// get all of a given model from the board and out each one into its collection
function getToCollection(url,Collection) {
    try {
        var r = HTTP.call("GET", url);
        var respJson = JSON.parse(r.content)
        for(var i=0;i<respJson.length;i++) {
            if(!respJson[i].archived)
                Collection.insert(respJson[i])
        }
    }
    catch (e) {
        console.log("Response issue: url: "+url);
    } 
}

function lanesToCollection(url,Collection) {
    try {
        var r = HTTP.call("GET", url);
        var respJson = JSON.parse(r.content)
        respJson.sort(function(obj1, obj2) {
            return obj1.position - obj2.position;
});
        for(var i=0;i<respJson.length;i++) {
            Collection.insert(respJson[i])
        }
    }
    catch (e) {
        console.log("Response issue: url: "+url);
    }
}


Meteor.startup(function() {
    // clear all data from previous instance to stop
    Boards.remove({});
    Lanes.remove({});
    Cards.remove({});
    Checklists.remove({});
    Assignees.remove({});
    Users.remove({});
    users_url = HOST+API+'users/';
    board_url = HOST+API+'boards/'+BOARD_ID+'/';
    lanes_url = board_url+'lanes/';
    cards_url = board_url+'cards/';
    // get fresh data
    getToCollection(users_url,Users);
    boardToCollection(board_url,Boards);
    lanesToCollection(lanes_url,Lanes);
    getToCollection(cards_url,Cards);
    // get assignees and checklists for each card in board
    cards = Cards.find({});
    // keep track of the highest cardNumber for making new cards
    nextCardNumber=0;
    cards.forEach(function (card) {
        card_id = card.header.cardNumber;
        if( card_id > nextCardNumber)
            nextCardNumber=card_id;
        checklist_url = HOST+API+'card/'+card_id+'/checklists/';
        assignees_url = HOST+API+'card/'+card_id+'/assignees/';
        getToCollection(checklist_url,Checklists);
        getToCollection(assignees_url,Assignees);
    });
});
