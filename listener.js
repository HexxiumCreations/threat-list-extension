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
httpGet("https://hexxiumcreations.github.io/threat-list/hexxiumthreatlist.txt", function(res) {
	var BAD_URLS = res.split("\n")
	for(index = 8; index < BAD_URLS.length; index++)
	{if (BAD_URLS[index].indexOf(window.location.hostname) > -1) {console.log(BAD_URLS[index]); document.write("BAD WEBSITE, GET OUT.")}}
	})