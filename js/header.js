let isLogged = localStorage.getItem('@token');
  
// show or hide dashboard Button.
if (!isLogged) {
  document.getElementById('dashButton').style.display = 'none';
} 