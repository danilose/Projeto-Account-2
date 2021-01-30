  // url base da API
  const baseURL = 'https://accenture-java-desafio.herokuapp.com';

  // função para adicionar e remover estilo quando o input está válido
  function inputValid(obj) {
    obj.classList.remove('is-invalid');
    obj.classList.add('is-valid');
  }

  // função para adicionar e remover estilo quando o input está inválido
  function inputInvalid (obj) {
    obj.classList.remove('is-valid');
    obj.classList.add('is-invalid');
  }
