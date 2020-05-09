import VueX from 'vuex';
import Vue from 'vue';

import pokemons from './modules/pokemons';

Vue.use(VueX);

export default new VueX.Store({
    modules:{
        pokemons
    }
});