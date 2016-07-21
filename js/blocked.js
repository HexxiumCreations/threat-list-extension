//The following code is property of Hexxium Creations©

function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

$(document).ready(function() {
    $("img").click(function() {
        window.location.replace(chrome.extension.getURL("help.html"));
    });
    
        $(".continue").click(function() {
        if (decodeURIComponent(getQueryVariable("url")).split(".")[decodeURIComponent(getQueryVariable("url")).split(".").length - 1].indexOf("?") > -1) {
            window.location.replace(decodeURIComponent(getQueryVariable("url")) + "&continuehexi=true");
        } else {
            window.location.replace(decodeURIComponent(getQueryVariable("url")) + "?continuehexi=true");
        }})
            
   
    
    document.getElementById('continuebutton').target = "_black";
})


    
