const $form = document.querySelector(".form");
const $name = document.querySelector("#name");
const $email = document.querySelector("#email");
const $password = document.querySelector("#password");
const $confirmPassword = document.querySelector("#confirmPassword");
const $errors = document.querySelector("#errors");

$form.addEventListener("submit", function (e) {
  e.preventDefault();

  const user = {
    name: $name.value,
    email: $email.value,
    password: $password.value,
    confirmPassword: $confirmPassword.value,
  };

  if (user.password !== user.confirmPassword) {
    $errors.innerHTML = "As senhas não conferem";
    return;
  }

  $errors.innerHTML = "";
  $form.reset();
  fetch("/register-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        $errors.innerHTML = data.error;
      } else {
        window.location.href = "/dashboard";
      }
    })
    .catch((err) => console.log(err));
});
