
// Variable para almacenar los elementos del carrito
const carrito = [];
// Función para agregar un item al carrito
function agregarAlCarrito(item) {
  carrito.push(item);
  actualizarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
  const carritoItems = document.getElementById('carritoItems');
  const totalPrecio = document.getElementById('totalPrecio');
  

  // Limpiar el carrito previo
  carritoItems.innerHTML = '';

  // Calcular el total de precios
  let total = 0;
  carrito.forEach(item => {
    total += item.precio;
    const li = document.createElement('li');
    li.textContent = `${item.precio} COP`;
    carritoItems.appendChild(li);
  });

  // Mostrar el total en la página
  totalPrecio.textContent = total + ' COP';

  
}
function limpiarCarrito() {
  carrito.length = 0;
  actualizarCarrito();
}
let currentPage = 1;
function loadPage(page) {
fetch(`/ruta?page=${page}`)
  .then(response => response.json())
  .then(data => {
    // Procesar los datos y mostrarlos en la página HTML
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML='';
    // Crear el encabezado de la tabla
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const thresultadosDiv = document.createElement('th');
    const apellido = document.createElement('th');
    const titulo = document.createElement('th');
    const description = document.createElement('th');
    const precio = document.createElement('th');
    const thTitle = document.createElement('th');
    thresultadosDiv.textContent = 'Nombre Actor';
    apellido.textContent = 'Apellido Actor';
    titulo.textContent = 'Titulo Película';
    description.textContent = 'Descripción Película';
    precio.textContent = 'Precio';
    thTitle.textContent = 'Agregar al Carrito';
    headerRow.appendChild(thresultadosDiv);
    headerRow.appendChild(apellido);
    headerRow.appendChild(titulo);
    headerRow.appendChild(description);
    headerRow.appendChild(precio);
    headerRow.appendChild(thTitle);
    
    thead.appendChild(headerRow);
    resultadosDiv.appendChild(thead);
    
    // Llenar el cuerpo de la tabla
    const tbody = document.createElement('tbody');
    data.forEach(item => {
      const precioAleatorio = Math.floor(Math.random() * 100000);
      const resultadoItem = document.createElement('tr');
      resultadoItem.classList.add('resultado-item');
      resultadoItem.innerHTML = `<td>${item.first_name}</td> <td>${item.last_name}</td> <td>${item.title}</td>
            <td>${item.description}</td>
            <td>$${precioAleatorio}</td>
            <td><button onclick="agregarAlCarrito({ nombre: '${item.title}', precio: ${precioAleatorio} })">Agregar al carrito</button></td>`;
            tbody.appendChild(resultadoItem);
    });
    resultadosDiv.appendChild(tbody);
 
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