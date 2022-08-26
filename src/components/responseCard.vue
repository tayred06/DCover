<template>
    <div v-on:click="search(chanson)" class="responseCard">
        <img :src="Object.values(chanson.image[0])[0]" alt="img">
        <div class="data">
            <p class="index">#{{pos+1}}</p>
            <p class="titre">{{String(chanson.name)}}</p>
            <p class="artiste">{{String(chanson.artist.name)}}</p>
            <a :href="getYTUrl()" target="_blank" >Ecouter <img src="../../public/img/youtube-brands.svg" alt="play"></a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'responseCard',
    props: ['chanson', 'pos'],
    data() {
        return {suggestion: [], url: "https://www.youtube.com/results?search_query="}
    },
    methods: {
        getYTUrl() {
            return this.url+this.chanson.name + " " + this.chanson.artist.name
        },
        search(song) {
            // console.log(song)
            this.$emit('recherche', {'titre': song.name, 'artiste': song.artist.name});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .responseCard {
        background-color: #35363a;
        width: 48%;
        height: 15vh;
        border-radius: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px;
        position: relative;
        overflow: hidden;
    }
    @media screen and (max-width: 800px) {
        .responseCard {
            width: 90%;
        }
    }
    img {
        height: 100%;
    }
    .index {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .data {
        margin-left: 25px;
    }
    p {
        margin: 0;
    }
    a {
        color: #35363a;
        text-decoration: none;
        background-color: #ffdc2b;
        padding: 5px 20px;
        border-radius: 10px;
        margin-top: 10px;
        transition: 0.3s;
        display: flex;
        align-items: center;
        width: 100px;
    }
    a:hover {
        border-radius: 20px;
    }
    a img {
        width: 20px;
        margin-left: 10px;
    }
</style>
