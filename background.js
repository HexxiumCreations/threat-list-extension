chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.state == "bad")
      sendResponse({res: "blocked"});
	  chrome.tabs.update({
	  url: chrome.extension.getURL("blocked.html")
	  })
  });