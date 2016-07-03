$( document ).ready(function() {
	chrome.storage.sync.get("enabled", function(res) {
	if (res.enabled === false) {
		$("#img").attr("src", "png/off.png"); $(".statusp").text("Status: Off");
	} else {

$("#img").attr("src", "png/bad0.png"); $(".statusp").text("Status: On");
	}
	})
console.log("haieeaaaaa")
$("#img").click(function() {
chrome.storage.sync.get("enabled", function(res) {
	console.log(res)
	if (res.enabled === false) {
		$("#img").attr("src", "png/bad0.png"); $(".statusp").text("Status: On");
chrome.storage.sync.set({"enabled": true}, function() {console.log("saved to true")})
		var query = { active: true, currentWindow: true };
chrome.tabs.query(query, function(tabs) {console.log(tabs[0].id)
chrome.tabs.reload(tabs[0].id)})
	} else {

$("#img").attr("src", "png/off.png"); $(".statusp").text("Status: Off");
chrome.storage.sync.set({"enabled": false}, function() {console.log("saved to false")})
	}
	})})
})