<template>
    <div></div>
</template>
  
  <script>
  import DcoverAPI from '../../src/api/dcoverAPI'
  
  export default {
    name: 'Callback',
    mounted() {
        const dcoverAPI = new DcoverAPI;
        console.log(window.location.hash.split('&')[0].split('=')[1])
        let token = window.location.hash.split('&')[0].split('=')[1]
        if(window.location.hash.split('&')[0].split('=')[1] != undefined) {
            dcoverAPI.setCookie('token', token)
        }
        location.href = location.origin + '/';
    }
  }
  </script>