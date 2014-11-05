function boardToCollection(url,Collection) {
    try {
        var r = HTTP.call("GET", url);
        Collection.insert(JSON.parse(r.content));
    }
    catch (e) {
        console.log("Response issue: url: "+url);
    }
}

function getToCollection(url,Collection) {
    try {
        var r = HTTP.call("GET", url);
        var respJson = JSON.parse(r.content)
        for(var i=0;i<respJson.length;i++) {
            Collection.insert(respJson[i])
        }
    }
    catch (e) {
        console.log("Response issue: url: "+url);
    } 
}

Meteor.startup(function() {
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

    getToCollection(users_url,Users);
    boardToCollection(board_url,Boards);
    getToCollection(lanes_url,Lanes);
    getToCollection(cards_url,Cards);
    cards = Cards.find({});
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
