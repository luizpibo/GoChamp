const $form = document.getElementById("form");
const $teamName = document.getElementById("teamName");

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
  }).then((data) => {
    console.log(data);
  });
});
