const $form = document.querySelector(".form");
const $name = document.querySelector("#name");
const $email = document.querySelector("#email")
const $password = document.querySelector("#password");
const $confirmPassword = document.querySelector("#confirmPassword");
const $errors = document.querySelector("#errors");

$form.addEventListener("submit", function (e) {
    e.preventDefault();

    if($name.value.lenght < 3 ){
        $errors.insertAdjacentElement("afterbegin",`<p>Nome invalido</p>`)
    }

    if($password.value != $confirmPassword.value){
        $errors.insertAdjacentElement("afterbegin",`<p>As senhas estao diferentes</p>`)
    }  

    if($password.value == $confirmPassword.value && $name.value.lenght >= 3){
        
    }
})



