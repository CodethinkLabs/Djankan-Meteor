Template.board.helpers({
    lanes: Lanes.find({}),
    boardWidth: function () {
        
        lanes = Lanes.find({})
        console.log(lanes.count());
        return 308 * lanes.count();
    }
});
