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

//method to post a new card created on the GUI
Meteor.methods({
    postcard: function(card,boardId) {
        var board = Boards.findOne({id:boardId})
        var url = HOST+API+'boards/'+boardId+'/cards/';
        var nextCardNumber = ++board.nextCardNumber;
        Boards.update({id:boardId},{ '$set': {'nextCardNumber':nextCardNumber}});
        card.header.cardNumber=nextCardNumber;
        try {
            var r = HTTP.call("POST",url,{data: card});
        }
        catch (e) {
            console.log(e);
        }
    },

    putcard: function(card_id,title,description,archive,bucket,milestone) {
        card = Cards.findOne({_id:card_id});
        ID = card.id;
        card.title=title;
        card.description=description;
        card.archived=archive;
        // if valid bucket pk given update card bucket
        if(bucket)
            card.bucket=bucket;
        // if zero given set no bucket, if null given keep old bucket
        else if(bucket==0)
            card.bucket=null;
        // if valid milest pk given updatecard milest
        if(milestone)
            card.milestone=milestone;
        // if zero given set no milest, if null given keep old milest
        else if(milestone==0)
            card.milestone=null;
        delete card['_id'];
        url = HOST+API+'card/'+ID+'/';
        try {
            r = HTTP.call("PUT",url,{data: card});
        }
        catch (e) {
            console.log(card);
            console.log(e);
        }
    },

    updateCards: function(boardId) {
        url=HOST+API+'boards/'+boardId+'/cards/';
        try {
            var r = HTTP.call("GET", url);
            var respJson = JSON.parse(r.content)
            for(var i=0;i<respJson.length;i++) {
                gotCard=respJson[i]
                localCard=Cards.findOne({id:gotCard.id})
                // if no correspoding in collection insert it
                if(!localCard) {
                    if(!gotCard.archived)
                        Cards.insert(gotCard);
                }
                // else check to see if been archived
                else if(gotCard.archived)
                    Cards.remove(localCard)
                // else check to see if title or description or lane changed
                else if(gotCard.description!=localCard.description)
                    Cards.update(localCard,gotCard);
                else if(gotCard.title!=localCard.title)
                    Cards.update(localCard,gotCard);
                else if(gotCard.lane!=localCard.lane)
                    Cards.update(localCard,gotCard);
                else if(gotCard.bucket!=localCard.bucket)
                    Cards.update(localCard,gotCard);
                else if(gotCard.milestone!=localCard.milestone)
                    Cards.update(localCard,gotCard);
            }
        }
        catch (e) {
            console.log("Response issue: url: "+url);
        }
    }
});
