async function enviarCorreo() {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const telefono = document.getElementById('telefono').value;
  const to = document.getElementById('to').value;
  document.getElementById('totalCompra').textContent = totalPrecio;
  
  const response = await fetch('/enviar-correo', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({nombre,apellido,telefono,to,totalPrecio })
  });
  const resultado = await response.json();
  const mensajeElemento = document.querySelector('#mensaje');
  if (resultado.success) {
    mensajeElemento.textContent ="Correo enviado correctamente.";
  } else {
    mensajeElemento.textContent ="Error al enviar el correo.";
  }
}