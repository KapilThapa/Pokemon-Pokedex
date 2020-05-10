import axios from 'axios';

const state = {
    pokemons:[],
    regions:[],
    genders:[],
    habitats:[],
    movelearnedmethods:[]
};

const getters = {
    allPokemons: (state) => state.pokemons,
    allRegions: (state) => state.regions,
    allGenders: (state) => state.genders,
    allHabitats: (state) => state.habitats,
    allMoveLearned: (state) => state.movelearnedmethods
};

const actions = {
    async fetchPokemons({ commit }){
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=807');
        response.data.results.forEach(pokemon => {
            pokemon.id = pokemon.url.slice(34).replace("/", "");
        });
        commit('setPokemons',response.data.results);
    },
    async fetchRegions({ commit }) {
        const response = await axios.get('https://pokeapi.co/api/v2/region');
        commit('setRegions', response.data.results);
    },
    async fetchGenders({ commit }) {
        const response = await axios.get('https://pokeapi.co/api/v2/gender');
        commit('setGenders', response.data.results);
    },
    async fetchHabitats({ commit }) {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon-habitat');
        commit('setHabitats', response.data.results);
    },
    async fetchMoveLearnedMethods({ commit }) {
        const response = await axios.get('https://pokeapi.co/api/v2/move-learn-method');
        commit('setMoveLearnedMethods', response.data.results);
    }
};

const mutations = {
    setPokemons: (state, pokemons) => (state.pokemons = pokemons),
    setRegions: (state, regions) => (state.regions = regions),
    setGenders: (state, genders) => (state.genders = genders),
    setHabitats: (state, habitats) => (state.habitats = habitats),
    setMoveLearnedMethods: (state, movelearnedmethods) => (state.movelearnedmethods = movelearnedmethods)
};

export default{
    state,
    getters,
    actions,
    mutations
}