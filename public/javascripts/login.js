const $form = document.querySelector(".form");

const $email = document.querySelector("#email");
const $password = document.querySelector("#password");

$form.addEventListener("submit", function (e) {
  e.preventDefault();

  const user = {
    email: $email.value,
    password: $password.value,
  };

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.log(data.error);
        $errors.innerHTML = data.error;
      } else {
        localStorage.setItem("token-GoChamp", data);
        window.location.href = "/dashboard";
      }
    })
    .catch((err) => console.log(err));
});
