<template>
  <div class="home">
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

export default {
  name: 'Home',
  components: {
    searchCard,
    responseCard,
    switchVue
  },
  data() {
    return {res: '', titre: '', artiste: '', resData: '', search: '', erreur: false}
  },
  methods: {
    // Définit la méthode utilisée par le payload pour mettre à jour la propriété data
    async setSon(son) {
      let resultat = [];
      this.titre = son.titre
      this.artiste = son.artiste //https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=cher&track=believe&api_key=7824bbbc91348cbea756c6d9e8032fff&format=json
      resultat = await this.getAPI('https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist='+this.artiste+'&track='+this.titre+'&api_key=7824bbbc91348cbea756c6d9e8032fff&format=json')
      if (resultat.length>0) {
        this.erreur = false;
        this.res = this.ramdomizeList(resultat);
      } else {
        this.res = false;
        this.erreur = true;
      }
    },
    async setRecherche(recherche) {
      this.setSon(recherche);
      this.search = recherche.titre + ' - ' + recherche.artiste;
    },
    async getAPI(url) {
      const response = await axios.get(url);
      console.log(url, response);
      return response.data.similartracks.track
    },
    ramdomizeList(list) {
      let resultats = [];
      let liste = [];
      liste[0] = Math.floor(Math.random() * (3 - 0));
      liste[1] = Math.floor(Math.random() * (10 - 4 ));
      liste[2] = Math.floor(Math.random() * (20 - 11));
      liste[3] = Math.floor(Math.random() * (30 - 21));
      liste[4] = Math.floor(Math.random() * (40 - 31));
      liste[5] = Math.floor(Math.random() * (50 - 41));

      for (let index = 0; index < liste.length; index++) {
        resultats.push(list[liste[index]])
      }
      return resultats
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