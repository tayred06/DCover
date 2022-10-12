<template>
  <div class="home">
    <a href="https://www.spotify.com/logout/">Log out</a>
    <searchCard @son="setSon" :newsearch="search" />
    <switchVue v-if="res"/>
    <div class="reponse">
      <responseCard @recherche="setRecherche" :chanson="song" :pos="index" v-for="(song, index) in res" :key="song.name"/>
      <div class="error" v-if="erreur">
        <p>Désolé nous n'avont pas de resultat pour cette recherche</p>
      </div>
    </div>
  </div>
</template>

<script>
import searchCard from '@/components/searchCard.vue'
import responseCard from '@/components/responseCard.vue'
import switchVue from '../components/switch.vue'
import axios from 'axios'
import DcoverAPI from '../../src/api/dcoverAPI'

export default {
  name: 'Home',
  components: {
    searchCard,
    responseCard,
    switchVue
  },
  data() {
    return {res: '', resData: '', search: '', erreur: false}
  },
  methods: {
    // Définit la méthode utilisée par le payload pour mettre à jour la propriété data
    async setSon(son) {
      const dcoverAPI = new DcoverAPI;
      // let resultat = [];
      this.res = []
      this.res = await dcoverAPI.getSimilar(son.artiste, son.titre)
    },
    async setRecherche(recherche) {
      this.setSon(recherche);
      this.search = recherche.titre + ' - ' + recherche.artiste;
    },
    async getAPI(url) {
      const response = await axios.get(url);
      console.log(url, response);
      return response.data.similartracks.track
    }
  }
}
</script>

<style>
  .home {
    width: 50%;
    text-align: center;
  }
  .artiste {
    font-size: 0.7rem;
  }

  @media screen and (max-width: 1401px) {
    .home {
      width: 75%;
    }
  }

  .reponse {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  @media screen and (max-width: 800px) {
    .home {
      width: 98%;
    }
    .reponse {
      justify-content: center;
    }
  }
</style>