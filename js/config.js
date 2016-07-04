function httpGet(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
$( document ).ready(function() {
	chrome.storage.sync.get("enabled", function(res) {
	if (res.enabled === false) {
		$("#img").attr("src", "png/off.png"); $(".statusp").text("Status: Off");
	} else {

$("#img").attr("src", "png/bad0.png"); $(".statusp").text("Status: On");
	}
	})
console.log("haieeaaaaa")
$(".DB").click(function() {
	$(".DB").text("Updating database...")
	httpGet("https://hexxiumcreations.github.io/threat-list/hexxiumthreatlist.txt", function(data) {
		chrome.storage.sync.get("cache_list", function(fata) {
			if (data === fata.cache_list) {message = "Database up-to-date!"}
			else {message = "Database updated!"}
	$("#img").attr("src", "png/update1.png").delay(800).queue(function(next) { $(this).attr('src','png/update2.png'); next(); }).delay(1000).queue(function(next) { $(this).attr('src','png/update3.png'); next(); }).delay(1000).queue(function(next) { $(this).attr('src','png/update4.png'); next(); }).delay(1000).queue(function(next) { $(this).attr('src','png/bad0.png'); $(".DB").text(message); next(); })
	})})})
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