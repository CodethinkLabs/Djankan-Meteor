/*The MIT License (MIT)


  C pyright (c) 2013 Andy Dai
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

Template.timeline.helpers({
    outstandingMilestones: function() {
        var outstandingMilestoneList = [];
        var boardId = Session.get('boardId');
        var milestones = Milestones.find({board:boardId});
        milestones.forEach( function(milestone) {
            if(isOutstanding(milestone))
                outstandingMilestoneList.push(milestone);
        });
        return outstandingMilestoneList
    },
    daysToGo: function(untilDate) {
        var untilDate = Date.parse(untilDate);
        var dayDiff = daysToDate(untilDate);
        return arrayOfLength(dayDiff)
    }
});

isOutstanding = function(milestone) {
    var dueDate = Date.parse(milestone.dueDate);
    if(daysToDate(dueDate) >= 0)
        return true;
    return false;
};

daysToDate = function(untilDate) {
    var msInADay = 86400000;
    var now = new Date();
    var latestMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,0,0);
    var msDiff = untilDate - latestMidnight;
    var dayDiff = Math.floor(msDiff / msInADay);
    return dayDiff;
};

arrayOfLength = function(length) {
    var arr = [];
    for(var i=0; i < length; i++)
        arr.push(null);
    return arr;
};

Template.timeline.events = {
    'click .timelineTitleLink': function() {
        Session.set('menu','milestone');
        Session.set('menu_edit',this._id)
    }
};


