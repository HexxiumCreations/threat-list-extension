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
	{if (BAD_URLS[index].indexOf(window.location.hostname) > -1) {console.log(BAD_URLS[index]); BAD_FOUND === true}
	
}
if (BAD_FOUND !== true) {document.write("This website is good to go!")}		
	})