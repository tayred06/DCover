<template>
  <div class="about">
    <h1>Se connecter a Spotify</h1>
    <button v-on:click="login">Login to Spotify</button>
  </div>
</template>

<script>
import {Client} from 'spotify-sdk';


export default {
  name: 'Connexion',
  components: {
    
  },
  data() {
    return {myVar: this.globalVar}
  },
  methods: {
    login() {

      const client_id = '55971b5193b147a8a438659c18ae9fff'; // Your client id
      const redirect_uri = 'http://localhost:8080/'; // Your redirect uri

      const SECRET_ID = "1908790d66574833a3041d7f50f75110"

      const client = Client.instance;
      client.settings = {
        clientId: client_id,
        secretId: SECRET_ID,
        scopes: ['user-follow-modify user-follow-read user-library-read user-top-read'],
        redirect_uri: redirect_uri
      };
      client.login().then((url) => {
        console.log(url)
        window.location.href = url;
      });
    }
  }
}
</script>