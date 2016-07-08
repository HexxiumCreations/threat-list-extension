function httpGet(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
var LOCAL = {}
var SETTINGS = {}
$(document).ready(function() {
    chrome.storage.sync.get(["AU", "AL", "BP"], function(res) {
        httpGet(chrome.extension.getURL("config/default.json"), function(data) {
            if (res.AU === "undefined" || res.AU === undefined) {
                console.log("data:" + data)
                LOCAL.AU = true
                SETTINGS.AU = JSON.parse(data).AU
                $("#AU").text("Auto-update: " + JSON.parse(data).AU + " (On Recommended)")
            } else {
                $("#AU").text("Auto-update: " + res.AU + " (On Recommended)");
                console.log(res);
                SETTINGS.AU = res.AU
            };
            if (res.AL === "undefined" || res.AL === undefined) {
                LOCAL.AL = true
                console.log("data:" + data)
                SETTINGS.AL = JSON.parse(data).AL
                $("#AL").text("Auto-launch: " + JSON.parse(data).AL + " (On Recommended)")
            } else {
                $("#AL").text("Auto-launch: " + res.AL + " (On Recommended)");
                console.log(res);
                SETTINGS.AL = res.AL
            }
            if (res.BP === "undefined" || res.BP === undefined) {
                LOCAL.BP = true
                console.log("data:" + JSON.parse(data).BP)
                SETTINGS.BP = JSON.parse(data).BP
                $("#BP").text("Blocked-page action: " + JSON.parse(data).BP)
            } else {
                $("#BP").text("Blocked-page action: " + res.BP);
                console.log(res);
                SETTINGS.BP = res.BP
            }
            $("#AU").click(function() {
                console.log("AU CLICK")
                if (SETTINGS.AU === "On") {
                    $("#AU").text("Auto-update: Off (On Recommended)");
                    SETTINGS.AU = "Off";
                    console.log(SETTINGS.AU)
                } else {
                    $("#AU").text("Auto-update: On (On Recommended)");
                    SETTINGS.AU = "On";
                    console.log(SETTINGS.AU)
                }
            })
            $("#AL").click(function() {
                console.log("AL CLICK")
                if (SETTINGS.AL === "On") {
                    $("#AL").text("Auto-launch: Off (On Recommended)");
                    SETTINGS.AL = "Off";
                    console.log(SETTINGS.AL)
                } else {
                    $("#AL").text("Auto-launch: On (On Recommended)");
                    SETTINGS.AL = "On";
                    console.log(SETTINGS.AL)
                }
            })
            $("#BP").click(function() {
                console.log("BP CLICK")
                if (SETTINGS.BP === "BLOCK") {
                    $("#BP").text("Blocked-page action: DESTROY");
                    SETTINGS.BP = "DESTROY";
                    console.log(SETTINGS.BP);
                    console.log(res.BP)
                } else if (SETTINGS.BP === "DESTROY") {
                    $("#BP").text("Blocked-page action: WARN");
                    SETTINGS.BP = "WARN";
                    console.log(SETTINGS.BP);
                    console.log(res.BP)
                } else {
                    $("#BP").text("Blocked-page action: BLOCK");
                    SETTINGS.BP = "BLOCK";
                    console.log(SETTINGS.BP);
                    console.log(res.BP)
                }
            })
            $(".save").click(function() {
                chrome.storage.sync.set(SETTINGS, function() {
                    console.log(SETTINGS);
                    window.location.replace("config.html")
                })
            })
        })
    })
})