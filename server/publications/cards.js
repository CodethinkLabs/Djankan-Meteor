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

Meteor.publish('cardsByBoard', function(board_id) {
  return Cards.find({board: board_id});
});
Meteor.publish('cardsByBucket', function(bucket_id) {
  return Cards.find({bucket: bucket_id});
});
Meteor.publish('cardsByMilestone', function(milestone_id) {
  return Cards.find({milestone: milestone_id});
});
Meteor.publish('cards', function(board_id,bucket_id,milestone_id) {
    if(bucket_id==0 && milestone_id==0)
        return Cards.find({board:board_id});
    if(bucket_id==0)
        return Cards.find({milestone:milestone_id});
    if(milestone_id==0)
        return Cards.find({bucket:bucket_id});
    return Cards.find({bucket:bucket_id,milestone:milestone_id});
});
