// Require Express
const express = require('express');
// Extract the entire body portion of an incoming request stream and exposes it on req.body
const bodyParser = require('body-parser');
// Creates a new router object.
const app = express.Router();
// Require DB Datastore code
const db = require(`./db-datastore`);

// Return a 500 server error
function returnServerError (res, e) {
  console.error(e);
  res.sendStatus(500);
}

// Send OK upon hitting the route of the aplication
app.get('/', (req, res) => res.sendStatus(200));

app.get('/:id(\\w+)', async (req, res) => {
  try {
    // Return a promise to the Fetch API call containing a name from DataStore
    res.send(await db.retrieveName(req.params.id));
  } catch (e) {
    returnServerError(res, e)
  }
});

app.post('/:id(\\w+)', bodyParser.text(), async (req, res) => {
  try {
    // Return a promise to the Fetch API call containing...
    res.send(await db.addToCounter(req.params.id, req.body));
  } catch (e) {
    returnServerError(res, e)
  }
});

// Reset the counter for a given name
app.put('/:id(\\w+)', bodyParser.text(), async (req, res) => {
  try {
    // Return a promise to the Fetch API call containing...
    res.send(await db.resetCounter(req.params.id, req.body));
  } catch (e) {
    returnServerError(res, e)
  }
});

// send the key to be deleted.
app.delete('/:id(\\w+)', async (req, res) => {
  try {
    await db.deleteName(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    returnServerError(res, e)
  }
});

// Export out this module to be imported elsewhere
module.exports = app;

