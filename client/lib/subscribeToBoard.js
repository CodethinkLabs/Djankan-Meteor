var laneSub;
var bucketSub;
var milestoneSub;
var checklistSub;

// remove old subscriptions and subscribe to a new board
subscribeToBoard = function(boardId) {
    Meteor.call('GETBoard',boardId);
    if(laneSub)
        laneSub.stop();
    laneSub = Meteor.subscribe('lanes', boardId, function() {
        if(Lanes.find({}).count()==0)
            postDefaultLanes(boardId);
    });
    if(bucketSub)
        bucketSub.stop();
    bucketSub = Meteor.subscribe('buckets', boardId);
    if(milestoneSub)
        milestoneSub.stop();
    milestoneSub = Meteor.subscribe('milestones', boardId);
    if(checklistSub)
        checklistSub.stop();
    checklistSub = Meteor.subscribe('checklistByBoard', boardId, function() {
    });
    updateCardSub();
}
