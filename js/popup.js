$(document).ready(function() {
chrome.storage.sync.get(["enabled", "bad_url"], function(res) {
	if (res.enabled === false) {
		$("img").attr("src", "png/off.png"); $(".statusp").text("Scammer blocker off.");
	} else {
		var query = { active: true, currentWindow: true };

chrome.tabs.query(query, function(tabs) {
console.log(tabs[0])
		console.log(tabs[0] + " " + chrome.extension.getURL("blocked.html"))
if (tabs[0].url === chrome.extension.getURL("blocked.html")) {
	$("img").attr("src", "png/bad4.png");
	$(".statusp").text("Malicious website blocked: " + res.bad_url)
} else {
$("#img").attr("src", "png/bad0.png")}
	}
									)}})})