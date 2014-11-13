Meteor.publish('checklistByCard', function(card_id) {
    return Checklists.find({card: card_id});
});

Meteor.publish('checklistByBoard', function(board_id) {
    cards = Cards.find({board: board_id});
    cards.forEach( function(card) {
        boardCards.push(card.id);
    });
    return Checklists.find({card: {$in: boardCards}})
