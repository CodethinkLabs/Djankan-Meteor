Template.card_edit.events = {
    "click .save_card_edit": function () {
        _id = this._id
        title = $('#'+_id).find('textarea[name="title"]').val();
        descr = $('#'+_id).find('textarea[name="descr"]').val();
        archived = $('#'+_id+'archive').is(':checked');
        Meteor.call('putcard',_id,title,descr,archived);
        Meteor.call('updateCards');
        // when edit set to 0 in session card_edit template is removed
        // and card_content rendered
        Session.set("edit",0);
    },
    "click .discard_card_edit": function () {
        Session.set("edit",0);
    },
    "click .add_assignee": function () {
        card_mongo_id = this._id;
        var selectBox = document.getElementById("assignee_picker");
        var selectValue = selectBox.options[selectBox.selectedIndex].value;
        Meteor.call('postassignee', card_mongo_id, selectValue);
    }
}

Template.card_edit.helpers({
    users: function () {
        return Users.find({})
    },
    assignees: function(card_id) {
        return Assignees.find({card: card_id})
    },
    assigneeName: function(assignee_id) {
        assignee = Assignees.findOne({id: assignee_id}).person;
        return Users.findOne({id: assignee}).username;
    },
});
