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

Template.card.events = {
    "click .edit_card_link": function () {
        _id = this._id;
        // replace card html with the html in EDIT_CARD
        $('#'+_id).html(EDIT_CARD(this,_id));
        $('button').on('click', function() {
            title = $('#'+_id+' textarea').val();
            description = $('#'+_id).find('textarea[name="description"]').val();
            archive = $('#'+_id+'archive').is(':checked');
            Meteor.call('putcard',_id,title,description,archive);
            // remove the card from the server collection so that the normal html is replaced
            Cards.remove({_id:_id});
            Meteor.call('updateCards');
        });
    }
}
