import { PokeApi } from './pokeApi.js';

const App = (() => {

    const htmlElements = {
        searchInput: document.getElementById('searchInput'),
        searchButton: document.getElementById('searchButton'),
        clearButton: document.getElementById('clearButton'),
        resultContainer: document.getElementById('resultContainer')
    };

    const handlers = {
        async searchHandler() {
            const searchValue = htmlElements.searchInput.value.trim().toLowerCase();
            htmlElements.resultContainer.innerHTML = '';
            if (!searchValue) {
                htmlElements.resultContainer.innerHTML = '<p>Por favor, ingrese un término de búsqueda.</p>';
                return;
            }
            htmlElements.clearButton.style.display = 'inline-block';
            try {
                const api = new PokeApi();
                const data = await api.getPokemon(searchValue);
                renderPokemonInfo(data);
            } catch (error) {
                htmlElements.resultContainer.innerHTML = '<p>Algo salió mal. Intente de nuevo.</p>';
                console.error('Error:', error);
            }
        },
        clearHandler() {
            htmlElements.searchInput.value = '';
            htmlElements.resultContainer.innerHTML = '';
            htmlElements.clearButton.style.display = 'none';
        }
    };

    const bindEvents = () => {
        htmlElements.searchButton.addEventListener('click', handlers.searchHandler);
        htmlElements.clearButton.addEventListener('click', handlers.clearHandler);
    };

    const init = () => {
        bindEvents();
    };

    return {
        init
    };
})();

App.init();

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

    resultContainer.appendChild(spritesSection);
    resultContainer.appendChild(weightHeightSection);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}