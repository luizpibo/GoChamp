const $form = document.querySelector(".form");

const $email = document.querySelector("#email");
const $password = document.querySelector("#password");
const $errors = document.querySelector("#errors");

$form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const user = {
    email: $email.value,
    password: $password.value,
  };

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        $errors.innerHTML = data.error;
        return undefined;
      } else {
        console.log("login", data);
        return data;
      }
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });

  if (response) {
    console.log("server response", response);
    localStorage.setItem("token-GoChamp", JSON.stringify(response.JWT_token));
    localStorage.setItem("userId", JSON.stringify(response.userId));
    window.location.href = "/dashboard";
  }
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
