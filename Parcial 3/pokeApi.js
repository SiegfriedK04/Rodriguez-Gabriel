export class PokeApi {
    constructor() {
        this.baseUrl = 'https://pokeapi.co/api/v2/';
    }

    async getPokemon(query) {
        const response = await fetch(`${this.baseUrl}pokemon/${query.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        const pokemonData = await response.json();

        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        const evolutionChain = [];
        let evoData = evolutionData.chain;

        do {
            evolutionChain.push({
                name: evoData.species.name,
                isBaby: evoData.is_baby
            });
            evoData = evoData.evolves_to[0]; 
        } while (evoData && evoData.evolves_to);

        return {
            ...pokemonData,
            evolutionChain,
            abilities: pokemonData.abilities.map(ability => ({
                name: ability.ability.name,
                isHidden: ability.is_hidden
            }))
        };
    }

    async getAbility(query) {
        const response = await fetch(`${this.baseUrl}ability/${query.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Ability not found');
        }
        const abilityData = await response.json();

        return {
            name: abilityData.name,
            learners: abilityData.pokemon.map(pokemon => ({
                name: pokemon.pokemon.name,
                isHidden: pokemon.is_hidden
            }))
        };
    }
}