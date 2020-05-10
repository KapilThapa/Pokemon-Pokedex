<template>
  <div>
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
            />
            <select
              v-if="search.filter==2"
              @change="fetchPokemonsGender()"
              v-model="search.gender"
              class="search-filter inputs input-filter"
              name="gender"
              id="gender"
            >
              <option
                v-for="(gender,index) in allGenders"
                :value="`${index+1}`"
                :key="index"
              >{{gender.name}}</option>
            </select>
            <select
              v-if="search.filter==3"
              @change="fetchPokemonsRegion()"
              v-model="search.region"
              class="search-filter inputs input-filter"
              name="region"
              id="region"
            >
              <option
                v-for="(region,index) in allRegions"
                :value="`${index+1}`"
                :key="index"
              >{{region.name}}</option>
            </select>
            <select
              v-if="search.filter==4"
              @change="fetchPokemonsHabitat()"
              v-model="search.habitat"
              class="search-filter inputs input-filter"
              name="pokemon-habitat"
              id="pokemon-habitat"
            >
              <option
                v-for="(habitat,index) in allHabitats"
                :value="`${index+1}`"
                :key="index"
              >{{habitat.name}}</option>
            </select>
            <!-- <button class="btn-search inputs">
              <i class="fas fa-search"></i>
            </button>-->
          </div>
          <div class="poke-filter-list" v-if="search.filter == 1">
            <div
              :class="{'item': true, 'item-selected': selectedPokemon.id ==pokemon.id}"
              @click="pokemonDetails(pokemon.id)"
              v-for="(pokemon, index) in filterByName"
              :key="index"
            >
              <h6>{{ pokemon.name }}</h6>
              <ImageItem :source="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"></ImageItem>
            </div>
          </div>
          <div class="poke-filter-list" v-if="search.filter == 2">
            <div
              :class="{'item': true, 'item-selected': selectedPokemon.id ==pokemon.id}"
              @click="pokemonDetails(pokemon.id)"
              v-for="(pokemon, index) in allPokemonsByGender"
              :key="index"
            >
              <h6>{{ pokemon.pokemon_species.name }}</h6>
              <ImageItem :source="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"></ImageItem>
            </div>
          </div>
          <div class="poke-filter-list" v-if="search.filter == 3">
            <div
              :class="{'item': true, 'item-selected': selectedPokemon.id ==pokemon.id}"
              @click="pokemonDetails(pokemon.id)"
              v-for="(pokemon, index) in allPokemonsByRegion"
              :key="index"
            >
              <h6>{{ pokemon.pokemon_species.name }}</h6>
              <ImageItem :source="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"></ImageItem>
            </div>
          </div>
          <div class="poke-filter-list" v-if="search.filter == 4">
            <div
              :class="{'item': true, 'item-selected': selectedPokemon.id ==pokemon.id}"
              @click="pokemonDetails(pokemon.id)"
              v-for="(pokemon, index) in allPokemonsByHabitat"
              :key="index"
            >
              <h6>{{ pokemon.name }}</h6>
              <ImageItem :source="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"></ImageItem>
            </div>
          </div>
          <!-- <div class="poke-pagination">
            <button class="btn-previous inputs" :disabled="allPokemons.previous==null" @click="fetchPokemons(allPokemons.previous)">
              <i class="fas fa-arrow-left"></i>
            </button>
            <button class="btn-next inputs" :disabled="allPokemons.next==null" @click="fetchPokemons(allPokemons.next)">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>-->
        </div>
        <div class="poke-detail" v-if="Object.keys(selectedPokemon).length !== 0">
          <h4 class="poke-detail-title">{{selectedPokemon.name}}</h4>
          <div class="poke-info">
            <div class="poke-image">
              <img :src="selectedPokemon.sprites.front_default" alt />
            </div>
            <div class="poke-info-detail">
              <div class="poke-type-sec">
                <label
                  :class="`poke-type poke-type-${type.type.name}`"
                  v-for="(type,index) in selectedPokemon.types"
                  :key="index"
                >{{type.type.name}}</label>
              </div>
              <div class="poke-info-stats">
                <div class="poke-stat" v-for="(stat,index) in selectedPokemon.stats" :key="index">
                  <div class="label">{{ statDisplayLabel(stat.stat.name) }}</div>
                  <div class="value">{{stat.base_stat}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="poke-detail-scroll">
            <h5 class="color-red">{{selectedPokemon.pokemon_species.genera[2].genus}}</h5>
            <p class="color-default">
              <small>{{selectedPokemon.pokemon_species.flavor_text_entries[2].flavor_text}}</small>
            </p>
            <div class="poke-profile">
              <h5 class="poke-sub-title">Profile</h5>
              <div class="poke-profile-stat">
                <div class="poke-stat">
                  <div class="label">Height</div>
                  <div class="value">{{selectedPokemon.height/10 +"m"}}</div>
                </div>
                <div class="poke-stat">
                  <div class="label">Weight</div>
                  <div class="value">{{selectedPokemon.weight/10 +"kg"}}</div>
                </div>
                <div class="poke-stat" v-if="selectedPokemon.pokemon_species.growth_rate!=null">
                  <div class="label">Gr Rate</div>
                  <div class="value">{{selectedPokemon.pokemon_species.growth_rate.name}}</div>
                </div>
                <div class="poke-stat" v-if="selectedPokemon.pokemon_species.habitat != null">
                  <div class="label">Habitat</div>
                  <div class="value">{{selectedPokemon.pokemon_species.habitat.name}}</div>
                </div>
                <div class="poke-stat">
                  <div class="label">Cpt Rate</div>
                  <div class="value">{{selectedPokemon.pokemon_species.capture_rate}}</div>
                </div>
                <div class="poke-stat">
                  <div class="label">Abilities</div>
                  <div class="value">
                    <span
                      v-for="(ability,index) in selectedPokemon.abilities"
                      :key="index"
                    >{{ability.ability.name}}</span>
                  </div>
                </div>
                <div class="poke-stat">
                  <div class="label">Egg Group</div>
                  <div class="value">
                    <span
                      v-for="(egggroup,index) in selectedPokemon.pokemon_species.egg_groups"
                      :key="index"
                    >{{egggroup.name}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="poke-move">
              <h4 class="poke-move-heading">Moves</h4>
              <div v-for="(movelearned,index) in allMoveLearned" :key="index">
                <div v-if="getMove(movelearned.name).length != 0">
                  <div class="poke-move-title">{{movelearned.name}}</div>
                  <div v-for="(move,i) in getMove(movelearned.name)" :key="i">
                    <button class="accordion" @click="openCloseAccordion($event)">{{move.move.name}}</button>
                    <div class="accordion-content">
                      <p>Lowers the target's Attack by one stage.</p>
                      <div class="poke-move-stats">
                        <div class="poke-stat">
                          <div class="label">Power</div>
                          <div class="value">10</div>
                        </div>
                        <div class="poke-stat">
                          <div class="label">Acc</div>
                          <div class="value">10</div>
                        </div>
                        <div class="poke-stat">
                          <div class="label">PP</div>
                          <div class="value">40</div>
                        </div>
                      </div>
                    </div>
                  </div>
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
import { mapGetters, mapActions } from "vuex";
import ImageItem from "./general/image";
window._ = require("lodash");

export default {
  name: "Home",
  components:{ImageItem},
  data() {
    return {
      allNameFilterPokemons: [],
      allPokemonsByRegion: [],
      allPokemonsByGender: [],
      allPokemonsByHabitat: [],
      selectedPokemon: {},
      search: {
        value: "",
        region: 1,
        gender: 1,
        habitat: 1,
        filter: 1
      }
    };
  },
  created() {
    this.fetchPokemons();
    this.pokemonDetails();
    this.fetchRegions();
    this.fetchGenders();
    this.fetchHabitats();
    this.fetchMoveLearnedMethods();
  },
  methods: {
    ...mapActions(["fetchRegions","fetchGenders","fetchHabitats","fetchMoveLearnedMethods","fetchPokemons"]),
    openCloseAccordion(event){
      console.log(event.target);
      event.target.classList.toggle('is-open');
      var acc = event.target.nextElementSibling;
      if (acc.style.maxHeight) {
        acc.style.maxHeight = null;
      } else {
        acc.style.maxHeight = acc.scrollHeight + "px";
      }
    },
    getMove(movename) {
      let that = this;
      return window._.filter(that.selectedPokemon.moves, function(o) {
        return o.version_group_details[0].move_learn_method.name == movename;
      });
    },
    getRespectiveDate() {
      if (this.search.filter == 2) {
        this.fetchPokemonsGender();
      } else if (this.search.filter == 3) {
        this.fetchPokemonsRegion();
      } else if (this.search.filter ==4) {
        this.fetchPokemonsHabitat();
      }
    },
    getPokeId(url) {
      if (this.search.filter == 1) {
        return url.slice(34).replace("/", "");
      } else {
        return url.slice(42).replace("/", "");
      }
    },
    statDisplayLabel(name) {
      var temp = name.split("-");
      if (temp.length == 1) {
        return temp[0].substring(0, 3);
      } else {
        return temp[0].substring(0, 1) + "-" + temp[1].substring(0, 2);
      }
    },
    fetchPokemonsRegion() {
      let that = this;
      axios
        .get("https://pokeapi.co/api/v2/region/" + that.search.region)
        .then(response => {
          axios.get(response.data.pokedexes[0].url).then(response => {
            response.data.pokemon_entries.forEach(pokemon => {
            pokemon.id = that.getPokeId(pokemon.pokemon_species.url);
          })
            that.allPokemonsByRegion = response.data.pokemon_entries;
          });
        });
    },
    fetchPokemonsHabitat() {
      let that = this;
      axios
        .get("https://pokeapi.co/api/v2/pokemon-habitat/" + that.search.habitat)
        .then(response => {
          response.data.pokemon_species.forEach(pokemon =>{
            pokemon.id = that.getPokeId(pokemon.url);
          });
          that.allPokemonsByHabitat = response.data.pokemon_species;
        });
    },
    fetchPokemonsGender() {
      let that = this;
      axios
        .get("https://pokeapi.co/api/v2/gender/" + that.search.gender)
        .then(response => {
          response.data.pokemon_species_details.forEach(pokemon => {
            pokemon.id = that.getPokeId(pokemon.pokemon_species.url);
          })
          that.allPokemonsByGender = response.data.pokemon_species_details;
        });
    },
    pokemonDetails(id = 1) {
      let url = "https://pokeapi.co/api/v2/pokemon/"+id;
      let urlSpecies = "https://pokeapi.co/api/v2/pokemon-species/"+id;
      let that = this;
      axios.all([axios.get(url), axios.get(urlSpecies)]).then(response => {
        that.selectedPokemon = response[0].data;
        that.selectedPokemon.pokemon_species = response[1].data;
      });
    }
  },
  computed: {
    ...mapGetters(["allRegions","allGenders","allHabitats","allMoveLearned","allPokemons"]),
    filterByName: function(){
      let that = this;
      return that.allPokemons.filter(pokemon => {
        return (
          pokemon.name
            .toLowerCase()
            .indexOf(that.search.value.toLowerCase()) === 0
        );
      });
    }
  },
};
</script>

<style >
@import "../assets/css/home.css";
</style>