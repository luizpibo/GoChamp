const $form = document.querySelector(".form");
const $name = document.querySelector("#name");
const $email = document.querySelector("#email");
const $password = document.querySelector("#password");
const $confirmPassword = document.querySelector("#confirmPassword");
const $errors = document.querySelector("#errors");

$form.addEventListener("submit", async function (e) {
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
  // $form.reset();
  await fetch("/register-user", {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        $errors.innerHTML = data.error;
      }else {
        window.location = '/login'
      }
    });
});
