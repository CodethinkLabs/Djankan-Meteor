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

// method to put a card when the title description or archive status
// is edited on the GUI
Meteor.methods({
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
    }
});
