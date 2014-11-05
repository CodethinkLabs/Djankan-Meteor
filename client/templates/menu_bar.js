Template.menu_bar.helpers({
    boardName: function() {
        return Boards.findOne({}).title;
    }
});
