const $form = document.querySelector("#form");

const $nickname = document.querySelector("#nickname");
const $password = document.querySelector("#password");
const $errors = document.querySelector("#errors");

$form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const user = {
    nickname: $nickname.value,
    password: $password.value,
  };

  await fetch("/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        localStorage.setItem("token-GoChamp", JSON.stringify(data.JWT_token));
        localStorage.setItem("userId", JSON.stringify(data.userId));
        window.location.href = "/dashboard";
      } else {
        $errors.innerHTML = data.error;
        return undefined;
      }
    });
});

async function accessDashboard(response) {
  //desestruturando objeto que foi recebido pelo fetch de login
  const { token, userId } = response;

  //Checando se a token e id de usuario
  if (token && userId) {
    //criando variaveis que serao usadas na requisicao
    const url = `/dashboard?userId=${userId}`;
    const authToken = `Bearer ${token}`;

    //Tentando acessar o dashboard
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: authToken,
      },
      redirect: "follow",
    })
      .then((data) => {
        if (data.status === 200) {
          window.location.href = "http://localhost:3000/dashboard";
        } else {
          return undefined;
        }
      })
      .catch((err) => {
        console.log("deu erro", err);
      });
  }
}
