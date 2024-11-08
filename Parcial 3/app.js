import { PokeApi } from './pokeApi.js';

const appModule = (() => {
    const htmlElements = {
        searchButton: document.getElementById('searchButton'),
        searchInput: document.getElementById('searchInput'),
        searchType: document.getElementById('searchType'),
        resultContainer: document.getElementById('resultContainer'),
        clearButton: document.getElementById('clearButton')
    };

    const displayMessage = (message) => {
        htmlElements.resultContainer.innerHTML = `<p>${message}</p>`;
    };

    const fetchData = async () => {
        const searchValue = htmlElements.searchInput.value.trim().toLowerCase();
        if (!searchValue) return displayMessage('Por favor, ingrese un término de búsqueda.');

        htmlElements.resultContainer.innerHTML = '';
        htmlElements.clearButton.style.display = 'inline-block';

        try {
            const api = new PokeApi();
            const data = htmlElements.searchType.value === 'pokemon'
                ? await api.getPokemon(searchValue)
                : await api.getAbility(searchValue);

            htmlElements.searchType.value === 'pokemon' ? renderPokemonInfo(data) : renderAbilityInfo(data);
        } catch (error) {
            displayMessage('Algo salió mal. Intente de nuevo.');
            console.error('Error:', error);
        }
    };

    const bindEvents = () => {
        htmlElements.searchButton.addEventListener('click', fetchData);
        htmlElements.clearButton.addEventListener('click', () => {
            htmlElements.searchInput.value = '';
            htmlElements.resultContainer.innerHTML = '';
            htmlElements.clearButton.style.display = 'none';
        });
    };

    const createSection = (title, content, options = {}) => {
        const section = document.createElement('div');
        section.classList.add('result-item');
        if (options.gridColumn) section.style.gridColumn = options.gridColumn;
        if (options.gridRow) section.style.gridRow = options.gridRow;
        section.innerHTML = `<h3>${title}</h3>${content}`;
        return section;
    };

    const renderPokemonInfo = (pokemon) => {
        const { name, id, sprites, weight, height, evolutionChain, abilities } = pokemon;
        htmlElements.resultContainer.innerHTML = '';

        const spritesContent = `
            <h3 class="pokemon-name-title">${capitalize(name)} (${id})</h3>
            <h3 class="sprites-title">Sprites</h3>
            <div class="sprite-container">
                <img src="${sprites.front_default}" alt="${name} front" class="sprite-image">
                <img src="${sprites.back_default}" alt="${name} back" class="sprite-image">
            </div>`;
        htmlElements.resultContainer.appendChild(createSection('', spritesContent, { gridColumn: '1', gridRow: '1' }));

        const weightHeightContent = `<p>${(weight / 10).toFixed(1)} kg / ${(height / 10).toFixed(1)} m</p>`;
        htmlElements.resultContainer.appendChild(createSection('Peso / Altura', weightHeightContent, { gridColumn: '2', gridRow: '1' }));

        const evolutionContent = `<ul>${evolutionChain.map(stage => `<li>${capitalize(stage.name)} ${stage.isBaby ? '👶' : ''}</li>`).join('')}</ul>`;
        htmlElements.resultContainer.appendChild(createSection('Cadena de Evolución', evolutionContent, { gridColumn: '1', gridRow: '2' }));

        const abilitiesContent = `<ul>${abilities.map(ability => `<li>${capitalize(ability.name)} ${ability.isHidden ? '👁️' : ''}</li>`).join('')}</ul>`;
        htmlElements.resultContainer.appendChild(createSection('Habilidades', abilitiesContent, { gridColumn: '2', gridRow: '2' }));
    };

    const renderAbilityInfo = (abilityData) => {
        const content = `
            <h2>${capitalize(abilityData.name)}</h2>
            <h3>¿Quiénes pueden aprenderlo?</h3>
            <ul>${abilityData.learners.map(pokemon => `<li>${capitalize(pokemon.name)} ${pokemon.isHidden ? '👁️' : ''}</li>`).join('')}</ul>`;
        htmlElements.resultContainer.innerHTML = '';
        htmlElements.resultContainer.appendChild(createSection('', content, { gridColumn: '1 / span 2' }));
    };

    const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    return { init: bindEvents };
})();

appModule.init();