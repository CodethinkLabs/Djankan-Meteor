var laneSub;
var cardSub;
var bucketSub;
var milestoneSub;
var checklistSub;
var assigneesSub;

// remove old subscriptions and subscribe to a new board
subscribeToBoard = function(boardId) {
    Meteor.call('GETBoard',boardId);
    if(laneSub)
        laneSub.stop();
    var board = Boards.findOne({id:boardId});
    laneSub = Meteor.subscribe('lanes', boardId, function() {
    });
    if(cardSub)
        cardSub.stop();
    cardSub = Meteor.subscribe('cardsByBoard', boardId, function() {
    });
    if(bucketSub)
        bucketSub.stop();
    bucketSub = Meteor.subscribe('buckets', boardId, function() {
    });
    if(milestoneSub)
        milestoneSub.stop();
    milestoneSub = Meteor.subscribe('milestones', boardId, function() {
    });
    if(checklistSub)
        checklistSub.stop();
    checklistSub = Meteor.subscribe('checklistByBoard', boardId, function() {
    });
    if(assigneesSub)
        assigneesSub.stop();
    assigneesSub = Meteor.subscribe('assigneesByBoard', boardId, function() {
    });
}
