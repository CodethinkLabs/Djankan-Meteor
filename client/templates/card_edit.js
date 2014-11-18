flag = 0;

Template.card_edit.events = {
    "click .save_card_edit": function () {
        var boardId = Session.get('boardId');
        var _id = this._id
        var title = $('#'+_id).find('textarea[name="title"]').val();
        var descr = $('#'+_id).find('textarea[name="descr"]').val();
        var archived = $('#'+_id+'archive').is(':checked');
        /* if bucket has been changed get pk else this is null and
        bucket remains the same. takes 0 for remove from bucket */
        var bucket = Session.get('tempBucket');
        // remove temp session variable as no longer needed
        delete Session.keys['tempBucket'];
        var milestone = Session.get('tempMilestone');
        delete Session.keys['tempMilestone'];
        Meteor.call('putcard',_id,title,descr,archived,bucket,milestone);
        Meteor.call('updateCards',boardId);
        // when edit set to 0 in session card_edit template is removed
        // and card_content rendered
        Session.set("edit",0);
    },
    "click .discard_card_edit": function () {
        // remove temp session variables
        delete Session.keys['tempBucket'];
        delete Session.keys['tempMilestone'];
        // set no card being edited
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
    },
    "change .bucket_picker": function(evt) {
        /*  put the bucket in a temporary session var so that the data
            is not PUT until the user clicks save, this variable is
            removed on clicking save or delete */
        var bucketId = parseInt($(evt.target).val());
        Session.set('tempBucket',bucketId);
    },
    "change .milestone_picker": function(evt) {
        /*  put the milest in a temporary session var so that the data
            is not PUT until the user clicks save, this variable is
            removed on clicking save or delete */
        var milestoneId = parseInt($(evt.target).val());
        Session.set('tempMilestone',milestoneId);
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
    },
    buckets: function() {
        return Buckets.find({});
    },
    milestones: function() {
        return Milestones.find({}); 
    },
    selectMyBucket: function(cardId,bucketId) {
        card = Cards.findOne({id:cardId});
        if(card.bucket == bucketId)
            return "selected";
    },
    selectMyMilestone: function(cardId,milestoneId) {
        card = Cards.findOne({id:cardId});
        if(card.milestone == milestoneId)
            return "selected";
    }
});
