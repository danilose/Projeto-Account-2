// espera o DOM estar completamente carregado para continuar
document.addEventListener("DOMContentLoaded", function(event) {

  document.querySelector('#alert').hidden = true;

  // função para validar o preenchimento do formulário
  function formValidation() {

    // pega os inputs
    let inputUser = document.querySelector('#inputUser');
    let inputPassword = document.querySelector('#inputPassword');

    // inicializa a variável de controle da validação
    let validation = true;

    // se o inputUser não foi preenchido
    if (inputUser.value === '') {
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
    if (inputPassword.value === '') {
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
  document.querySelectorAll('input').forEach(input => {
    // para cada input adiciona o evento onChange para validar o formulário
    input.addEventListener('change', formValidation);
    // para cada input adiciona o evento onKeyUp para validar o formulário
    input.addEventListener('keyup', formValidation);

  });

  // adiciona o evento de click no botão de Login
  document.querySelector('#submitLogin').addEventListener('click', () => {

    let alert = document.querySelector('#alert');
    alert.hidden = true;
    alert.innerHTML = '';

    // se o formulário foi preenchido corretamente
    if (formValidation()) {

      // pega os inputs
      let usuario = document.querySelector('#inputUser');
      let senha = document.querySelector('#inputPassword');

      // monta o objeto para a API
      let userLogin = {
        usuario: usuario.value,
        senha: senha.value,
      };

      // chama a API passando o objeto
      axios.post(`${baseURL}/login`, userLogin).then( res => {
        // se o POST obteve sucesso
        if (res.status == 200) { // SUCESSO 🎉

          // pega o token e o objeto usuario da resposta da API
          let { token, usuario } = res.data;

          // guarda o token no localStorage
          localStorage.setItem("@token", token);
          // guarda o usuário no localStorage em forma de string
          localStorage.setItem("@usuario", JSON.stringify(usuario));
          // redireciona para o dashboard
          window.location.replace('/dash.html')
        }

      } ).catch( error => { // Error 😨

        if (error.response) {
          /*
           * A requisição foi feita e o servidor respondeu com
           * um código de status fora do escopo 2xx
           */
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          alert.innerHTML = 'Usuário ou senha inválidos!';
          alert.hidden = false;

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
          console.log('Error', error.message);
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

