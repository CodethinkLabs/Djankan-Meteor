Meteor.methods({
    deleteAssignee: function(assignee_id) {
        url = HOST+API+'assignee/'+ assignee_id +'/';
        try {
            r = HTTP.call("DELETE",url);
            Assignees.remove({id: assignee_id});
        }
        catch (e) {
            console.log(e);
        }
    }
});
