<template>
  <div class="searchCard">
    <h2>Qu'est-ce que vous ecoutez</h2>
    <div class="search">
      <input type="text" name="search" id="search" placeholder="Rechecher" v-debounce:300ms="updateSearch" v-model="search">
      <button v-on:click="res()">Res</button>
      <div class="resultats">
        <div v-for="resultat in resultats" :key="resultat.id" v-on:click="returnId(resultat)" class="resultat">
          <img v-bind:src="resultat.album.images[0].url" alt="img">
          <div class="chanson">
            <p class="titre">{{resultat.name}}</p>
            <p class="artiste">{{resultat.artists[0].name}}</p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { vue3Debounce } from 'vue-debounce'
import DcoverAPI from '../../src/api/dcoverAPI'

export default {
  name: 'searchCard',
  props: ['newsearch'],
  directives: {
    debounce: vue3Debounce({ lock: true })
  },
  data() {
    return {resultats : [], search: ''}
  },
  methods: {
    res() {
      this.search = null;
    },
    async updateSearch() {
      const dcoverAPI = new DcoverAPI;
      this.resultats = []      
      if (this.search != "") {
        this.resultats = await dcoverAPI.search(this.search)
      } else {
        this.resultats = []
      }
    },
    returnId(resultat) {
      this.$emit('son', {'titre': resultat.id, 'artiste': resultat.artists[0].id});
      this.resultats = []
      this.search = resultat.name + ' - ' + resultat.artists[0].name
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .searchCard {
        background-color: #35363a;
        width: 100%;
        height: 20vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
    }
    .search {
      width: 50%;
      display: flex;
      justify-content: center;
      position: relative;
      text-align: left;
    }
    @media screen and (max-width: 992px) {
      .search {
        width: 75%;
      }
    }
    .resultats {
      position: absolute;
      margin-top: 25px;
      width: 95%;
      border-left: solid 1px #040411;
      border-right: solid 1px #040411;
      z-index: 999;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      z-index: 9999;
    }
    .resultat {
      background-color: #35363a;
      border-bottom: solid 1px #040411;
      width: 100%;
      display: flex;
      align-items: center;
    }
    .resultat .chanson p {
      margin: 0;
    }
    .resultat img {
      width: 75px;
      margin-right: 20px;
    }
    input {
        width: 100%;
        border-radius: 10px;
        border: none;
        outline: none;
        padding: 5px 20px;
    }
    input {
        height: 15px;
    }
</style>
