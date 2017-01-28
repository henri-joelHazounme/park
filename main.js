/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var http = require('http');
var url = require('url');
lancerServeur();
function lancerServeur (){    
    console.log('j'+'écoute sur le 8080 .....');
    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    var multer = require('multer'); // v1.0.5
    var upload = multer(); // for parsing multipart/form-data

    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    app.get('/park/evenements/:identifiant', function(req, res) { 
        console.log("get dans nodejs");
        getEvenement(req.params.identifiant,res);               
    });
    app.post('/park/evenements', upload.array(), function (req, res, next) {
         console.log("bobobob");
        console.log(req.body);
        console.log(JSON.stringify(req.body))
        postEvenement(req.body,res);        
    });
    app.put('/park/evenements/:identifiant', function(req, res) {       
        putEvenement(req.params.identifiant,req.body);
        res.json(ok);
    });
    app.delete('/park/evenements/:identifiant', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        deleteEvenement(req.params.identifiant);
        res.end('supprimer element '+req.params.identifiant);
    });
    app.listen(8080);
}

function postEvenement(body,res){
    var mongo = require('mongodb');
    res.setHeader('Content-Type', 'application/json');  
    if(body !== null){
       var server = new mongo.Server("localhost",27017);
       var db = new mongo.Db("Park", server, {safe:true});
       db.open(function (err, db) {           
           db.collection("evenements", function (err, collection) {               
               collection.insert(body,function (err,result){
                   if(result !==null){
                      res.statusCode = 200;
                      res.end("Évenement a ajouté");
                   }else{
                       res.statusCode = 404;
                       console.log(err);
                       res.end("Évenement non ajouté");
                       
                   }
               });
               
               db.close();
           });
       });
    }else return false;
    return true;
}
function getEvenement(identifiant,res){
    var mongo = require("mongodb");
    var server = new mongo.Server("localhost", 27017);
    var db = new mongo.Db("Park", server, {safe:true});
    res.setHeader('Content-Type','text/json');  
    var response;
    db.open(function (err, db){
       
        db.collection("evenements", function (err, collection) {        
        var cursor = collection.find({Nom: identifiant}, {Nom:true, description:true, Date:true,Image:true});         
        cursor.toArray(function (err, response) {   
            console.log('RESSOURCE');
            if(response.length !== 0){
                res.statusCode=200;
                for(var i = 0; i < response.length; i++){
                    console.log("ok5");
                    var album = response[i];
                    res.json(album);
                    console.log("nom evenement ", album.Nom, "et le jour est ", album.Date + ".");
                }
            }else{               
                res.statusCode =404;
                var tmpresultat = {error:"Not Found !!!"};
                res.end(JSON.stringify(tmpresultat));
            }            
                db.close();
           });
        });
    });    
}

function putEvenement(identifiant,body){
    var mongo = require("mongodb");
    var server = new mongo.Server("localhost", 27017);
    var db = new mongo.Db("Park", server, {safe:true});
    db.open(function (err, db) {
      db.collection("evenements", function (err, collection) {
        collection.update({Nom: identifiant}, {$set: body}, function (err, result) {
            console.log("Mise à jour appliquée");
            db.close();
        });
      });
    });
    return true;
}

function deleteEvenement(identifiant){
    var mongo = require("mongodb");
    var server = new mongo.Server("localhost", 27017);
    var db = new mongo.Db("park", server, {safe:true});
    var result;
    db.open(function (err, db) {
      db.collection("evenements", function (err, collection) {
        collection.deleteOne({Nom: identifiant}, function (err, result){          
            db.close();
        });
      });
    });  
    return result;
}


