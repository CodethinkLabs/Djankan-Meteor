Template.board_picker.helpers({
    boards: Boards.find({})
});

Template.board_picker.events({
    'change select': function(evt) {
        var id = parseInt($(evt.target).val());
        Session.set("boardId",id);
        if(id)
            subscribeToBoard(id);
    }
});
