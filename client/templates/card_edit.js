flag = 0;

Template.card_edit.events = {
    "click .save_card_edit": function () {
        _id = this._id
        title = $('#'+_id).find('textarea[name="title"]').val();
        descr = $('#'+_id).find('textarea[name="descr"]').val();
        archived = $('#'+_id+'archive').is(':checked');
        boardId = Session.get('boardId');
        Meteor.call('putcard',_id,title,descr,archived);
        Meteor.call('updateCards',boardId);
        // when edit set to 0 in session card_edit template is removed
        // and card_content rendered
        Session.set("edit",0);
    },
    "click .discard_card_edit": function () {
        Session.set("edit",0);
    },
    "click .add_assignee": function () {
        var card_mongo_id = this._id;
        var card_id = Cards.findOne({_id: card_mongo_id}).id;
        var selectBox = document.getElementById("assignee_picker");
        var selectValue = selectBox.options[selectBox.selectedIndex].value;
        Meteor.call('postAssignee', card_mongo_id, selectValue);
        Meteor.call('updateAssignees', card_id);
    },
    "click .remove_assignee_link": function (e) {
        var assignee_id = parseInt(e.currentTarget.id);
        var card_id = Assignees.findOne({id: assignee_id}).card;
        Meteor.call('deleteAssignee', assignee_id);
        Meteor.call('updateAssignees', card_id);
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
    getAssigneeColor: function() {
        if (flag) {
            flag = 0;
            return "#FCDAC0";
        }
        flag = 1;
        return "#FCCEAA";
    }
});
