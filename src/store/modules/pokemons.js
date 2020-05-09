import axios from 'axios';

const state = {
    pokemons:[]
};

const getters = {
    allPokemons: (state) => state.pokemons
};

const actions = {
    async fetchPokemons({ commit }){
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=649');
        commit('setPokemons',response.data);
    }
};

const mutations = {
    setPokemons: (state, pokemons) => (state.pokemons = pokemons)
};

export default{
    state,
    getters,
    actions,
    mutations
}