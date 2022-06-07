const $form = document.querySelector("#form");
const $name = document.querySelector("#name");
const $game = document.querySelector("#games");
const $error = document.querySelector("#error");

$form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newTeam = {
    name: $name.value,
    game: $game.value,
    token: localStorage.getItem("token-GoChamp"),
  };
  fetch("/register-team", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTeam),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        $error.innerHTML = "Já existe uma equipe com esse nome";
      } else {
        $form.reset();
        console.log("time cadastrado com sucesso");
      }
    });
});
