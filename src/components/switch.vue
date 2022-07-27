<template>
    <div class="switch">
        <ul>
            <li>Titre</li>
            <li>Artiste</li>
            <li>Genre</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'switch'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .switch {
        width: 100%;
        background-color: #35363a;
        border-radius: 10px;
        height: 5vh;
        display: flex;
        align-items: center;
        margin-top: 20px;
    }
    ul {
        display: flex;
        width: 100%;
        list-style-type: none;
        justify-content: space-around;
    }
</style>
