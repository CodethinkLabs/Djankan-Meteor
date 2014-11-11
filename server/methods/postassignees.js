Meteor.methods({
    postassignee: function(card_mongo_id, user_id) {
        card = Cards.findOne({_id:card_mongo_id});
        user = Users.findOne({id: parseInt(user_id)});
        url = HOST+API+'card/'+ card.id +'/assignees/';
        assignee = {
            "card": card.id, 
            "person": user.id, 
            "assignee_role": "NORM"
        };
        console.log(assignee);
        try {
            r = HTTP.call("POST",url,{data: assignee});
        }
        catch (e) {
            console.log(e);
        }
    }
});
