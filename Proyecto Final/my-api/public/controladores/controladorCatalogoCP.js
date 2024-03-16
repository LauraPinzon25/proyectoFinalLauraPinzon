let currentPage = 1;
function loadPage(page) {
  fetch(`/categoria?page=${page}`)
    .then(response => response.json())
    .then(data => {
      const categoria = document.getElementById('categoria');
      categoria.innerHTML='';
      // Crear el encabezado de la tabla
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      const thCategory = document.createElement('th');
      const thTitle = document.createElement('th');
      thCategory.textContent = 'CATEGORÍA';
      thTitle.textContent = 'TÍTULO PELÍCULA';
      headerRow.appendChild(thCategory);
      headerRow.appendChild(thTitle);
      thead.appendChild(headerRow);
      categoria.appendChild(thead);


      // Llenar el cuerpo de la tabla
      const tbody = document.createElement('tbody');
      data.forEach(item => {
        const resultadoItem = document.createElement('tr');
        resultadoItem.classList.add('resultado-item');
        resultadoItem.innerHTML = ` <td>${item.name}</td><td>${item.title}</td>`;
        tbody.appendChild(resultadoItem);
      });

      categoria.appendChild(tbody);

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