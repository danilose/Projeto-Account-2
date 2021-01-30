let baseURL = 'https://accenture-java-desafio.herokuapp.com/';
let urlParam = 'lancamentos/planos-conta?login=';

let userData = JSON.parse(localStorage.getItem('usuario'));

let defaultHeader = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsdmlsbGFyaW0xMCIsImlkVXN1YXJpbyI6NDYsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2MTE5NTQ3ODQsImV4cCI6MTYxMTk1ODM4NH0.oGcfoW2I0Tlg8DL7LtGvjxMEyk_O7Aek7CrtpVkgMPhMYVVVs2EKqhIFdbLi-5TlnrRl2c954CIu3-S-xG1PEA'
}

let tableData = document.getElementById('tableBody');

console.log('chegou');
axios.get(`${baseURL}${urlParam}lvillarim10`, defaultHeader)
.then(response => {
  let tableBodyContent = response.data.map(element => {
    return (
      `
      <tr>
        <th scope="row">01/02/2021</th>
        <td>${element.descricao}</td>
        <td class="red--text">${element.tipoMovimento}</td>
      </tr>
      `
    )
  }).join('');

  tableData.innerHTML = tableBodyContent;

});