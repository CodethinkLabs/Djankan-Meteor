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

// method to put a milestone when the title or description
// is edited on the GUI
Meteor.methods({
    putmilestone: function(boardId,milestone_id,title,description) {
        var milestone = Milestones.findOne({_id:milestone_id});
        var ID = milestone.id;
        milestone.title=title;
        milestone.description=description;
        delete milestone['_id'];
        var url = HOST+API+'boards/'+boardId+'/milestones/'+ID+'/';
        try {
            r = HTTP.call("PUT",url,{data: milestone});
        }
        catch (e) {
            console.log(milestone);
            console.log(e);
        }
    }
});
