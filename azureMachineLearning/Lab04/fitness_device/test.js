var EventHubClient = require('azure-event-hubs').Client;

var connStr = process.env.EVENTHUBCONNSTR;
var t = new Date().toISOString();
console.log(t);
console.log(connStr);