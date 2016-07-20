function httpGet(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


function triggerLoadingAnimation() {
    var loadingimage = document.getElementById('activeloading');
    loadingimage.className = "loadingimage up";
    setTimeout(function() {
        loadingimage.className = "loadingimage";
    }, 2000);
    
    return true;
}

$(document).ready(function() {
    chrome.storage.sync.get("enabled", function(res) {
        if (res.enabled === false) {
            $("#img").attr("src", "png/off.png");
            $(".statusp").text("Status: Off");
        } else {

            $("#img").attr("src", "png/bad0.png");
            $(".statusp").text("Status: On");
        }
    })
    console.log("haieeaaaaa")
    $(".DB").click(function() {
        $(".DB").text("Updating database...")
        chrome.storage.sync.set({
            "enabled": true
        }, function() {
            console.log("saved to true")
        })
        $(".statusp").text("Status: Updating");
        httpGet("https://hexxiumcreations.github.io/threat-list/hexxiumthreatlist.txt", function(data) {
            chrome.storage.sync.get("cache_list", function(fata) {
                if (data === fata.cache_list) {
                    message = "Database up-to-date!"
                } else {
					                for (var index = 0; index < data.split("\n").length; index++) {
                    if (data.split("\n")[index].charAt(0) === "!" && data.split("\n")[index].indexOf("Version: ") > -1) {
                        DBV = data.split("\n")[index].replace("!", "").replace("Version: ", "")
                    }
                }
                    message = "Database updated!";
                    chrome.storage.sync.set({
                        "cache_list": data,
						"database_version": DBV
                    })
					
                }
                triggerLoadingAnimation();
                setInterval(function() {
                    $(".DB").text(message);
                    $(".statusp").text("Status: On");
                }, 4000);
            })
        })
    })
    $("#img").click(function() {
        chrome.storage.sync.get("enabled", function(res) {
            console.log(res)
            if (res.enabled === false) {
                $("#img").attr("src", "png/bad0.png");
                $(".statusp").text("Status: On");
                chrome.storage.sync.set({
                    "enabled": true
                }, function() {
                    console.log("saved to true")
                })
                var query = {
                    active: true,
                    currentWindow: true
                };
                chrome.tabs.query(query, function(tabs) {
                    console.log(tabs[0].id)
                    chrome.tabs.reload(tabs[0].id)
                })
            } else {

                $("#img").attr("src", "png/off.png");
                $(".statusp").text("Status: Off");
                chrome.storage.sync.set({
                    "enabled": false
                }, function() {
                    console.log("saved to false")
                })
            }
        })
    })
})