chrome.storage.sync.get("database_version", function(response) { 
$("#DBV").append(response.database_version)
})