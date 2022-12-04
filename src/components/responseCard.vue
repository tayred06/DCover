<template>
    <!-- <div v-on:click="search(chanson)" class="responseCard"> -->
    <div class="responseCard">
        <div class="music">
            <img :src="chanson.album.images[1].url" alt="img" :class="[anime, round]">
            <div v-if="chanson.preview_url" class="controls">
                <button v-if="status" v-on:click="play" class="play"><img src="../../public/img/icons8-play-64.png" alt="play"></button>
                <button v-if="!status" v-on:click="pause" class="pause"><img src="../../public/img/icons8-pause-24.png" alt="pause"></button>
            </div>
        </div>
        <div class="data">
            <p class="index">#{{pos+1}}</p>
            <a :href=chanson.uri class="titre">{{chanson.name}}</a>
            <p class="artiste">{{chanson.artists[0].name}}</p>
            <audio v-if="chanson.preview_url" :id="'player_'+pos" class="player" controls>
                <source :src="chanson.preview_url" type="audio/mpeg">
            </audio>
        </div>
    </div>
</template>

<script>
export default {
    name: 'responseCard',
    props: ['chanson', 'pos'],
    data() {
        return {suggestion: [], status: true, anime : '', round: ''}
    },
    mounted() {
        if(this.chanson.preview_url) {
            this.round = 'round'
        }
    },
    methods: {
        play() {
            this.status = !this.status
            document.getElementById('player_'+this.pos).play()
            this.anime = 'rotating';
        },
        pause() {
            this.status = !this.status
            document.getElementById('player_'+this.pos).pause()
            document.getElementById('player_'+this.pos).currentTime = 0
            this.anime = '';
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
            width: 45%;
        }
    }
    .player {
        display: none;
    }

    @keyframes rotating {
        from{
            -webkit-transform: rotate(0deg);
        }
        to{
            -webkit-transform: rotate(360deg);
        }
    }

    .rotating {
        -webkit-animation: rotating 15s linear infinite;
    }
    .music {
        height: 100%;
        aspect-ratio: 1 / 1;
        position: relative;
    }
    img {
        height: 100%;
        border-radius: 15px;
    }
    .round {
        border-radius: 50%;
    }
    button {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 50%;
        background: none;
        cursor: pointer;
    }
    button img {
        background-color: white;
        width: 50%;
        height: 50%;
        border-radius: 50%;
        display: none;
    }
    .controls {
        position: absolute;
        z-index: 999;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .index {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .data {
        margin-left: 25px;
        text-align: left;
    }
    p {
        margin: 0;
    }
    a {
        color: #ffdc2b;
        text-decoration: none;
    }
    a:hover {
        border-radius: 20px;
    }
    a img {
        width: 20px;
        margin-left: 10px;
    }
</style>
