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

Meteor.startup(function() {
    Boards.remove({});
    /* UserProfiles.remove({}); */
    //get boards
    board_url = HOST+API+'boards/';
    getToCollection(board_url,Boards);
    //add active=false
    boards = Boards.find({})
    boards.forEach( function(board) {
        Boards.update(board, {'$set' : {'active' : false }})
        Boards.update(board, {'$set' : {'nextCardNumber' : 0 }})
    });
    getUserProfiles();
    //get users
    /* users_url = HOST+API+'users/'; */
    /* getToCollection(users_url,UserProfiles, function() { */
    /*     Temp = new Meteor.Collection('temp'); */
    /*     userProfilesUrl = users_url+'profile/'; */
    /*     getToCollection(userProfilesUrl,Temp, function() { */
    /*         console.log(Temp.find().fetch()); */
    /*         console.log('foo'); */
    /*         var users = UserProfiles.find(); */
    /*         users.forEach( function(aUser) { */
    /*             console.log(Temp.findOne()) */
    /*             console.log(aUser.id) */
    /*             var userProfile = Temp.findOne({"user":aUser.id}); */
    /*             console.log(userProfile) */
    /*             UserProfiles.update(aUser,{'$set':{'id':userProfile.id}}); */
    /*         }); */
    /*         Temp.remove(); */
    /*         delete Temp; */
    /*     }); */
    /* }); */
});
