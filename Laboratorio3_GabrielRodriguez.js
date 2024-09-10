
function EsPalindromoDobleBase(t) {
    if (isNaN(t)) {
        alert("Por favor, ingresa un numero válido.");
        return false;
    }
    const StrBase10 = t.toString();
    const StrBase2 = t.toString(2);

    const EsPalindromo = (str) => str === str.split('').reverse().join('');
    return EsPalindromo(StrBase10) && EsPalindromo(StrBase2);
}

function VerificarPalindromo() {
    const Numero = document.getElementById("NumeroPalindromo").value;
    if (Numero === '') {
        alert("Por favor, ingresa un numero.");
        return;
    }
    const Resultado = EsPalindromoDobleBase(Number(Numero));
    document.getElementById("ResultadoPalindromo").textContent = 
        Resultado ? `${Numero} es un palindromo en base 10 y 2` : `${Numero} no es un palindromo en base 10 y 2`;
}

function ContarCaracteres(t) {
    const Resultado = {};
    for (let Char of t) {
        Resultado[Char] = (Resultado[Char] || 0) + 1;
    }
    return Resultado;
}

function ContarCaracteresCadena() {
    const Cadena = document.getElementById("CadenaCaracteres").value;
    if (Cadena === '') {
        alert("Por favor, ingresa una cadena.");
        return;
    }
    const Resultado = ContarCaracteres(Cadena);
    let FormattedResult = '';
    for (const [key, value] of Object.entries(Resultado)) {
        FormattedResult += `${key}: ${value}<br>`;
    }
    document.getElementById("ResultadoCaracteres").innerHTML = FormattedResult;
}

function EsBisiesto(a) {
    return (a % 4 === 0 && a % 100 !== 0) || (a % 400 === 0);
}

function VerificarBisiesto() {
    const Anio = document.getElementById("AnioBisiesto").value;
    if (Anio === '') {
        alert("Por favor, ingresa un año.");
        return;
    }
    const Resultado = EsBisiesto(Number(Anio));
    document.getElementById("ResultadoBisiesto").textContent = 
        Resultado ? `${Anio} es un año bisiesto` : `${Anio} no es un año bisiesto`;
}

function EsPrimo(Num) {
    if (Num < 2) return false;
    for (let i = 2; i <= Math.sqrt(Num); i++) {
        if (Num % i === 0) return false;
    }
    return true;
}

function SumarPrimos(n) {
    let Sumatoria = 0;
    for (let i = 2; i <= n; i++) {  
        if (EsPrimo(i)) {
            Sumatoria += i;
        }
    }
    return Sumatoria;
}

function SumarNumerosPrimos() {
    const Numero = document.getElementById("NumeroPrimos").value;
    if (Numero === '') {
        alert("Por favor, ingresa un numero.");
        return;
    }
    const Resultado = SumarPrimos(Number(Numero));
    document.getElementById("ResultadoPrimos").textContent = `La sumatoria de los numeros primos debajo de ${Numero} es ${Resultado}`;
}
