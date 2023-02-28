var ajouter = document.getElementById("firstform");
var supprimer = document.getElementById("suppall");
var sauvegarder = document.getElementById("sauv");
var ul = document.getElementById("task");
var t = document.getElementById("saisie");
var mn = document.getElementById("principale");
var li = document.getElementsByClassName("liste");
var titre = document.getElementById("titre");
var compteur = document.getElementById("spanr");
var compteur1 = document.getElementById("spanv");
var x = 0 , y = 0;





function createli(event){

    
    
    event.preventDefault();
   
    


    li = document.createElement("li");
    li.className="liste";
    var textadd = t.value;
    //cas chaine vide ou avec des espaces
    
    if(textadd.trim().length == 0){
        return;
    }else{
        var tache = document.createTextNode(textadd);
        var btns = document.createElement("button");
        var btne = document.createElement("button");
        var btnv = document.createElement("button");
        var btup = document.createElement("button");
        var btdown = document.createElement("button");
        btns.className = "supp";
        btne.className = "modif";
        btnv.className = "valider";
        btup.className = "up";
        btdown.className = "down";
        


        li.appendChild(tache);
        li.appendChild(btup);
        li.appendChild(btdown);
        li.appendChild(btns);
        li.appendChild(btne);
        li.appendChild(btnv);
        
        
        ul.appendChild(li);
        

        
        t.value = "";  //reinitialiser le from a vide
        t.focus();
        
        x=x+1;  //incrementation compteur
        compteur.innerHTML = x;
        compteur.classList.remove("hidden");
        document.title = "My TODO"+" ("+ x + ")";
    

    }
  
}


function deleteli(event){
    event.preventDefault();
    if(event.target.className == "supp"){
        var bts = event.target;
        var li = bts.parentNode;
        var ul = li.parentNode;
        ul.removeChild(li);
        x=x-1;  
        compteur.innerHTML = x;
        document.title = "My TODO"+" ("+ x+ ")";
        if(x == 0){
            compteur.classList.add("hidden");
            document.title = "My TODO";
        }
    }
    if(event.target.className == "supp" && li.className == "ligne")
        {
            y=y-1;
            compteur1.innerHTML = y;
            if(y == 0){
                compteur1.classList.add("hidden");
            }
        }
}

function updateli(event){
    event.preventDefault();
    var bte = event.target;
    var li = bte.parentNode;
    if(event.target.className == "modif"){
        var newli = li.firstChild.nodeValue;
        li.firstChild.remove();
        li.lastChild.remove();
        var input = document.createElement("input");
        input.type = "text";
        input.className = "inp";
        input.value = newli;
        bte.className = "ok"; 
        li.appendChild(input);
        li.insertBefore(input, li.firstChild);
        input.addEventListener("keypress" , press);
        return;
    }
    if(event.target.className == "ok"){
        var textnew = li.firstChild;
        var txt = document.createTextNode(textnew.value);
        li.firstChild.remove();
        li.appendChild(txt);
        li.insertBefore(txt , li.firstChild);
        bte.className = "modif";
        var btnv = document.createElement("button");
        btnv.className = "valider";
        li.appendChild(btnv); 
        return;
    }
    function press(event){
        if (event.key == "Enter") {
            event.preventDefault();
            bte.click();
        }
    } 
}




function checkli(event){
    event.preventDefault();
    var btv = event.target;
    var li = btv.parentNode;
    if(event.target.className == "valider" && li.className == "ligne"){
        li.className = "liste";
        y=y-1;
        if(y == 0){
            compteur1.classList.add("hidden");
            compteur1.innerHTML = y;
        }
        compteur1.innerHTML = y;
        return;
    }
    if(event.target.className == "valider"){ 
        li.className = "ligne";
        y=y+1;
        compteur1.classList.remove("hidden");
        compteur1.innerHTML = y;
        return;
    }
    
}




function dbclick(event){
    
    var li = event.target;
    var bte = li.children[1];
    if(event.target.className == "liste" && bte.className == "modif"){
        event.preventDefault();
        var newli = li.firstChild.nodeValue;
        li.firstChild.remove();
        li.lastChild.remove();
        var input = document.createElement("input");
        input.type = "text";
        input.className = "inp";
        input.value = newli;
        bte.className = "ok"; 
        li.appendChild(input);
        li.insertBefore(input, li.firstChild);
        input.addEventListener("keypress" , press);
        return;
    }
    function press(event){
        if (event.key == "Enter") {
            event.preventDefault();
            bte.click();
        }
    }

}



function deplacer(event){
    event.preventDefault();
    var btup = event.target;
    var li = btup.parentNode;
    var ul = li.parentNode;
    if(event.target.className == "up"){
        if(li == ul.firstElementChild){
            return;
        }else{
            var newli = li.firstChild.nodeValue;
            li.firstChild.nodeValue = li.previousSibling.firstChild.nodeValue;
            li.previousSibling.firstChild.nodeValue = newli;
        }
        

    }
    if(event.target.className == "down"){
        if(li == ul.lastElementChild){
            return;
        }else{
            var newli = li.firstChild.nodeValue;
            li.firstChild.nodeValue = li.nextSibling.firstChild.nodeValue;
            li.nextSibling.firstChild.nodeValue = newli;
        } 
    }

}



function deleteall(event){
    event.preventDefault();
    while(ul.firstElementChild) ul.removeChild(ul.firstElementChild);
    // ou ul.innerHTML = "";
    compteur.classList.add("hidden");
    document.title = "My TODO";
    x = 0;
    y = 0
}

function save(){
    var tab = new Array();

 
    for(var i = 0 ; i < ul.children.length ; i++ )
    {
        tab.push(ul.children[i].firstChild.nodeValue);  
    }
    var tb = JSON.stringify(tab);
    var hide = document.getElementById("jlist");
    hide.value = tb;

}



ajouter.addEventListener("submit" , createli);
ul.addEventListener("click" , deleteli);
ul.addEventListener("click", updateli);
ul.addEventListener("click" , checkli);
ul.addEventListener("dblclick", dbclick);
ul.addEventListener("click" , deplacer);
supprimer.addEventListener("click" , deleteall);
sauvegarder.addEventListener("click" , save)






