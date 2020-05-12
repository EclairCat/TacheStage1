
//Imports
var express = require('express');
var apiRouter = require('./ApiRouter').router;

//Init Server
var serveur = express();

//Configure routes
serveur.use('/api/', apiRouter);

//Launch server
serveur.listen(4000, function () {
        console.log('server en écoute sur port 4000');
});