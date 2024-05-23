// SIMULADOR DE RENT A CAR

// Class constructora
class AutosEnAlquiler{
    constructor(id, marca, modelo, dominio, precio, foto, disponible){
        this.id = id
        this.marca = marca
        this.modelo = modelo
        this.dominio = dominio
        this.precio = precio
        this.foto = foto
        this.disponible = disponible
    };
}

// Array
const listadoAutos = [
    new AutosEnAlquiler(1, 'Ford', 'Ka', 'KUZ969', 5000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Ford_Ka_rear_20071011.jpg/1200px-Ford_Ka_rear_20071011.jpg', true),
    new AutosEnAlquiler(2, 'Chevrolet', 'Cruze', 'LTR089', 4500, 'https://cdn.motor1.com/images/mgl/1bRAw/s3/lanzamiento-chevrolet-cruze-lt-2020.jpg', true),
    new AutosEnAlquiler(3, 'Volkswagen', 'Polo', 'KYU124', 3500, 'https://cdn.motor1.com/images/mgl/nO4JG/s3/lanzamiento-volkswagen-polo-2022.jpg', false),
    new AutosEnAlquiler(4, 'Suzuki', 'Fun', 'FTR471', 6000, 'https://www.deruedas.com.ar/images/autos/588/588738_1_im.jpg', true)
]


function autosStorage (){
   const autosGuardados = JSON.parse(localStorage.getItem('autos'));
   if (autosGuardados){
    listadoAutos.length = 0;
   for (const autosDelArray of autosGuardados){
   listadoAutos.push(autosDelArray);
   }
   }
}
autosStorage();

//Funcion crear las tarjetas y para mostrar los autos para alquilar
function solicitarAuto(arrayDeAutos) {

    container.innerHTML = '';
    containerAlquiler.innerHTML = '';

    arrayDeAutos.forEach(el => {

        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';

        const marcaYmodelo = document.createElement('p');
        marcaYmodelo.innerText = `${el.marca} ${el.modelo}`;
        marcaYmodelo.className = 'marca';

        const precioPorDia = document.createElement('p');
        precioPorDia.className = 'precioPorDia'
        precioPorDia.innerText = `$${el.precio} /día`;

        const disponibilidad = document.createElement('p');
        disponibilidad.className = 'disponibilidad';
        el.disponible ? disponibilidad.innerText = "Disponible" : disponibilidad.innerText = "No disponible";

        const imagen = document.createElement('img');
        imagen.src = el.foto;
        imagen.className = 'foto';

        const botonAlquilar = document.createElement('button');
        botonAlquilar.innerText = "Alquilar";
        botonAlquilar.className = 'boton-alquilar';

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(marcaYmodelo);
        tarjeta.appendChild(precioPorDia);
        tarjeta.appendChild(disponibilidad);
        tarjeta.appendChild(botonAlquilar);
        container.appendChild(tarjeta);

        botonAlquilar.onclick = () => {
            const autoId = el.id;
            const autoElegido = listadoAutos.find(el => el.id === autoId);

            if (!autoElegido.disponible) {
                alert("El auto seleccionado no se encuentra disponible, vuelva a elegir otro");

            } else {
                confirmarAuto(autoElegido);
            }
        };
    });
}


function confirmarAuto(autoElegido){
    container.innerHTML = '';
  
  const diasDeAlquiler = document.createElement('form');
  diasDeAlquiler.id = 'dias-alquiler';

  const ingresarCantidadDias = document.createElement('p');
  ingresarCantidadDias.innerText = 'Cantidad de dias a alquilar el auto'; 
  
  const cantidadDias = document.createElement('input');
  cantidadDias.className = 'cantidad-dias';
  cantidadDias.type = "number";
  cantidadDias.min = "1";

  const botonConfirmarAlquiler = document.createElement('button');
  botonConfirmarAlquiler.innerText = 'Confirmar alquiler';
  
  diasDeAlquiler.appendChild(ingresarCantidadDias);
  diasDeAlquiler.appendChild(cantidadDias);
  diasDeAlquiler.appendChild(botonConfirmarAlquiler);
  container.appendChild(diasDeAlquiler);

  botonConfirmarAlquiler.onclick = (event) => {
    event.preventDefault();

    const containerAlquiler = document.getElementById('containerAlquiler')

    const contenedorPrecio = document.createElement('div');
    contenedorPrecio.className = 'contenedor-precio';

     let precioFinal = cantidadDias.value * autoElegido.precio;

     const leyendaPrecioFinal = document.createElement('p');
     leyendaPrecioFinal.innerText = `Ud. seleccionó el ${autoElegido.marca} ${autoElegido.modelo}`;
     leyendaPrecioFinal.className = 'leyendaPrecioFinal';

     const fotoPrecioFinal = document.createElement('img');
     fotoPrecioFinal.src = autoElegido.foto;
     fotoPrecioFinal.className = 'fotoPrecioFinal';

     const dominioElegido = document.createElement('p');
     dominioElegido.innerText = `Dominio: ${autoElegido.dominio} \n (Necesario para la devolucion del vehiculo)`;
     dominioElegido.className = 'dominioElegido';

     const textoValorDia = document.createElement('p');
     textoValorDia.innerText = `Valor por dia: $${autoElegido.precio}`;
     textoValorDia.className = 'textoValorDia';

     const totalDias = document.createElement('p');
     totalDias.innerText = `Dias de alquiler: ${cantidadDias.value}`;

     const mostrarPrecioFinal = document.createElement('p');
     mostrarPrecioFinal.innerText = `Total a pagar: $${precioFinal}`;
     mostrarPrecioFinal.className = 'mostrarPrecioFinal';

     container.innerHTML = '';

     const botonConfirmacionFinal = document.createElement('button');
     botonConfirmacionFinal.innerText = 'Alquilar auto';
     botonConfirmacionFinal.className = 'boton-confirmacion';

     botonConfirmacionFinal.onclick = () => {
        contenedorPrecio.innerHTML = ''; 
     const mensajeCompraExitosa = document.createElement('h2');
     mensajeCompraExitosa.innerText = 'Transaccion exitosa, disfruta de tu auto!';
     contenedorPrecio.appendChild(mensajeCompraExitosa);
     autoElegido.disponible = false;
     }

     contenedorPrecio.appendChild(leyendaPrecioFinal);
     contenedorPrecio.appendChild(dominioElegido);
     contenedorPrecio.appendChild(fotoPrecioFinal);
     contenedorPrecio.appendChild(textoValorDia);
     contenedorPrecio.appendChild(totalDias);
     contenedorPrecio.appendChild(mostrarPrecioFinal);
     contenedorPrecio.appendChild(botonConfirmacionFinal);
     containerAlquiler.appendChild(contenedorPrecio);
  }
  
  };

// DOM
const container = document.getElementById('container');

//Botones de inicio
const botoneraInicio = document.getElementById('botonera-index');

const botonSolicitar = document.createElement('button');
botonSolicitar.innerText = 'Solicitar auto';
botonSolicitar.className = 'boton-solicitar';
botonSolicitar.id = 'boton-index';

botonSolicitar.onclick = () => solicitarAuto(listadoAutos);

const botonDevolver = document.createElement('button');
botonDevolver.innerText = 'Devolver auto';
botonDevolver.className = 'boton-devolver';
botonDevolver.id = 'boton-index';

botonDevolver.onclick = () => devolverAuto();

const botonAgregar = document.createElement('button');
botonAgregar.innerText = 'Alquilar mi auto';
botonAgregar.className = 'boton-agregar';
botonAgregar.id = 'boton-index';

botonAgregar.onclick = () => agregarAuto ();

botoneraInicio.appendChild(botonSolicitar);
botoneraInicio.appendChild(botonDevolver);
botoneraInicio.appendChild(botonAgregar);

