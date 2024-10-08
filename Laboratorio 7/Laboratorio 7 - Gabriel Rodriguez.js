let candidatos = [];

function agregarCandidato() {
    const nombre = document.getElementById("nombre").value;
    let color = document.getElementById("color").value;
    const colorAleatorio = document.getElementById("colorAleatorio").checked;

    if (nombre === "") {
        alert("Debe ingresar un nombre");
        return;
    }

    // Generar un color aleatorio si se selecciona la opción
    if (colorAleatorio) {
        color = generarColorAleatorio();
    }

    const nuevoCandidato = {
        nombre: nombre,
        votos: 0,
        color: color
    };

    candidatos.push(nuevoCandidato);
    actualizarTabla();
    actualizarGrafico();
}

// Función para generar un color hexadecimal aleatorio
function generarColorAleatorio() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

function votarCandidato(index) {
    candidatos[index].votos++;
    actualizarTabla();
    actualizarGrafico();
}

function eliminarCandidato(index) {
    candidatos.splice(index, 1);
    actualizarTabla();
    actualizarGrafico();
}

function actualizarTabla() {
    const listaCandidatos = document.getElementById("lista-candidatos");
    listaCandidatos.innerHTML = "";

    candidatos.forEach((candidato, index) => {
        listaCandidatos.innerHTML += `
            <tr>
                <td>${candidato.nombre}</td>
                <td>${candidato.votos}</td>
                <td><div style="background-color:${candidato.color}; width:50px; height:20px;"></div></td>
                <td>
                    <button onclick="votarCandidato(${index})">Votar</button>
                    <button onclick="eliminarCandidato(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function actualizarGrafico() {
    const totalVotos = candidatos.reduce((acc, candidato) => acc + candidato.votos, 0);
    const chart = document.getElementById("bar-chart");
    chart.innerHTML = "";

    candidatos.forEach(candidato => {
        const porcentaje = totalVotos === 0 ? 0 : (candidato.votos / totalVotos) * 100;
        chart.innerHTML += `
            <div class="bar" style="width: ${porcentaje}%; background-color: ${candidato.color};">
                ${candidato.nombre} (${porcentaje.toFixed(2)}%)
            </div>
        `;
    });
}
