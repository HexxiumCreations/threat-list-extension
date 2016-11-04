//The following code is property of Hexxium Creations©
chrome.storage.sync.get("database_version", function(response) {
    $("#DBV").append(response.database_version)
    $("#UA").click(function() {
        chrome.tabs.create({
            url: "https://www.hexxiumcreations.com/f-a-q/usage-agreement/"
        })
    })
})
