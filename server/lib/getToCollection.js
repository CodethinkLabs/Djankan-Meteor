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

// get json from a url and parse it into a collection
getToCollection = function(url,Collection) {
    try {
        var r = HTTP.call("GET", url);
        var respJson = JSON.parse(r.content)
        for(var i=0;i<respJson.length;i++) {
            Collection.insert(respJson[i])
        }
    }
    catch (e) {
        console.log("Response issue: url: "+url);
    }
}

// get json from a url, sort it by position and parse it into a col
sortToCollection = function(url,Collection) {
    try {
        var r = HTTP.call("GET", url);
        var respJson = JSON.parse(r.content)
        respJson.sort(function(obj1, obj2) {
            return obj1.position - obj2.position;
        });
        for(var i=0;i<respJson.length;i++) {
            Collection.insert(respJson[i])
        }
    }
    catch (e) {
        console.log("Response issue: url: "+url);
    }
}
