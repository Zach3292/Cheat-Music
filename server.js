const express = require('express');
const app = express();
const server = require('http').Server(app);

app.get("/", (req, res) => {
    res.render('index');
  });

app.use(express.static("public"));
app.set("view engine", "ejs");

server.listen(process.env.PORT || 3000);