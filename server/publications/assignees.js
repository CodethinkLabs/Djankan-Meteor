Meteor.publish('assigneesByCard', function(card_id) {
    return Assignees.find({card: card_id});
});

Meteor.publish('assigneesByBoard', function(board_id) {
    cards = Cards.find({board: board_id});
    boardCards = new Array;
    cards.forEach( function(card) {
        boardCards.push(card.id);
    });
    return Assignees.find({card: {$in: boardCards}});
});
