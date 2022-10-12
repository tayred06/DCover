<template>
  <H1>DCover</H1>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
  <router-view/>
</template>

<script>
import axios from 'axios'
import DcoverAPI from '../src/api/dcoverAPI'

export default {
  mounted() {
    const dcoverAPItata = new DcoverAPI;
    if(!dcoverAPItata.getCookie('token') || dcoverAPItata.getCookie('token') == undefined){
      console.log('ZEBI')
      dcoverAPItata.login();
    }
  },
  methods: {
    storeToken() {
      document.cookie = 'token=' + window.location.hash.split('&')[0].split('=')[1] + '; expires=Thu, 18 Dec 2013 12:00:00 UTC'
    },
    async testGetInfo(url, token) {
      const response = await axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
      })
      console.log(response)
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
</style>
