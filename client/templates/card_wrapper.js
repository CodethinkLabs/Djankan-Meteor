Template.card_wrapper.helpers({
    card: function(_id) {
        return Cards.findOne({_id:  _id});
    },
    edit: function(_id) {
        if(Session.get("edit") == _id)
            return true;
        return false;
    },
    extended: function(_id) {
        return Session.get(_id);
    }
});
