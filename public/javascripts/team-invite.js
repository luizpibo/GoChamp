const $form = document.getElementById("form");
const $teamName = document.getElementById("teamName");

$form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const user_id = localStorage.getItem("userId");

  const formData = new FormData();

  formData.append("team_name", $teamName.textContent);
  formData.append("user_id", JSON.parse(user_id));

  await fetch("/team-invite", {
    method: "POST",
    body: formData,
  }).catch((error) => console.error("Error:", error));
});
