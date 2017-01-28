/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


document.ready(function(){
    $("#envoyer").click(function (){
          $.get("http://localhost:8080/park/evenements/KINAME", function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });

    
    
});

function actionAfaire() {
    switch (action) {
        case "ajouter un nouveau":
            formulaireEvenement();
            break;
        case "supprimer un évenement":
            alert("ok");
            break;
        case "lister des évéments":
            alert("ok");
            break;
        default :
            alert("rien pris");
    }
}
function formulaireEvenement() {
    alert("allo");
    listerEvenement();
    
     document.getElementById("services").innerHTML =
             '<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">ajouter</button>';
}
function listerEvenement() {
    var xhttp;
    xhttp = new XMLHttpRequest();   
    xhttp.open('GET', "http://localhost:8080/park/evenements/KINAME", true);  
    xhttp.send();  
    
    xhttp.onreadystatechange = (function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            document.getElementById("demo").innerHTML = xhttp.responseText;
            alert(xhttp.responseText);
        }
         alert("satut code "+xhttp.status);
         alert("reponse "+ xhttp.responseText);
    });
   
    alert('soleil');
   
}
