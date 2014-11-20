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
