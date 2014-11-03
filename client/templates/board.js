Template.board.helpers({
    lanes: Lanes.find({}, {sort: {position: 1}}),
});
