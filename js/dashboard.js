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

// Coloca o nome de boas vindas
document.getElementById('welcomeMessage').innerHTML = `Olá ${userData.nome}!`; 

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

  // Mostra Saldo e nº de conta no box de profile e colocar elementos em tabela.
  contaNumero.innerHTML = `Conta nº: ${contaBanco.id}`;
  saldoInput.innerHTML =  contaBanco.saldo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  creditTable.innerHTML = creditTableBody;
  bankTable.innerHTML =   bankTableBody;
});//Fim do GET.

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

// Lançamentos/planos-conta POST.
const botaoPagar = document.getElementById('paymentButton');
botaoPagar.addEventListener('click', () => {
  const filter = document.getElementById('paymentFilter');
  const modal = document.getElementById('paymentModal');
  filter.classList.add('show-filter');
  modal.classList.add('show-modal');

})

// verifica se o clique foi no filtro e fecha o modal caso tenha sido.
function fechaModal(tipo, filtro, classe, event) {
  // o primeiro if será utilizado para o botão cancelar.
  if (!classe && !event) {
    document.getElementById(filtro).classList.remove('show-filter');
    document.getElementById(tipo).classList.remove('show-modal');
  }
  if (event.target.className.includes(classe)) {
    document.getElementById(filtro).classList.remove('show-filter');
    document.getElementById(tipo).classList.remove('show-modal');
  }
}


const confirmaPagamento = document.getElementById('confirmPayment');

confirmaPagamento.addEventListener('click', () => {
  const descricao =     document.getElementById('pagamentoDescricao').value;
  const id =            document.getElementById('pagamentoId')       .value;
  const login =         document.getElementById('pagamentoLogin')    .value;
  const padrao =        document.getElementById('pagamentoPadrao')   .value;
  const tipoMovimento = document.getElementById('pagamentoTipo')     .value;
  
  axios.post(`${baseURL}${pagamentoParam}`, {
    descricao,
    id,
    login,
    padrao,
    tipoMovimento
  }, 
  defaultHeader)
  .then(() => {
    console.log('Pagamento realizado com sucesso!');
  })
});

// Fecha o modal de pagamentos.
const fechaModalPagamentos = document.getElementById('paymentFilter')
.addEventListener('click', (event) => {
    fechaModal('paymentModal', 'paymentFilter', 'show-filter', event);
})

// Botão cancelar do modal de pagamentos.
const botaoCancelarPagamentos = document.getElementById('cancelPayment')
.addEventListener('click', () => {
  fechaModal('paymentModal', 'paymentFilter');
})

// Lançamentos POST; Transfere dinheiro;
const botaoTransferir = document.getElementById('transferButton');
botaoTransferir.addEventListener('click', () => {
  // Abre o modal.
  const filter = document.getElementById('filter');
  const modal = document.getElementById('transferModal');
  filter.classList.add('show-filter');
  modal.classList.add('show-modal');
  // trata a transfêrencia.
})
const confirmaTransferencia = document.getElementById('transferOkButton')
.addEventListener('click', () => {
  const conta =         document.getElementById('transferenciaConta').value;
  const contaDestino =  document.getElementById('transferenciaDestino').value;
  const data =          document.getElementById('transferenciaData').value;
  const descricao =     document.getElementById('transferenciaDescricao').value;
  const login =         document.getElementById('transferenciaLogin').value;
  const planoConta =    document.getElementById('transferenciaPlano').value;
  const valor =         document.getElementById('transferenciaValor').value;

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

// Fecha o modal;
const fechaModalTransferencias = document.getElementById('filter')
.addEventListener('click', (event) => {
  fechaModal('transferModal', 'filter', 'filter', event);
})

// Botão Cancelar do modal de Transferências.
const botaoCancelarTransferecias = document.getElementById('cancelButton')
.addEventListener('click', () => {
  document.getElementById('filter').classList.remove('show-filter');
  document.getElementById('transferModal').classList.remove('show-modal');
})

// Função de LOGOUT do botão no HEADER;
const logoutButton = document.getElementById('logoutButton')
.addEventListener('click', () => {
  localStorage.clear();
  window.location.replace('/');
});
