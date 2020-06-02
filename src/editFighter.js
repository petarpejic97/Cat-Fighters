$(document).ready(function(){

    getCatFromDatabase(localStorage.getItem("id"))

    onBtnDelete( localStorage.getItem("id"))
})
function getCatFromDatabase(editId){
    $.ajax({
        type: 'POST',
        url: './backend/getCatData.php',
        data: {editId:editId },
        success: function(response){                       
            var obj = JSON.parse(response);
            loadFields(obj)
        }
    })  
}

function loadFields(cat){
    document.getElementById("name").value= cat.name;
    document.getElementById("age").value= cat.age;
    document.getElementById("info").value= cat.catInfo;
    document.getElementById("wins").value= cat.wins;
    document.getElementById("loss").value= cat.loss;
}

function onBtnDelete(id){
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