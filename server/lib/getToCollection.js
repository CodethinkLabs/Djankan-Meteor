// get json from a url and parse it into a collection
getToCollection = function(url,Collection) {
    try {
        var r = HTTP.call("GET", url);
        var respJson = JSON.parse(r.content)
        for(var i=0;i<respJson.length;i++) {
            if(!respJson[i].archived)
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
