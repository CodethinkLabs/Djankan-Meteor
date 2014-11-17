Meteor.methods({
    GETBoard: function(boardId) {
        var board = Boards.findOne({id:boardId});
        // if board has been activated do nothing
        if(board.active)
            return;
        // remove old data
        Lanes.remove({board:boardId});
        Cards.remove({board:boardId});
        Buckets.remove({board:boardId});
        Milestones.remove({board:boardId});
        var users_url = HOST+API+'users/';
        var board_url = HOST+API+'boards/'+boardId+'/';
        var lanes_url = board_url+'lanes/';
        var cards_url = board_url+'cards/?archived=false';
        var buckets_url = board_url+'buckets/';
        var milestones_url = board_url+'milestones/';
        sortToCollection(lanes_url,Lanes);
        sortToCollection(cards_url,Cards);
        getToCollection(buckets_url,Buckets);
        getToCollection(milestones_url,Milestones);
        // get assignees and checklists for each card in board
        var cards = Cards.find({board:boardId});
        // keep track of the highest cardNumber for making new cards
        var nextCardNumber=0;
        cards.forEach(function (card) {
            var cardNumber = card.header.cardNumber;
            if( cardNumber > nextCardNumber) {
                nextCardNumber=cardNumber;
            }
            var checklist_url = HOST+API+'card/'+card.id+'/checklists/';
            var assignees_url = HOST+API+'card/'+card.id+'/assignees/';
            Assignees.remove({card:card.id});
            Checklists.remove({card:card.id});
            getToCollection(checklist_url,Checklists);
            getToCollection(assignees_url,Assignees);
            checkListItems = Checklists.find({})
            checkListItems.forEach( function(checkListItem) {
                var ticked = Meteor.call('getEventTicked', checkListItem.id);
                Checklists.update(checkListItem, {'$set' : {'checked' : ticked }})
            });
        });
        // set board to active and update nextCardNumber
        Boards.update(board,{ 
            '$set': {'active':true,'nextCardNumber':nextCardNumber}
        });
    }
});
