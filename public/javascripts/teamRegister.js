const $form = document.querySelector("#form");
const $name = document.querySelector("#name");
const $game = document.querySelector("#game");
const $error = document.querySelector("#error");
const $image = document.querySelector("#image");

$form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let newTeam = new FormData($form);
  newTeam.append("token", localStorage.getItem("token-GoChamp"));

  $error.innerHTML = "";
  await fetch("/register-team", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token-GoChamp")}`,
    },
    body: newTeam,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      if (data.success) {
        $form.reset();
        $error.innerHTML = "time cadastrado com sucesso!";
        location.reload();
      } else {
        $error.innerHTML = "Já existe uma equipe com esse nome";
      }
    })
    .catch((err) => {
      $error.innerHTML = "Erro ao cadastrar time";
    });
});
