<template>
    <button>
        <img src="../assets/spotifyLogo.svg">
        Log in with Spotify
    </button>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    button{
        background-color: $main-color-darker;
        border-radius: 21px;
        border-style: none;
        
        padding: 10px 18px;

        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1em;

        cursor: pointer;

        transition: background-color 0.15s;

        font-size: medium;

        img {
            width: 2em
        }

        &:hover{
            background-color: $main-color;
        }
    }
</style>