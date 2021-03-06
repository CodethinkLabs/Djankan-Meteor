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
    deleteLane: function(lane_id) {
        url = HOST+API+'lane/'+ lane_id +'/';
        try {
            lane = Lanes.findOne({id:lane_id});
            Lanes.remove(lane);
            r = HTTP.call("DELETE",url, function() {
                Meteor.call('updateLanes',lane.board)
            });
        }
        catch (e) {
            console.log(e);
        }
    },
    changeLane: function(card_id,lane) {
        card = Cards.findOne({_id:card_id});
        card.lane=lane;
        Lane = Lanes.findOne({id:lane});
        boardId = Lane.board;
        ID = card.id;
        delete card['_id'];
        url = HOST+API+'card/'+ID+'/';
        try {
            r = HTTP.call("PUT",url,{data: card}, function() {
                Meteor.call('updateCards',boardId);
            });
        }
        catch (e) {
            console.log(card);
            console.log(e);
        }
    },

    postlane: function(boardId,lane) {
        console.log(boardId);
        url = HOST+API+'boards/'+boardId+'/lanes/';
        try {
            r = HTTP.call("POST",url,{data: lane}, function() {
                Meteor.call('updateLanes',boardId);
            });
        }
        catch (e) {
            console.log(e);
        }
    },

    putlane: function(lane_id,title,inTriageView,inKanbanView) {
        lane = Lanes.findOne({_id:lane_id});
        ID = lane.id;
        lane.title=title;
        lane.inTriageView=inTriageView;
        lane.inKanbanView=inKanbanView;
        boardId = lane.board;
        delete lane['_id'];
        url = HOST+API+'boards/'+BOARD_ID+'/lanes/'+ID+'/';
        try {
            r = HTTP.call("PUT",url,{data: lane},function() {
                Meteor.call('updateLanes',boardId);
            });
        }
        catch (e) {
            console.log(lane);
            console.log(e);
        }
    },

    putlanes: function(boardId) {
        lanes=Lanes.find({board:boardId});
        lanes.forEach(function (lane) {
            ID = lane.id;
            url = HOST+API+'boards/'+boardId+'/lanes/'+ID+'/';
            try {
                r = HTTP.call("PUT",url,{data: lane},function() {
                    Meteor.call('updateLanes',boardId);
                });
            }
            catch (e) {
                console.log(card);
                console.log(e);
            }
        });
    },

    updateLanes: function(boardId) {
        url=HOST+API+'boards/'+boardId+'/lanes/';
        try {
            var r = HTTP.call("GET", url);
            var respJson = JSON.parse(r.content)
            respJson.sort(function(obj1, obj2) {
                return obj1.position - obj2.position;
            });
            Lanes.remove({board:boardId})
            for(var i=0;i<respJson.length;i++) {
                Lanes.insert(respJson[i]);
            }
        }
        catch (e) {
            console.log("Response issue: url: "+url);
        }
    }
});
