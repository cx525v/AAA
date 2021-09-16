
var simpleHubProxy; 
function writeToLog(log) {
  console.log(log);
}
function connect() {
console.log('connect ...');
    //Load auto generated hub script dynamically and perform connection operation when loading completed
    //SignalR server location is specified by 'Url' input element, hub script must be loaded from the same location
    //For production, remove this call and uncomment the script block in the header part
    $.getScript( "https://localhost:44369/signalr/hubs", function() {

       $.connection.hub.url ="https://localhost:44369/signalr";

        // Declare a proxy to reference the hub.
        simpleHubProxy = $.connection.simpleHub;

        //Reigster to the "AddMessage" callback method of the hub
        //This method is invoked by the hub
        simpleHubProxy.client.addMessage = function (name, message) {
            writeToLog(name + ":" + message);
        };

        //Connect to hub
        $.connection.hub.start().done( function () {
            writeToLog("Connected.");
            simpleHubProxy.server.setUserName('testClient');
            console.log(simpleHubProxy);
        });
    });
}  

//Disconnect from the server
function disconnect() {

    if(simpleHubProxy != null) {
        $.connection.hub.stop().done(function() {
            simpleHubProxy = null;
            writeToLog("Disconnected.");
        });
    }
}

//Send a message to server
function sendMessage(msg) {
    console.log(simpleHubProxy);
    if(simpleHubProxy != null) {
        simpleHubProxy.server.send(msg);
    }
}