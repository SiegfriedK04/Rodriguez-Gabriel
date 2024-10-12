
const GeneradorNumerosModulo = (function() {
    let numeros = [];

    function generarNumero() {
        let num;
        let numFormateado;
        
        do {
            num = Math.floor(Math.random() * 99) + 1;
            numFormateado = num < 10 ? '0' + num : num;
        } while (numeros.includes(numFormateado)); 
    
        numeros.push(numFormateado);
        mostrarNumeros();
    }

    function ordenarNumeros(asc) {
        numeros.sort((a, b) => asc ? a - b : b - a);
        mostrarNumeros();
    }

    function mostrarNumeros() {
        const listaNumeros = document.getElementById('numberList');
        listaNumeros.innerHTML = ''; 
        numeros.forEach(num => {
            const numeroDiv = document.createElement('div');
            numeroDiv.classList.add('number');
            numeroDiv.textContent = num;
            listaNumeros.appendChild(numeroDiv);
        });
    }

    return {
        generarNumero: generarNumero,
        ordenarNumeros: ordenarNumeros
    };
})();

document.getElementById('generateBtn').onclick = GeneradorNumerosModulo.generarNumero;
document.getElementById('ascBtn').onclick = function() {
    GeneradorNumerosModulo.ordenarNumeros(true);
};
document.getElementById('descBtn').onclick = function() {
    GeneradorNumerosModulo.ordenarNumeros(false);
};
