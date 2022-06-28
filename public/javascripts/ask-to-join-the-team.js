const $form = document.getElementById("form");
const $teamName = document.getElementById("teamName");
const $error = document.getElementById("error");

$form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const teamName = $teamName.textContent;
  console.log("Nome do time", teamName);

  await fetch("/dashboard/ask-to-join-the-team", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ team_name: $teamName.textContent }),
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        $error.innerText = "Convite enviado com sucesso!";
      } else {
        $error.innerText = data.error;
      }
    });
});
