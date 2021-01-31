// espera o DOM estar completamente carregado para continuar
document.addEventListener("DOMContentLoaded", function (event) {
  var getUrl = window.location;

  console.log(getUrl);

  // url base da API
  const baseURL = "https://accenture-java-desafio.herokuapp.com";

  // função para adicionar e remover estilo quando o input está válido
  function inputValid(obj) {
    obj.classList.remove("is-invalid");
    obj.classList.add("is-valid");
  }

  // função para adicionar e remover estilo quando o input está inválido
  function inputInvalid(obj) {
    obj.classList.remove("is-valid");
    obj.classList.add("is-invalid");
  }

  // função para validar o preenchimento do formulário
  function formValidation() {
    // pega os inputs
    let inputUser = document.querySelector("#fname");
    let inputPassword = document.querySelector("#fsenha");

    // inicializa a variável de controle da validação
    let validation = true;

    // se o inputUser não foi preenchido
    if (inputUser.value === "") {
      // muda o estilo pra input inválido
      inputInvalid(inputUser);
      // muda a variável de controle
      validation = false;
    } else {
      // se foi preenchido
      // então muda o estilo pra input válido
      inputValid(inputUser);
    }

    // se o inputPassword não foi preenchido
    if (inputPassword.value === "") {
      // muda o estilo pra input inválido
      inputInvalid(inputPassword);
      // muda a variável de controle
      validation = false;
    } else {
      // se foi preenchido
      // então muda o estilo pra input válido
      inputValid(inputPassword);
    }

    // retorna a variável de controle
    return validation;
  }

  // pega todos os inputs
  document.querySelectorAll("input").forEach((input) => {
    // para cada input adiciona o evento onChange para validar o formulário
    input.addEventListener("change", formValidation);
  });

  // adiciona o evento de click no botão de Login
  document.querySelector("#submitSignup").addEventListener("click", () => {
    // se o formulário foi preenchido corretamente
    if (formValidation()) {
      // pega os inputs
      let cpf = document.querySelector("#fCPF");
      let nome = document.querySelector("#fname");
      let login = document.querySelector("#flogin");
      let senha = document.querySelector("#fsenha");

      // monta o objeto para a API
      let userSignup = {
        cpf: cpf.value,
        login: login.value,
        nome: nome.value,
        senha: senha.value,
      };

      console.log(cpf);

      // chama a API passando o objeto
      axios
        .post(`${baseURL}/usuarios`, userSignup)
        .then((res) => {
          // se o POST obteve sucesso
          if (res.status == 200) {
            // SUCESSO 🎉

            // redireciona para o dashboard
            window.location.replace("/login.html");
          }
        })
        .catch((error) => {
          // Error 😨

          if (error.response) {
            /*
             * A requisição foi feita e o servidor respondeu com
             * um código de status fora do escopo 2xx
             */
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            let alert = document.querySelector("#alert");
            alert.classList.add("alert-danger");
            alert.innerHTML = "Erro ao cadastrar usuário!";
            alert.classList.add("visible");
            return Promise.reject(error.response);
          } else if (error.request) {
            /*
             * A requisição foi feita mas não houve resposta
             */
            console.log(error.request);
          } else {
            /*
             * Alguma coisa aconteceu na configuração
             * da requisição e gerou um erro
             */
            console.log("Error", error.message);
          }
          /*
           * Alguma coisa aconteceu na configuração
           * da requisição e gerou um erro
           */
          console.log(error.config);
        });
    }
  });
});
