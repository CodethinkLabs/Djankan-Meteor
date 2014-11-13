Template.card_content.helpers({
    assignees: function(card_id) {
        return Assignees.find({card: card_id});
    },
    assigneeName: function(assignee_id) {
        assignee = Assignees.findOne({id: assignee_id}).person;
        user = Users.findOne({id: assignee});
        if (user)
            return user.username;
        else
            return;
    },
    shortDescription: function(card_id) {
        var maxLength = 113;
        var description = Cards.findOne({id: card_id}).description;
        if (description.length > maxLength)
            return description.substr(0, maxLength - 3) + "...";
        else
            return description;
    },
    checklists: function(card_id) {
        return Checklists.find({card: card_id});
    },
    checklistTotalTicked: function (card_id) {
        return Checklists.find({card: card_id, checked: true}).count();
    },
    checklistPercentComplete: function (card_id) {
        complete = parseInt(Checklists.find({card: card_id, checked: true}).count());
        total = parseInt(Checklists.find({card: card_id}).count());
        return complete / total * 100;
    },
    checklistTotal: function(card_id) {
        return Checklists.find({card: card_id}).count();
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
