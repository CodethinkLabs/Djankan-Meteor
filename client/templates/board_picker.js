Template.board_picker.helpers({
    boards: Boards.find({}),
    // default select box to current board
    selectCurrent: function(id) {
        if(Session.get("boardId")==id)
            return 'selected';
    }
});

Template.board_picker.events({
    'change select': function(evt) {
        var id = parseInt($(evt.target).val());
        Session.set("boardId",id);
        if(id)
            subscribeToBoard(id);
    }
});
