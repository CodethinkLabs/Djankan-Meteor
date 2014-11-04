Template.card.helpers({
    assignees: function(card_number) {
        return Assignees.find({card: card_number})
    },
    assigneeName: function(assignee_id) {
        person_id = Assignees.findOne({_id:assignee_id}).person;
        name = Users.findOne({id:person_id}).username;
        return name;
    },
    checklists: function(card_number) {
        return Checklists.find({card: card_number})
    },
    checklistDescription: function(checklist_id) {
        return Checklists.findOne({_id:checklist_id}).description;
    }
});
