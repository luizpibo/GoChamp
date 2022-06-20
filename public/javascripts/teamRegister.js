const $form = document.querySelector("#form");
const $name = document.querySelector("#name");
const $game = document.querySelector("#game");
const $error = document.querySelector("#error");
const $image = document.querySelector("#image");

$form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let newTeam = new FormData($form);
  newTeam.append("token", localStorage.getItem("token-GoChamp"));
  console.log("new team", $name, $game, $error);
  await fetch("/register-team", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token-GoChamp")}`,
    },
    body: newTeam,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        $error.innerHTML = "Já existe uma equipe com esse nome";
      } else {
        $form.reset();
        console.log("time cadastrado com sucesso");
      }
    })
    .catch((err) => {
      $error.innerHTML = "Erro ao cadastrar time";
    });
});
