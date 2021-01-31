const baseURL =           'https://accenture-java-desafio.herokuapp.com/';
const planosContaParam =  'lancamentos/planos-conta?login=';
const dashBoardParam =    'dashboard?fim=2021-01-31&inicio=2021-01-01&login=';
const pagamentoParam =    'lancamentos/planos-conta';
const transferenciaParam ='lancamentos';

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

const creditTable = document.getElementById('tableBodyCredit');
const bankTable =   document.getElementById('tableBodyBank');
let contaNumero =   document.getElementById('contaNumero');
let saldoInput =    document.getElementById('saldo');
let tableData =     document.getElementById('tableBody');

const tabelaPlanosConta = document.getElementById('tableBody');

// Pega os dados referentes aos planos de conta;
// ENDPOINT na API => /dashboard
axios.get(`${baseURL}${dashBoardParam}${userData.login}`, defaultHeader)
.then(response => {

  const { contaBanco, contaCredito } = response.data;

  console.log(response.data);
  let bankTableBody = contaBanco.lancamentos.map(element => {
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

  let creditTableBody = contaCredito.lancamentos.length > 0 ? contaCredito.lancamentos.map(element => {
    return (
      `
      <tr>
        <th scope="row">01/02/2021</th>
        <td>${element.id}</td>
        <td class="red--text">${element.valor}</td>
      </tr> 
      `
    )
  }).join('') : `<tr><td>Nenhum Lançamento até o momento.</td></tr>`;

  contaNumero.innerHTML = `Conta nº: ${contaBanco.id}`;
  saldoInput.innerHTML =  contaBanco.saldo.toFixed(2);
  creditTable.innerHTML = creditTableBody;
  bankTable.innerHTML =   bankTableBody;
});

// Pega os dados da conta do usuário (conta Banco e conta Crédito);
// ENDPOINT na API => /lancamentos/planos-conta
axios.get(`${baseURL}${planosContaParam}${userData.login}`, defaultHeader)
.then(response => {
  const conteudoTabela = response.data.map(element => {
    return (
      `
      <tr>
        <th scope="row">01/02/2021</th>
        <td>${element.descricao}</td>
        <td>${element.tipoMovimento}</td>
      </tr>
      `
    )
  }).join('')

  tabelaPlanosConta.innerHTML = conteudoTabela;
})


// Lançamentos/planos-conta POST
const botaoPagar =      document.getElementById('payButton');
const botaoTransferir = document.getElementById('transferButton');

botaoPagar.addEventListener('click', () => {
  const descricao =     document.getElementById('pagamentoDescricao').value;
  const id =            document.getElementById('pagamentoId')       .value;
  const login =         document.getElementById('pagamentoLogin')    .value;
  const padrao =        document.getElementById('pagamentoPadrao')   .value;
  const tipoMovimento = document.getElementById('pagamentoTipo')     .value;

  // Envia um pagamento;
  axios.post(`${baseURL}${pagamentoParam}`, {
    descricao,
    id,
    login,
    padrao,
    tipoMovimento
  }, defaultHeader)
  .then(response => {
    console.log('Pagamento realizado com sucesso!');
  })
})

// Lançamentos POST; Transfere dinheiro;
botaoTransferir.addEventListener('click', () => {
  // Abre o modal.
  const filter = document.getElementById('filter');
  const modal = document.getElementById('transferModal');
  filter.classList.add('show-filter');
  modal.classList.add('show-modal');
  // trata a transfêrencia.
})
const confirmaTransferencia = document.getElementById('transferOkButton').addEventListener('click', () => {
  const conta =         document.getElementById('transferenciaConta').value;
  const contaDestino =  document.getElementById('transferenciaDestino').value;
  const data =          document.getElementById('transferenciaData').value;
  const descricao =     document.getElementById('transferenciaDescricao').value;
  const login =         document.getElementById('transferenciaLogin').value;
  const planoConta =    document.getElementById('transferenciaPlano').value;
  const valor =         document.getElementById('transferenciaValor').value;
  // console.log(conta, contaDestino, data, descricao, login, planoConta, valor);

  axios.post(`${baseURL}lancamentos`, {
    conta,
    contaDestino,
    data,
    descricao,
    login,
    planoConta,
    valor
  }, defaultHeader).then(response => {
    console.log(response);
  })
})

// fecha o modal;
const filter = document.getElementById('filter')
.addEventListener('click', (event) => {
  if (event.target.className.includes('filter')) {
    document.getElementById('filter').classList.remove('show-filter');
    document.getElementById('transferModal').classList.remove('show-modal');
  }
})

// LOGOUT;
const logoutButton = document.getElementById('logoutButton')
.addEventListener('click', () => {
  localStorage.clear();
  window.location.replace('/');
});
