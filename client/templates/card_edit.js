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
    }
}
