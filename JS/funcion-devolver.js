// Funcion par devolver el auto

function devolverAuto(){

  container.innerHTML = '';
  containerAlquiler.innerHTML = '';

  const formularioDevolver = document.createElement('form');
  formularioDevolver.className = 'formulario-devolver';

  const textoDominio = document.createElement('p');
  textoDominio.innerText = 'Dominio del vehiculo a devolver'
  textoDominio. className = 'texto-dominio'
  
  const ingresarDominio = document.createElement('input');
  ingresarDominio.className = 'agregar-dominio';
  ingresarDominio.placeholder = 'Ej: ABC123';

  const botonDevolucion = document.createElement('button');
  botonDevolucion.innerText = 'Devolver vehiculo';
  botonDevolucion.className = 'boton-devolucion';

  container.appendChild(formularioDevolver);
  formularioDevolver.appendChild(textoDominio);
  formularioDevolver.appendChild(ingresarDominio);
  formularioDevolver.appendChild(botonDevolucion);


  botonDevolucion.onclick = () => {
      const autoAdevolver = ingresarDominio.value;
      const autoDevuelto = listadoAutos.find(el => el.dominio === autoAdevolver);
      if (!autoDevuelto) {
          alert('No se encontró ningún vehículo con ese dominio');
      } else if (autoDevuelto.disponible) {
           alert('El vehículo ya fue devuelto');
      } else {
          formularioDevolver.innerHTML="";
          const devolucionExitosa = document.createElement('h2');
          devolucionExitosa.innerText = '¡Devolución exitosa, gracias por utilizar nuestro servicio!';
          devolucionExitosa.className = 'operacionExitosa';
          formularioDevolver.appendChild(devolucionExitosa);
          autoDevuelto.disponible = true;
      }
  }
}