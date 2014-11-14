Template.dash.helpers({
    boards: function () {
        return Boards.find({});
    }
});

Template.dash.events = {
    'click .selectBoard': function() {
        Session.set("boardId",this.id);
        subscribeToBoard(this.id);
    }
}
