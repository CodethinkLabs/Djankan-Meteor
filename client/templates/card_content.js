Template.card_content.helpers({
    assignees: function(card_id) {
        return Assignees.find({card: card_id})
    },
    assigneeName: function(assignee_id) {
        assignee = Assignees.findOne({id: assignee_id}).person;
        user = Users.findOne({id: assignee});
        if (user)
            return user.username;
        else
            return;
    },
    checklists: function(card_id) {
        return Checklists.find({card: card_id})
    },
    checklistDescription: function(checklist_id) {
        return Checklists.findOne({id: checklist_id}).description;
    }
});

Template.card_content.events = {
    "click .edit_card_link": function () {
        _id = this._id;
        Session.set("edit",_id);
    }
}
