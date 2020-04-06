// import la requete http
const http = require('http');
// import app
const app = require('./app');

// Creation du server
const serveur = http.createServer(app);
// Ecoute du serveur sur le port 8000
serveur.listen(7000);




// const http = require('http');

// http.createServer(function (req, res) {
//     res.writeHead(200, {"Content-Type": "application/json"});
//     res.end(req.body)

// }).listen(8000)