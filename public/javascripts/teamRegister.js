const $form = document.querySelector("#form");
const $name = document.querySelector("#name");
const $game = document.querySelector("#game");
const $error = document.querySelector("#error");
const $image = document.querySelector("#image");

$form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let newTeam = new FormData($form);

  $error.innerHTML = "";
  await fetch("/dashboard/team-register", {
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token-GoChamp")}`,
    // },
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
        $error.innerHTML = data.error;
      }
    })
    .catch((err) => {
      $error.innerHTML = err;
    });
});
