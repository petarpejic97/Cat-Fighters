$(document).ready(function(){
    $("#submit").click(function(){
        var inputs = document.querySelectorAll("input");
         for (var i = 0; i < inputs.length; i++) {
        // only validate the inputs that have the required attribute                
                if(inputs[i].value == ""){
                    // found an empty field that is required
                    alert("Please fill all required fields");
                    return false;
                }                
        }   
        $("#forma").submit();
    })
})