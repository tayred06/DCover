<template>
  <div class="home">
    <searchCard @son="setSon" :newsearch="search" />
    <div class="reponse">
      <responseCard @recherche="setRecherche" :chanson="song" :pos="index" v-for="(song, index) in res" :key="song.name"/>
    </div>
  </div>
</template>

<script>
import searchCard from '@/components/searchCard.vue'
import responseCard from '@/components/responseCard.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    searchCard,
    responseCard
  },
  data() {
    return {res: [], titre: '', artiste: '', resData: '', search: ''}
  },
  methods: {
    // Définit la méthode utilisée par le payload pour mettre à jour la propriété data
    async setSon(son) {
      let resultat = [];
      this.titre = son.titre
      this.artiste = son.artiste
      console.log(son)
      resultat = await this.getAPI('https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist='+this.artiste+'&track='+this.titre+'&api_key=3f842542803060ea569d93d31e3433b6&format=json&limit')
      this.res = this.ramdomizeList(resultat);
    },
    async setRecherche(recherche) {
      console.log("test", recherche);
      this.setSon(recherche);
      this.search = recherche.titre + ' - ' + recherche.artiste;
    },
    async getAPI(url) {
      const response = await axios.get(url);
      console.log(url,response);

      return response.data.similartracks.track.slice(0, 6)
    },
    ramdomizeList(list) {
      let resultat = list
      return resultat
    }
  },
  mounted() {
    console.log('mounted Home');
      
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