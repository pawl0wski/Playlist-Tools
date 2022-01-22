<template>
    <div class="navigation-burger-button">
        <i class="fas fa-bars"></i>
    </div>
</template>

<style lang="scss" scoped>
    div.navigation-burger-button{
        margin-left: auto;
        border-width: 2px;
        border-style: solid;
        border-color: lighten($color: $content-color, $amount: 0.5);
        padding: 5px 10px;
        border-radius: 10px;
        cursor: pointer;
    }
</style>