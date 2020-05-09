<template>
  <div>
    <div class="logo">
      <img src="../assets/poke-logo.png" alt="logo" />
    </div>
    <div class="pokedex">
      <div class="pokedex-content">
        <div class="poke-list">
          <div class="poke-filter">
						<select
              v-model.number="search.filter"
              class="search-filter inputs"
              name="filter"
              id="filter"
              @change="getRespectiveDate"
            >
              <option value="1">Name</option>
              <option value="2">Gender</option>
              <option value="3">Region</option>
              <option value="4">Habitat</option>
            </select>
            <input
              v-model="search.value"
              name="search"
              class="search inputs input-filter"
              type="text"
              placeholder="Search from here..."
							v-if="search.filter==1"
              @input="filterByName"
            />
						<select v-if="search.filter==2" @change="fetchPokemonsGender()" v-model="search.gender" class="search-filter inputs input-filter" name="gender" id="gender">
							<option v-for="(gender,index) in allGender" :value="`${index+1}`" :key="index">{{gender.name}}</option>
						</select>
						<select v-if="search.filter==3" @change="fetchPokemonsRegion()" v-model="search.region" class="search-filter inputs input-filter" name="region" id="region">
							<option v-for="(region,index) in allRegion" :value="`${index+1}`" :key="index">{{region.name}}</option>
						</select>
						<select v-if="search.filter==4" @change="fetchPokemonsHabitat()" v-model="search.habitat" class="search-filter inputs input-filter" name="pokemon-habitat" id="pokemon-habitat">
							<option v-for="(habitat,index) in allHabitat" :value="`${index+1}`" :key="index">{{habitat.name}}</option>
						</select>
            <!-- <button class="btn-search inputs">
              <i class="fas fa-search"></i>
            </button> -->
          </div>
          <div class="poke-filter-list" v-if="search.filter == 1">
            <div
              :class="{'item': true, 'item-selected': selectedPokemon.id ==getPokeId(pokemon.url)}"
              @click="pokemonDetails(pokemon.url)"
              v-for="(pokemon, index) in allNameFilterPokemons"
              :key="index"
            >
              <h6>{{ pokemon.name }}</h6>
              <img
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokeId(pokemon.url)}.png`"
                alt
              />
            </div>
          </div>
          <div class="poke-filter-list" v-if="search.filter == 2">
            <div
              :class="{'item': true, 'item-selected': selectedPokemon.id ==getPokeId(pokemon.pokemon_species.url)}"
              @click="pokemonDetails(pokemon.pokemon_species.url)"
              v-for="(pokemon, index) in allPokemonsByGender"
              :key="index"
            >
              <h6>{{ pokemon.pokemon_species.name }}</h6>
              <img
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokeId(pokemon.pokemon_species.url)}.png`"
                alt
              />
            </div>
          </div>
          <div class="poke-filter-list" v-if="search.filter == 3">
            <div
              :class="{'item': true, 'item-selected': selectedPokemon.id ==getPokeId(pokemon.pokemon_species.url)}"
              @click="pokemonDetails(pokemon.pokemon_species.url)"
              v-for="(pokemon, index) in allPokemonsByRegion"
              :key="index"
            >
              <h6>{{ pokemon.pokemon_species.name }}</h6>
              <img
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokeId(pokemon.pokemon_species.url)}.png`"
                alt
              />
            </div>
          </div>
          <div class="poke-filter-list" v-if="search.filter == 4">
            <div
              :class="{'item': true, 'item-selected': selectedPokemon.id ==getPokeId(pokemon.url)}"
              @click="pokemonDetails(pokemon.url)"
              v-for="(pokemon, index) in allPokemonsByHabitat"
              :key="index"
            >
              <h6>{{ pokemon.name }}</h6>
              <img
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokeId(pokemon.url)}.png`"
                alt
              />
            </div>
          </div>
          <!-- <div class="poke-pagination">
            <button
              class="btn-previous inputs"
              :disabled="allPokemons.previous==null"
              @click="fetchPokemons(allPokemons.previous)"
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <button
              class="btn-next inputs"
              :disabled="allPokemons.next==null"
              @click="fetchPokemons(allPokemons.next)"
            >
              <i class="fas fa-arrow-right"></i>
            </button>
          </div> -->
        </div>
        <div class="poke-detail" v-if="Object.keys(selectedPokemon).length !== 0">
					<h4 class="poke-detail-title">{{selectedPokemon.name}}</h4>
					<div class="poke-info">
						<div class="poke-image">
							<img :src="selectedPokemon.sprites.front_default" alt="">
						</div>
						<div class="poke-info-detail">
							<div class="poke-type-sec">
								<label :class="`poke-type poke-type-${type.type.name}`" v-for="(type,index) in selectedPokemon.types" :key="index">{{type.type.name}}</label>
							</div>
							<div class="poke-info-stats">
								<div class="poke-stat" v-for="(stat,index) in selectedPokemon.stats" :key="index">
									<div class="label">{{ statDisplayName(stat.stat.name) }}</div>
									<div class="value">{{stat.base_stat}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
window._ = require('lodash');
export default {
  name: "Home",
  data() {
    return {
			allRegion:[],
			allGender:[],
			allHabitat:[],
      allPokemons: [],
      allNameFilterPokemons:[],
      allPokemonsByRegion:[],
      allPokemonsByGender:[],
      allPokemonsByHabitat:[],
      selectedPokemon: {},
      search: {
				value: '',
				region:1,
				gender:1,
				habitat:1,
        filter: 1
      }
    };
  },
  methods: {
    filterByName(){
      let that = this;
      that.allNameFilterPokemons = this.allPokemons.filter(pokemon => {
        return pokemon.name.toLowerCase().indexOf(this.search.value.toLowerCase()) === 0;
      });
    },
    getRespectiveDate(){
      if (this.search.filter == 1) {
        this.fetchPokemons();
      }else if (this.search.filter == 2){
        this.fetchPokemonsGender();
      }else if (this.search.filter == 3){
        this.fetchPokemonsRegion();
      }else{
        this.fetchPokemonsHabitat();
      }
    },
    getPokeId(url){
      if (this.search.filter ==1) {
        return url.slice(34).replace("/", "");
      }else{
        return url.slice(42).replace("/", "");
      }
    },
    statDisplayName(name){
      var temp = name.split("-");
      if (temp.length==1) {
        return temp[0].substring(0,3);
      }else{
        return temp[0].substring(0,1) +"-"+ temp[1].substring(0,2);
      }
    },
		fetchStatics(){
			let that = this;
			axios.all([
				axios.get('https://pokeapi.co/api/v2/region'),
				axios.get('https://pokeapi.co/api/v2/gender'),
				axios.get('https://pokeapi.co/api/v2/pokemon-habitat')
			])
			.then(response => {
				that.allRegion = response[0].data.results;
				that.allGender = response[1].data.results;
				that.allHabitat = response[2].data.results;
			})
			.catch(err=> console.log(err));
		},
    fetchPokemons() {
      let that = this;
			axios.get("https://pokeapi.co/api/v2/pokemon?limit=20")
			.then(response => {
        that.allPokemons = response.data.results;
        that.allNameFilterPokemons = response.data.results;
      });
		},
		fetchPokemonsRegion(){
			let that = this;
			axios.get('https://pokeapi.co/api/v2/region/'+that.search.region)
			.then(response => {
          axios.get(response.data.pokedexes[0].url)
          .then(response => {
            that.allPokemonsByRegion = response.data.pokemon_entries;
          });
        });
				// response.data.results.forEach(reason => {
				// 	axios.get(reason.url)
				// 	.then(response => {
				// 		response.data.pokedexes.forEach(pokedex => {
				// 			axios.get(pokedex.url)
				// 			.then(response => {
				// 				that.allPokemonsByRegion = window._.union(that.allPokemonsByRegion,response.data.pokemon_entries);
				// 			})
				// 		});
        //     that.allPokemonsByRegion = window._.uniqBy(that.allPokemonsByRegion,'pokemon_species');
				// 	});
				// });
    },
    fetchPokemonsHabitat(){
			let that = this;
			axios.get('https://pokeapi.co/api/v2/pokemon-habitat/'+that.search.habitat)
			.then(response => {
        that.allPokemonsByHabitat = response.data.pokemon_species;
			});
    },
    fetchPokemonsGender(){
			let that = this;
			axios.get('https://pokeapi.co/api/v2/gender/'+that.search.gender)
			.then(response => {
        that.allPokemonsByGender = response.data.pokemon_species_details;
			});
		},
    pokemonDetails(url = "") {
      if (url == "") {
        url = "https://pokeapi.co/api/v2/pokemon/1";
      }else{
        url ="https://pokeapi.co/api/v2/pokemon/"+this.getPokeId(url);
      }
			let that = this;
			axios.get(url)
			.then(response => {
				that.selectedPokemon = response.data;
			});
    }
  },
  created() {
		this.fetchPokemons();
		this.pokemonDetails();
		this.fetchStatics();
  }
};
</script>

<style >
  @import '../assets/css/home.css';
</style>