$(document).ready(function() {
    $("#web").click(function() {
        chrome.tabs.create({
            url: "https://hexxiumcreations.com"
        })
    })
    $("#YT").click(function() {
        chrome.tabs.create({
            url: "https://www.youtube.com/channel/UCeBAWpe_uezAQTzz_fCO6EQ"
        })
    })
    $("#twit").click(function() {
        chrome.tabs.create({
            url: "https://twitter.com/HexxiumGaming"
        })
    })
})