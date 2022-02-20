const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/headmaster'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/headmaster'));
});
app.listen(process.env.PORT || 8080);
