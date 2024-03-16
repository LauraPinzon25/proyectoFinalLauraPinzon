let currentPage = 1;
function loadPage(page) {
fetch(`/usuario?page=${page}`)
  .then(response => response.json())
  .then(data => {
    // Procesar los datos y mostrarlos en la página HTML
    const usuario = document.getElementById('usuario');
    usuario.innerHTML='';
     // Crear el encabezado de la tabla
     const thead = document.createElement('thead');
     const headerRow = document.createElement('tr');
     const thnombre = document.createElement('th');
     const thTitle = document.createElement('th');
     const correo = document.createElement('th');
     thnombre.textContent = 'NOMBRE';
     thTitle.textContent = 'APELLIDO';
     correo.textContent = 'APELLIDO';
     headerRow.appendChild(thnombre);
     headerRow.appendChild(thTitle);
     headerRow.appendChild(correo);
     thead.appendChild(headerRow);
     usuario.appendChild(thead);
    
    // Llenar el cuerpo de la tabla
    const tbody = document.createElement('tbody');
    data.forEach(item => {
      const resultadoItem = document.createElement('tr');
      resultadoItem.classList.add('resultado-item');
      resultadoItem.innerHTML = ` <td>${item.first_name}</td><td>${item.last_name}</td> <td>${item.email}</td>`;
      usuario.appendChild(resultadoItem);
    });
    usuario.appendChild(tbody);
    document.getElementById('currentPage').textContent = page;
  })
  .catch(error => console.error('Error al obtener los resultados:', error));
 }
function nextPage() {
currentPage++;
loadPage(currentPage);
}

function previousPage() {
if (currentPage > 1) {
  currentPage--;
  loadPage(currentPage);
}
}

function firstPage() {
currentPage = 1;
loadPage(currentPage);
}

loadPage(currentPage);