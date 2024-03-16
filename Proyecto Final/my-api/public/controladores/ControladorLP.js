let currentPage = 1;
function loadPage(page) {
fetch(`/lenguaje?page=${page}`)
  .then(response => response.json())
  .then(data => {
    // Procesar los datos y mostrarlos en la página HTML
    const lenguaje = document.getElementById('Lenguaje');
    lenguaje.innerHTML='';
    // Crear el encabezado de la tabla
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const thlenguaje = document.createElement('th');
    const thTitle = document.createElement('th');
    thlenguaje.textContent = 'TÍTULO PELÍCULA';
    thTitle.textContent = 'LENGUAJE';
    headerRow.appendChild(thlenguaje);
    headerRow.appendChild(thTitle);
    thead.appendChild(headerRow);
    lenguaje.appendChild(thead);

       // Llenar el cuerpo de la tabla
       const tbody = document.createElement('tbody');
       data.forEach(item => {
         const resultadoItem = document.createElement('tr');
         resultadoItem.classList.add('resultado-item');
         resultadoItem.innerHTML = ` <td>${item.title}</td><td>${item.name}</td>`;
         tbody.appendChild(resultadoItem);
       });
 
       lenguaje.appendChild(tbody);
 
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
