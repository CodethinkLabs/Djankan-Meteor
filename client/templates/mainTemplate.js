Template.mainTemplate.helpers({
    chosenBoard: function () {
        if(Session.get("boardId"))
            return true;
        return false;
    }
});
