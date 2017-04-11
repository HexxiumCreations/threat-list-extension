//The following code is property of Hexxium Creations©
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
	}
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 

    xmlHttp.send(null)
}
httpGet(chrome.extension.getURL("config/default.json"), function(datu) {
chrome.storage.sync.get(["AL"], function(response) {
    if (response.AL === "On") {
        $(document).ready(function() {
            $(".statusp")
            chrome.storage.sync.get(["enabled", "bad_url"], function(res) {
                if (res.enabled === false) {
                    $("img").attr("src", "png/off.png");
                    $(".statusp").text("Malicious Domain Blocker is off. Go to \"Settings\" to change this");
                } else {
                    var query = {
                        active: true,
                        currentWindow: true
                    };

                    chrome.tabs.query(query, function(tabs) {
                        console.log(tabs[0])
                        console.log(tabs[0] + " " + chrome.extension.getURL("blocked.html"))
                        if (tabs[0].url === chrome.extension.getURL("blocked.html")) {
                            $("img").attr("src", "png/bad4.png");
                            $(".statusp").text("Malicious website blocked: " + res.bad_url)
                        } else {
                            $("#img").attr("src", "png/bad0.png")
                        }
                    })
                }
            })
        })
    } else if (response.AL === "Off") {
        $(document).ready(function() {

            chrome.storage.sync.get(["enabled", "bad_url"], function(res) {
                if (res.enabled === false) {
                    $("img").attr("src", "png/off.png");
                    $(".statusp").text("Scammer blocker off.");
                } else {

                    var query = {
                        active: true,
                        currentWindow: true
                    };

                    chrome.tabs.query(query, function(tabs) {
                        console.log(tabs[0])
                        console.log(tabs[0] + " " + chrome.extension.getURL("blocked.html"))
                        if (tabs[0].url === chrome.extension.getURL("blocked.html") || tabs[0].url === res.bad_url) {
                            $("img").attr("src", "png/bad4.png");
                            $(".statusp").text("Malicious website blocked: " + res.bad_url)
                        } else {
                            $("#img").attr("src", "png/bad0.png")
                            $(".statusp").text("Auto launch is disabled, click on the green symbol to scan.")
                            $("img").attr("style", "cursor: pointer;")
                            $("img").click(function() {
                                console.log("CLICKY")
                                chrome.tabs.query({
                                    active: true,
                                    currentWindow: true
                                }, function(tabs) {

                                    chrome.tabs.sendMessage(tabs[0].id, {
                                        state: "scan"
                                    }, function() {
                                        console.log("compelte")
                                    })

                                })
                            })
                        }
                    })
                }
            })
        })
    } else {
		
		if (datu.AL === "On") {
        $(document).ready(function() {
            $(".statusp")
            chrome.storage.sync.get(["enabled", "bad_url"], function(res) {
                if (res.enabled === false) {
                    $("img").attr("src", "png/off.png");
                    $(".statusp").text("Malicious Domain Blocker is off. Go to \"Settings\" to change this");
                } else {
                    var query = {
                        active: true,
                        currentWindow: true
                    };

                    chrome.tabs.query(query, function(tabs) {
                        console.log(tabs[0])
                        console.log(tabs[0] + " " + chrome.extension.getURL("blocked.html"))
                        if (tabs[0].url === chrome.extension.getURL("blocked.html")) {
                            $("img").attr("src", "png/bad4.png");
                            $(".statusp").text("Malicious website blocked: " + res.bad_url)
                        } else {
                            $("#img").attr("src", "png/bad0.png")
                        }
                    })
                }
            })
        })
    } else if (datu.AL === "Off") {
        $(document).ready(function() {

            chrome.storage.sync.get(["enabled", "bad_url"], function(res) {
                if (res.enabled === false) {
                    $("img").attr("src", "png/off.png");
                    $(".statusp").text("Scammer blocker off.");
                } else {

                    var query = {
                        active: true,
                        currentWindow: true
                    };

                    chrome.tabs.query(query, function(tabs) {
                        console.log(tabs[0])
                        console.log(tabs[0] + " " + chrome.extension.getURL("blocked.html"))
                        if (tabs[0].url === chrome.extension.getURL("blocked.html") || tabs[0].url === res.bad_url) {
                            $("img").attr("src", "png/bad4.png");
                            $(".statusp").text("Malicious website blocked: " + res.bad_url)
                        } else {
                            $("#img").attr("src", "png/bad0.png")
                            $(".statusp").text("Auto launch is disabled, click on the green symbol to scan.")
                            $("img").attr("style", "cursor: pointer;")
                            $("img").click(function() {
                                console.log("CLICKY")
                                chrome.tabs.query({
                                    active: true,
                                    currentWindow: true
                                }, function(tabs) {

                                    chrome.tabs.sendMessage(tabs[0].id, {
                                        state: "scan"
                                    }, function() {
                                        console.log("compelte")
                                    })

                                })
                            })
                        }
                    })
                }
            })
        })
    }
	}
})})
