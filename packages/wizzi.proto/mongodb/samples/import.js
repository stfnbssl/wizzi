const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
// const url = 'mongodb://$[username]:$[password]@$[hostlist]/$[database]?authSource=$[authSource]';
const url = 'mongodb://localhost:27017/test';

// Use connect method to connect to the Server
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
  assert.equal(null, err);
  const db = client.db("test");
  db.collection('inventory2').insertMany([
    { item: "journal",
      qty: 25,
      size: { h: 14, w: 21, uom: "cm" },
      status: "A"},
    { item: "notebook",
      qty: 50,
      size: { h: 8.5, w: 11, uom: "in" },
      status: "A"},
    { item: "paper",
      qty: 100,
      size: { h: 8.5, w: 11, uom: "in" },
      status: "D"},
    { item: "planner",
      qty: 75, size: { h: 22.85, w: 30, uom: "cm" },
      status: "D"},
    { item: "postcard",
      qty: 45,
      size: { h: 10, w: 15.25, uom: "cm" },
      status: "A"}
  ]
  .then(function(result) {
    // process result
    console.log('result', result)
    client.close();
  })
});