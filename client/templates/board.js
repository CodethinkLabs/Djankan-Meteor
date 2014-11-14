Template.board.helpers({
    lanes: Lanes.find({}),
    boardWidth: function () {
        
        lanes = Lanes.find({})
        return 308 * lanes.count();
    }
});
