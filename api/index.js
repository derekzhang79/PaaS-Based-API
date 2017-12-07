const express = require('express');
const bodyParser = require('body-parser');
const app = express.Router();
module.exports = app;

// require Google Datastore.
const db = require(`./db-datastore`);

// Make sure it runs.
app.get('/', function(req, res) {
  res.sendStatus(200);
});

// retrieve value of given name
app.get('/:id(\\w+)', async (req, res) => {
  try {
    res.send(await db.get(req.params.id));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

//  send the key and value to be added or created.
app.post('/:id(\\w+)', bodyParser.text(), async (req, res) => {
  try {
    res.send(await db.post(req.params.id, req.body));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// send the key and value to be overwritten.
app.put('/:id(\\w+)', bodyParser.text(), async (req, res) => {
  try {
    res.send(await db.put(req.params.id, req.body));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// send the key to be deleted.
app.delete('/:id(\\w+)', async (req, res) => {
  try {
    await db.delete(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});
