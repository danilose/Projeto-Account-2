const baseURL = 'https://accenture-java-desafio.herokuapp.com/';
const planosContaParam = 'lancamentos/planos-conta?login=';
const dashBoardParam = 'dashboard?fim=2021-01-31&inicio=2021-01-01&login=';

const userData = JSON.parse(localStorage.getItem('@usuario'));
const token = localStorage.getItem('@token');
console.log(userData);
let defaultHeader = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem('@token')
  }
}

// Impede o acesso a dash sem autenticação;
if (!token) {
  window.location.replace('/');
}

let tableData = document.getElementById('tableBody');
let contaNumero = document.getElementById('contaNumero');
let saldoInput = document.getElementById('saldo');

// Pega os dados referentes aos planos de conta;
// ENDPOINT na API => /dashboard
axios.get(`${baseURL}${dashBoardParam}${userData.login}`, defaultHeader)
.then(response => {


  const { contaBanco, contaCredito } = response.data;


  console.log(response.data);
  let tableBodyContent = contaBanco.lancamentos.map(element => {
    return (
      `
      <tr>
        <th scope="row">01/02/2021</th>
        <td>${element.descricao}</td>
        <td class="red--text">${element.valor}</td>
      </tr>
      `
    )
  }).join('');

  contaNumero.innerHTML = `Conta nº: ${contaBanco.id}`;
  saldoInput.innerHTML = contaBanco.saldo.toFixed(2);
  tableData.innerHTML = tableBodyContent;
});

// Pega os dados da conta do usuário (conta Banco e conta Crédito);
// ENDPOINT na API => /lancamentos/planos-conta
axios.get(`${baseURL}${planosContaParam}${userData.login}`, defaultHeader)
.then(response => {
  console.log(response.data);
})


// LOGOUT;
const logoutButton = document.getElementById('logoutButton')
.addEventListener('click', () => {
  localStorage.clear();
  window.location.replace('/');
});
