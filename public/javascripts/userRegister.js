const $form = document.getElementById("form");
const $name = document.getElementById("name");
const $email = document.getElementById("email");
const $password = document.getElementById("password");
const $confirmPassword = document.getElementById("confirmPassword");
const $errors = document.getElementById("error");

$form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let newUser = new FormData($form);

  if ($password.value !== $confirmPassword.value) {
    $errors.innerHTML = "As senhas não conferem";
    return;
  }

  $errors.innerHTML = "";
  await fetch("/register-user", {
    method: "POST",
    body: newUser,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        $errors.innerHTML = "data.error";
      } else {
        window.location = "/login";
      }
    });
});

// const user = {
//   name: $name.value,
//   email: $email.value,
//   password: $password.value,
//   confirmPassword: $confirmPassword.value,
// };
