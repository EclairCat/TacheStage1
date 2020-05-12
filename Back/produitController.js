//Imports
var db = require("./db");

//Fonctions Routes
module.exports = {


    add: function (req, res) {
        var lastCode = 0;

        db.getConnection(function (err) {
            if (!!err) {
                console.log("error in connection in Db Produit");
                console.log(err);
                res.status(500).send("Error Connection to database");
            }
            else {
                var sql_lastcode = "SELECT max(code) as lastCode from produit"

                db.query(sql_lastcode,
                    function (error, rows) {
                        if (!!error) {
                            console.log("error in query add Produit");
                            console.log(error.message);
                            res.status(500).send("Error in query");
                        }
                        else {
                            lastCode = rows[0].lastCode +1;
                            console.log(lastCode);

                            var sql_add = "INSERT INTO produit  VALUES ('" + lastCode + "', '" + req.body.designation + "', '" + req.body.famille + "', '" + req.body.prix + "')";
                            console.log(sql_add);

                            db.query(sql_add,
                                function (error, rows, fields) {
                                    if (!!error) {
                                        console.log("error in query add Produit");
                                        console.log(error.message);
                                        res.status(500).send("Error in query");
                                    }
                                    else {
                                        console.log("Success query Add Produit");
                                        res.status(200).json(rows);
                                    }
                                }
                            );
                        }
                    });


            }
        });
    },

    delete: function (req, res) {
        var sql_delete = "DELETE FROM produit WHERE code = " + req.body.code;

        console.log(sql_delete);
        console.log(req.body);

        db.getConnection(function (err) {
            if (!!err) {
                console.log("error in connection in Db Produit");
                console.log(err);
                res.status(500).send("Error Connection to database");
            }
            else {
                db.query(sql_delete, //changer la requete
                    function (error, rows, fields) {
                        if (!!error) {
                            console.log("error in query delete Produit");
                            console.log(error.message);
                            res.status(500).send("Error in query");
                        }
                        else {
                            console.log("Success query Delete Produit");
                            res.status(200).json(rows);
                        }
                    });
            }
        });
    },

    update: function (req, res) {
        var sql_delete = "UPDATE produit SET designation = '" + req.body.designation + "', famille = '" + req.body.famille + "', prix = " + req.body.prix + " WHERE code = " + req.body.code;


        db.getConnection(function (err) {
            if (!!err) {
                console.log("error in connection in Db Produit");
                console.log(err);
                res.status(500).send("Error Connection to database");
            }
            else {
                db.query(sql_delete, //changer la requete
                    function (error, rows, fields) {
                        if (!!error) {
                            console.log("error in query Update Produit");
                            console.log(error.message);
                            res.status(500).send("Error in query");
                        }
                        else {
                            console.log("Success query Update Produit");
                            res.status(200).json(rows);
                        }
                    });
            }
        });
    },

    show: function (req, res) {
        var sql_delete = "Select * from produit";



        db.getConnection(function (err) {
            if (!!err) {
                console.log("error in connection in Db Produit");
                console.log(err);
                res.status(500).send("Error Connection to database");
            }
            else {
                db.query(sql_delete, //changer la requete
                    function (error, rows, fields) {
                        if (!!error) {
                            console.log("error in query Show Produit");
                            console.log(error.message);
                            res.status(500).send("Error in query");
                        }
                        else {
                            console.log("Success query Select Produit");
                            res.status(200).json(rows);
                        }
                    });
            }
        });

    }
}