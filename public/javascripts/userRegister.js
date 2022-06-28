const $form = document.getElementById("form");
const $nickname = document.getElementById("nickname");
const $email = document.getElementById("email");
const $password = document.getElementById("password");
const $confirmPassword = document.getElementById("confirmPassword");
const $errors = document.getElementById("errors");

$form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let newUser = new FormData($form);

  if ($password.value !== $confirmPassword.value) {
    $errors.innerHTML = "As senhas não conferem";
    return;
  }

  $errors.innerHTML = "";
  await fetch("/user-register", {
    method: "POST",
    body: newUser,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        window.location = "/login";
      } else {
        $errors.innerHTML = data.error.Error;
      }
    });
});
