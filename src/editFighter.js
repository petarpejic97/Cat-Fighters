$(document).ready(function(){
    //dohvaćam id koji sam lokalno spremio te pozivam funkciju getCatFromDatabase
    getCatFromDatabase(localStorage.getItem("id"))

    onBtnDelete( localStorage.getItem("id"))
})
function getCatFromDatabase(editId){
    //ajaxom radim upit prema serveru u kojem se traži dohvaćanje mačke s odreenim id-om
    $.ajax({
        type: 'POST',
        url: './backend/getCatData.php',
        data: {editId:editId },
        success: function(response){                       
            var obj = JSON.parse(response);
            console.log(obj)
            //nakon što objekt parsam u JSON poziva se funkcija loadFields
            loadFields(obj)
        }
    })  
}

function loadFields(cat){
    //učitavam dobivene podatke u input polja
    document.getElementById("name").value= cat.name;
    document.getElementById("age").value= cat.age;
    document.getElementById("info").value= cat.catInfo;
    document.getElementById("wins").value= cat.wins;
    document.getElementById("loss").value= cat.loss;
}

function onBtnDelete(id){
    //na klik "delete" buttona vrši se upit prema php skripti koja uklanja mačku iz baze podataka
    $("#delete").click(function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: './backend/delete.php',
            data :{id:id},
            success: function(response){ 
               window.location="./index.php"
            }
        })  
      });
}