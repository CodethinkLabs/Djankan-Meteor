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

// when a card is created or edited this is called to refresh the cards
// because it is serverside it refreshes the cards for all clients 
Meteor.methods({
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
