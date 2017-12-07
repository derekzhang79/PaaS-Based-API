// Require express from package.json
const express = require('express');

// Use express
const app = express();

// Serve up our static files (HTML, CSS, JS) from the 'statics' folder
app.use(express.static('static', { extensions: ['html'] }));

// Require API upon hitting '/api'
app.use('/api', require('./api'));

// Set the environment variable PORT or use 8080
const port = process.env.PORT || 8080;

// Start our app!
app.listen(port, (err) => {
  if (err) console.log('error', err);
  else console.log(`app listening on port ${port}`);
});
