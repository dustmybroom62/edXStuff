const fs = require('fs');
const path = require('path');

const dataFolder = path.join(__dirname, 'data');
const infile = path.join(dataFolder, 'customer-data.csv');
const outfile = path.join(dataFolder, 'customer-data.json');

// method 1
function method1(infile, callback) {
    const csv2json = require('csvtojson');
    csv2json()
        .fromFile(infile)
        .on('end_parsed', function (jsonObjArray) {
            callback(JSON.stringify(jsonObjArray, null, 3));
        });
}

// method 2
function method2(infile, callback) {
    //require the csvtojson converter class 
    var Converter = require("csvtojson").Converter;
    // create a new converter object
    var converter = new Converter({});

    // call the fromFile function which takes in the path to your 
    // csv file as well as a callback function
    converter.fromFile(infile, function (err, result) {
        // if an error has occured then handle it
        if (err) {
            console.log("An Error Has Occured");
            console.log(err);
            callback("[]");
        }
        callback(JSON.stringify(result, null, 3));
        console.log("done");
    });
}

//method1(infile, (result) => {
//    fs.writeFileSync(outfile, result);
//});

method2(infile, (result) => {
    fs.writeFileSync(outfile, result);
});
