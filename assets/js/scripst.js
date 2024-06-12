//obtener las referencias del DOM/HTML

const ciudadInput= document.getElementById("ciudad");
const obtenerPronosticoBtn= document.getElementById("obtenerPronostico");
const pronosticoDiv= document.getElementById("pronostico");

//Función que me permite obtener el pronóstico

obtenerPronosticoBtn.addEventListener("click", obtenerPronostico);

function obtenerPronostico(){

    const ciudad = ciudadInput.value.trim();

    if(ciudad===""){
        mostrarError("Por favor ingresa una ciudad");
        return;
    }
    //pega tu llave api aca abajo donde dice apikey, entre las comillas
    const apiKey= "8912c920e75ecc6c3bc058beeb4f360b";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
    
    //Realizar una solicitud htto utilizando la funcion fetch
    fetch(url)
        .then(Response => Response.json())
        .then(data =>{
            mostrarPronostico(data)

        })
    .catch(erros=>{
        mostrarError("Error al obtener el pronóstico");
    });
}

function  mostrarPronostico(data){
    const {name, main, weather }=data;
    const temperatura = main.temp;
    const sensacion = main.feels_like;
    const humedad = main.humidity;
    const descripcion = weather[0].descripcion;

    const pronosticoHTML = `
        <div class="card">
            <div class="card-body">
            <h2 class="card-title">${name}</h2>
            <p class="card-text">Temperatura: ${temperatura}</p>
            <p class="card-text">sensacion: ${sensacion}</p>
            <p class="card-text">Humedad: ${humedad}</p>
            <p class="card-text">Descripción: ${descripcion}</p>
            </div>
        </div>
    `;
    pronosticoDiv.innerHTML = pronosticoHTML;
}

function mostrarError(mensaje){
    const errorHTML =  `
    <div class="alert alert-danger" role="alert">
        ${mensaje}  
    </div>
    `;
    pronosticoDiv.innerHTML = errorHTML;
}