$(document).ready(function(){
    Trello.authorize({
        interactive: true,
        type: "popup",
        expiration: "never",
        name: "surveyrequest",
        persist: "true",
        success: function() { onAuthorizeSuccessful(); },
        error: function() { onFailedAuthorization(); },
        scope: { read: true, write: true},
    });
    
    function onAuthorizeSuccessful() {
        var token = Trello.token();     
        today = new Date("December 25, 2015 12:00:00");
        var thisUrl = encodeURL = "http://www.google.com/";
        console.log(token);
        Trello.post("cards", { name: "Card created for test", desc: "this is a test",  idList: "61f1d40a93852c1b9f88152a", due: today, urlSource: thisUrl});
    
    }
    
    function onFailedAuthorization() {
        console.log("Authorization failed.");
    }
    });