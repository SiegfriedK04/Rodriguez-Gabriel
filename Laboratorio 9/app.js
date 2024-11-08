document.getElementById('searchButton').addEventListener('click', async () => {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultContainer = document.getElementById('resultContainer');
    const clearButton = document.getElementById('clearButton');
    resultContainer.innerHTML = '';

    if (!searchValue) {
        resultContainer.innerHTML = '<p>Por favor, ingrese un término de búsqueda.</p>';
        return;
    }

    clearButton.style.display = 'inline-block';

    try {
        const api = new PokeApi();
        const data = await api.getPokemon(searchValue);

        // Renderizar solo la información relevante
        renderPokemonInfo(data);
    } catch (error) {
        resultContainer.innerHTML = '<p>Algo salió mal. Intente de nuevo.</p>';
        console.error('Error:', error);
    }
});

document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('resultContainer').innerHTML = '';
    document.getElementById('clearButton').style.display = 'none';
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderPokemonInfo(pokemon) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ''; 

    const spritesSection = document.createElement('div');
    spritesSection.classList.add('result-item', 'sprites-section');
    spritesSection.style.gridColumn = '1';
    spritesSection.style.gridRow = '1';
    spritesSection.innerHTML = `
    <h3 class="pokemon-name-title">${capitalizeFirstLetter(pokemon.name)} (${pokemon.id})</h3>
    <h3 class="sprites-title">Sprites</h3>
    <div class="sprite-container">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name} front" class="sprite-image">
        <img src="${pokemon.sprites.back_default}" alt="${pokemon.name} back" class="sprite-image">
    </div>
`;

    const weightHeightSection = document.createElement('div');
    weightHeightSection.classList.add('result-item');
    weightHeightSection.style.gridColumn = '2';
    weightHeightSection.style.gridRow = '1';
    weightHeightSection.innerHTML = `
        <h3>Peso / Altura</h3>
        <p>${(pokemon.weight / 10).toFixed(1)} kg / ${(pokemon.height / 10).toFixed(1)} m</p>
    `;

    // Agregar solo las secciones relevantes al contenedor de resultados
    resultContainer.appendChild(spritesSection);
    resultContainer.appendChild(weightHeightSection);
}