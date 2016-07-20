function httpGet(theUrl, callback, local) {
   var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
		{  callback(xmlHttp.responseText);} else {console.log(xmlHttp.status + " " + xmlHttp.readyState)}
    }
	xmlHttp.onerror = function() {
		document.write("A fatal error occured. Please contact support.")
		if (local === true) {
		window.location.replace("error.html?activity=0&GetURL=" + theUrl + "&State=" + xmlHttp.readyState + "&response=" + xmlHttp.responseText)}
		else {window.location.replace("error.html?activity=1&GetURL="+theUrl+"&State="+xmlHttp.readyState+"&response=" + xmlHttp.responseText)}
	}
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 

    xmlHttp.send(null)
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
		httpGet(chrome.extension.getURL("config/default.json"), function(dataa) {
        httpGet(JSON.parse(dataa).threat_list, function(data) {
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
        }, false)}, true)
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