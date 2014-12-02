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
    GETBoard: function(boardId) {
        var board = Boards.findOne({id:boardId});
        // if board has been activated do nothing
        if(board.active)
            return;
        // remove old data
        Lanes.remove({board:boardId});
        Cards.remove({board:boardId});
        Buckets.remove({board:boardId});
        Milestones.remove({board:boardId});
        var users_url = HOST+API+'users/';
        var board_url = HOST+API+'boards/'+boardId+'/';
        var lanes_url = board_url+'lanes/';
        var cards_url = board_url+'cards/?archived=false';
        var buckets_url = board_url+'buckets/';
        var milestones_url = board_url+'milestones/';
        sortToCollection(lanes_url,Lanes);
        sortToCollection(cards_url,Cards);
        getToCollection(buckets_url,Buckets);
        getToCollection(milestones_url,Milestones);
        // get assignees and checklists for each card in board
        var cards = Cards.find({board:boardId});
        // keep track of the highest cardNumber for making new cards
        var nextCardNumber=0;
        cards.forEach(function (card) {
            var cardNumber = card.header.cardNumber;
            if( cardNumber > nextCardNumber) {
                nextCardNumber=cardNumber;
            }
            var checklist_url = HOST+API+'card/'+card.id+'/checklists/';
            var assignees_url = HOST+API+'card/'+card.id+'/assignees/';
            Assignees.remove({card:card.id});
            Checklists.remove({card:card.id});
            getToCollection(checklist_url,Checklists);
            getToCollection(assignees_url,Assignees);
            checkListItems = Checklists.find({})
            checkListItems.forEach( function(checkListItem) {
                var ticked = getEventTicked(checkListItem.id);
                Checklists.update(checkListItem, {'$set' : {'checked' : ticked }})
            });
        });
        // set board to active and update nextCardNumber
        Boards.update(board,{
            '$set': {'active':true,'nextCardNumber':nextCardNumber}
        });
    },

    postboard: function(board) {
        url = HOST+API+'boards/';
        try {
            r = HTTP.call("POST",url,{data: board});
        }
        catch (e) {
            console.log(e);
        }
    },

    refreshAllBoards: function(boardId) {
        Boards.remove({});
        board_url = HOST+API+'boards/';
        getToCollection(board_url,Boards);
        //add active=false
        boards = Boards.find({});
        boards.forEach( function(board) {
            Boards.update(board, {'$set' : {'active' : false }});
            Boards.update(board, {'$set' : {'nextCardNumber' : 0 }});
        });
    }
});
