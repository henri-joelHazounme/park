
document.addEventListener('DOMContentLoaded',function () {
    verifierDonnee();
});

var restaurant;
var operation;
var action;
function verifierDonnee() {
    $("#envoyer").click(function (){
          var res = document.forms["formulaire"]["restaurant"];
    var ope = document.forms["formulaire"]["operation"];
    for (i = 0; i < res.length; i++) {
        if (res[i].checked) {
            restaurant = res[i].value;
            break;
        }
    }

    for (i = 0; i < ope.length; i++) {
        if (ope[i].checked) {
            operation = ope[i].value;
            break;
        }
    }

    if (operation === "1") {
        var act = document.forms["formulaire"]["event"];

        for (i = 0; i < act.length; i++) {
            if (act.options[i].selected === true) {
                action = act.options[i].value;
                break;
            }
        }


    } else if (operation === "2") {
        var act = document.forms["formulaire"]["menu"];
        for (i = 0; i < act.length; i++) {

            if (act.options[i].selected === true) {
                action = act.options[i].value;
                break;
            }
        }
    } else {

    }
    actionAfaire();
     });
   
}

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
