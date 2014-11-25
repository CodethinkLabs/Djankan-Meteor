/*The MIT License (MIT)

Copyright (c) 2013 Andy Dai
Copyright (c) 2014 Codethink

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

postDefaultLanes = function(boardId) {
    console.log("foo");
    var backlog = {
        "board": boardId, 
        "title": "BACKLOG", 
        "cardLimit": 0, 
        "colour": "blue", 
        "lane_role": "NORM", 
        "position": 1, 
        "inTriageView": false, 
        "inKanbanView": true, 
        "deletedDate": "2014-11-18T16:40:06.067Z"
    };
    var doing = {
        "board": boardId, 
        "title": "DOING", 
        "cardLimit": 0, 
        "colour": "blue", 
        "lane_role": "NORM", 
        "position": 2, 
        "inTriageView": false, 
        "inKanbanView": true, 
        "deletedDate": "2014-11-18T16:40:06.067Z"
    };
    var done = {
        "board": boardId, 
        "title": "DONE", 
        "cardLimit": 0, 
        "colour": "blue", 
        "lane_role": "NORM", 
        "position": 3, 
        "inTriageView": false, 
        "inKanbanView": true, 
        "deletedDate": "2014-11-18T16:40:06.067Z"
    };
    Meteor.call('postlane',boardId,backlog);
    Meteor.call('postlane',boardId,doing);
    Meteor.call('postlane',boardId,done);
    Meteor.call('updateLanes',boardId);
}
