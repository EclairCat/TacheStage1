//Imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = express.Router();
var cors = require('cors');

//Import Controller 
var produitController = require("./produitController");

// Router
exports.router = (function () {
    //Config api
    apiRouter.use(bodyParser());
    apiRouter.use(cors());    
   
    //Exemple de route : apiRouter.route('/rdv/denieRdv').post(verifyTokenMedecin, rdvController.denieRdv);
    
    apiRouter.route('/addProduit').post(produitController.add);
    apiRouter.route('/delProduit').delete(produitController.delete);
    apiRouter.route('/updateProduit').post(produitController.update);
    apiRouter.route('/showProduit').get(produitController.show);


    return apiRouter;
})();