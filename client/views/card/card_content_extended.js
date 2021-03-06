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

Template.card_content_extended.helpers({
    assignees: function(card_id) {
        return Assignees.find({card: card_id});
    },
    assigneeName: function(assignee_id) {
        assignee = Assignees.findOne({id: assignee_id}).person;
        user = Users.findOne({id: assignee});
        if (user)
            return user.username;
        else
            return;
    },
    checklists: function(card_id) {
        return Checklists.find({card: card_id});
    },
    checklistTotal: function(card_id) {
        return Checklists.find({card: card_id}).count();
    },
    checklistDescription: function(checklist_id) {
        return Checklists.findOne({id: checklist_id}).description;
    }
});

Template.card_content_extended.events = {
    "click .edit_card_link": function () {
        _id = this._id;
        Session.set("edit",_id);
    },
    "click .expand_card_link": function () {
        _id = this._id;
        Session.set(_id, false);
    }
}
