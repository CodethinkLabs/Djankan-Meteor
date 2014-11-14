var laneSub;
var bucketSub;
var milestoneSub;
var checklistSub;

// remove old subscriptions and subscribe to a new board
subscribeToBoard = function(boardId) {
    Meteor.call('GETBoard',boardId);
    if(laneSub)
        laneSub.stop();
    var board = Boards.findOne({id:boardId});
    laneSub = Meteor.subscribe('lanes', boardId, function() {
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
    updateCardSub();
}
