function httpGet(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
chrome.storage.sync.get(["AU"], function(response) {
    if (response.AU === "On") {
        httpGet(chrome.extension.getURL("config/default.json"), function(data) {
            httpGet(JSON.parse(data).threat_list, function(res) {
                for (var index = 0; index < res.split("\n").length; index++) {
                    if (res.split("\n")[index].charAt(0) === "!" && res.split("\n")[index].indexOf("Version: ") > -1) {
                        DBV = res.split("\n")[index].replace("!", "").replace("Version: ", "")
                    }
                }
                chrome.storage.sync.set({
                    "cache_list": res
                }, function() {
                    console.log("update done")
                    chrome.storage.sync.set({
                        "database_version": DBV
                    }, function() {
                        console.log(DBV)
                    })
                })
            })
        })
    } else {
        console.log("AU OFF, DO NOT UPDATE")
    }
})
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "content_script_talk") {
        port.onMessage.addListener(
            function(msg) {
                console.log(msg)
                chrome.storage.sync.get(["BP"], function(response) {

                    if (msg.state == "bad") {

                        chrome.storage.sync.set({
                            "bad_url": msg.bad_url
                        }, function() {
                            console.log("bad url saved:" + msg.bad_url)
                        })
                        if (response.BP === "BLOCK") {
                            port.postMessage({
                                res: "blocked"
                            });
                            chrome.tabs.update({
                                url: chrome.extension.getURL("blocked.html")
                            })
                        } else if (response.BP === "DESTROY") {
                            port.postMessage({
                                res: "blocked"
                            });
                            var query = {
                                active: true,
                                currentWindow: true
                            };

                            chrome.tabs.query(query, function(tabs) {
                                console.log(tabs[0].id)
                                var TAB = tabs[0].id;
                                chrome.tabs.remove(TAB)
                            })
                        } else {
                            port.postMessage({
                                res: "warning"
                            });
                            console.log("warning")
                        }
                    }
                })
            })
    }
})