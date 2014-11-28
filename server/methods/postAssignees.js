/*The MIT License (MIT)

Copyright (c) 2013 Andy Dai
Copyright (c) 2014 Codethink Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

Meteor.methods({
    postAssignee: function(card_mongo_id, user_id) {
        card = Cards.findOne({_id:card_mongo_id});
        user = Users.findOne({id: parseInt(user_id)});
        url = HOST+API+'card/'+ card.id +'/assignees/';
        assignee = {
            "card": card.id,
            "person": user.id,
            "assignee_role": "NORM"
        };
        try {
            r = HTTP.call("POST",url,{data: assignee});
        }
        catch (e) {
            console.log(e);
        }
    }
});
