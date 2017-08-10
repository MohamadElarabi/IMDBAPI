var http = require("http");
var express = require("express");
var app = express();
//var ejsEngine = require("ejs-locals");
var controllers = require("./controllers");
var ConnectionOpen = false;
var Connection = require('tedious').Connection;
var dbConfig = {
  userName: 'imdbweb',
  password: 'Password789',
  server: 'imdb.cfldzzglr8aj.us-west-2.rds.amazonaws.com',
  options: { database: "imdb", rowCollectionOnDone: true }
};

// Opt into Services
app.use(express.urlencoded());
app.use(express.json());

//Open DB Connection
var connection = new Connection(dbConfig);
connection.on('connect', (err)=> {
  if (err)
    console.log(err);
  else  // If no error, then good to go...
    ConnectionOpen = true;
});

var executeRequest = function (request) {
  if (!ConnectionOpen) {
    return "Connection not open";
  }

  connection.execSql(request);
}

var simplifyRows = function (rows) {
  var result = [];
  rows.forEach((row)=> {
    var simpleRow = {};
    row.forEach((field)=> {
      eval("simpleRow." + field.metadata.colName + "='" + field.value + "'");
    });
    result.push(simpleRow);
  });
  return result;
}

// Map the routes
controllers.init(app, { executeRequest, simplifyRows });

var server = http.createServer(app);
server.listen(80);
