<template>
  <H1>Doover</H1>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
  </div> -->
  <router-view/>
  <div v-if="!token" class="modalLogin">
    <h2>Se connecter a Spotify</h2>
    <button v-on:click="login">Login to Spotify</button>
  </div>
</template>

<script>
import DcoverAPI from '../src/api/dcoverAPI'

export default {
  data() {
    return {token: ''}
  },
  mounted() {
    const dcoverAPI = new DcoverAPI;
    this.token = dcoverAPI.getCookie('token');

  },
  methods: {
    login() {
      const dcoverAPI = new DcoverAPI;
      dcoverAPI.login();
    }
  }
}
</script>


<style>
body {
  color: white;
  background-color: #040411;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#nav {
  padding: 30px;
  /* display: none; */
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
h1 {
  color: #ffdc2b;
}
.modalLogin {
  position: absolute;
    top: 25%;
    background-color: rebeccapurple;
    width: 50%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
}
</style>
