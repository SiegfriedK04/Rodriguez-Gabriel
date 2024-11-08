
class PokeApi {
    constructor() {
        this.baseUrl = 'https://pokeapi.co/api/v2/';
    }

    async getPokemon(query) {
        const response = await fetch(`${this.baseUrl}pokemon/${query.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        return await response.json();
    }

    async getAbility(query) {
        const response = await fetch(`${this.baseUrl}ability/${query.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Ability not found');
        }
        return await response.json();
    }
}
