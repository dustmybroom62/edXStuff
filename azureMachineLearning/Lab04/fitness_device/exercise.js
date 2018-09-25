const { EventHubClient } = require('@azure/event-hubs');

var connStr = process.env.EVENTHUBCONNSTR;
var hubName = process.env.HUBNAME;

var client = EventHubClient.createFromConnectionString(connStr, hubName);
//client.createSender()
//    .then(function (tx) {
setInterval(sendData, 500);
//    });
async function sendData() {
    usr = String(Math.floor((Math.random() * 10) + 1));
    hr = String(100 - (Math.random() * 5));
    bt = String(35 + Math.random());
    t = new Date().toISOString();
    const eventData = {
        eventtime: t, userid: usr, heartrate: hr, bodytemp: bt
    };
    console.log("Timestamp: " + t + ", User: " + usr + ", Heart: " + hr + ", Temp: " + bt);
    const result = await client.send(eventData); 
}

sendData().catch((err) => {
    console.log(err);
});