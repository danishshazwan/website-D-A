window.addEventListener("load", function () {

    var form = document.getElementById("mainForm");

    var requiredFields = document.querySelectorAll(".required");
    var highlightFields = document.querySelectorAll(".hilightable");

    /* Highlight bila klik */
    highlightFields.forEach(function(field){

        field.addEventListener("focus", function(){
            this.classList.add("highlight");
        });

        field.addEventListener("blur", function(){
            this.classList.remove("highlight");
        });

    });

    /* Validation masa submit */
    form.addEventListener("submit", function(e){

        var valid = true;

        requiredFields.forEach(function(field){

            if(field.value.trim() === ""){
                field.classList.add("error");
                valid = false;
            }
            else{
                field.classList.remove("error");
            }

        });

        if(!valid){
            e.preventDefault();
            alert("Please fill all required fields");
        }

    });

});