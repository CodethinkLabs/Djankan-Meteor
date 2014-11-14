var cardSub;
var assigneesSub;

updateCardSub = function() {
    if(cardSub)
        cardSub.stop();
    if(assigneesSub)
        assigneesSub.stop();
    var boardId = Session.get('boardId');
    var bucketId = Session.get('bucketId');
    var milestoneId = Session.get('milestoneId');
    cardSub = Meteor.subscribe('cards', boardId,bucketId,milestoneId);
    assigneesSub = Meteor.subscribe('assigneesByBoard', boardId);
}
