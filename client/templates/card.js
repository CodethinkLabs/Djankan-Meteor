Template.card.helpers({
    assignees: function(card_number) {
        return Assignees.find({card: card_number})
    },
    assigneeName: function(assignee_id) {
        name = Assignees.findOne({_id:assignee_id}).person;
        return name;
    },
    checklists: function(card_number) {
        return Checklists.find({card: card_number})
    },
});
