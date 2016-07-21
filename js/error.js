//The following code is property of Hexxium Creations©
function GetParam(name) {
    url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}  
  $(document).ready(function() { $("#BT").click(function() {
        chrome.tabs.create({
            url: "https://support.hexxiumcreations.com/"
        })
    })
if (GetParam("activity") == 0) {
	//local HttpGET
			console.log(GetParam("GetURL") + " " + GetParam("State"))
			$(".Eul").html("<li><p>Activity code: 0</p></li><li><p>Request URL: " + GetParam("GetURL") + "</p></li><li><p>State: "+ GetParam("State") +"</p></li><li><p>Response: "+GetParam("Response") +"</p></li><li><p>Generated solution: Make sure you have the newest version of the extension installed. If you do, try reinstalling the extension.</p></li>")
} else if (GetParam("activity") == 1) {
	//"online" HttpGET
	$(".Eul").html("<li><p>Activity code: 1</p></li><li><p>Request URL: "+GetParam("GetURL")+"</p></li><li><p>State: "+ GetParam("State") +"</p></li><li><p>Response: "+GetParam("Response") +"</p></li><li><p>Generated solution: Make sure you have a working internet connection. If you do, try again later.</p></li>")
} else if (GetParam("activity") == 2) {
	//chrome.storage
}
	console.log(GetParam("activity"))
	})