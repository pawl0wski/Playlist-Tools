<template>
    <div class="spinner-wrapper" v-if="isLoading">
        <Spinner />
        <p>Getting data from github</p>
    </div>
    <div class="aboutme-wrapper" v-if="!isLoading">
        <div class="author-info">
            <div class="avatar">
                <img :src="authorAvatar" :alt="authorUsername" />
            </div>
            <div class="author-content">
                <h1>
                    Hi, I'm <span class="main-color">{{ authorUsername }}</span>
                </h1>
                <p>
                    {{ authorBio }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

import Spinner from "@/components/Spinner.vue";

export default defineComponent({
    components: {
        Spinner,
    },
    data(): {
        authorUsername: string;
        authorBio: string;
        authorAvatar: string;
        repos: { title: string; description: string }[];
        isLoading: boolean;
    } {
        return {
            authorUsername: "",
            authorAvatar: "",
            authorBio: "",
            repos: [],
            isLoading: true,
        };
    },
    async created() {
        this.$data.isLoading = true;

        let authorData = (
            await axios.get("https://api.github.com/users/jeboczek")
        ).data;

        this.$data.authorUsername = authorData.name;
        this.$data.authorBio = authorData.bio;
        this.$data.authorAvatar = authorData.avatar_url;

        this.$data.isLoading = false;
    },
});
</script>


<style lang="scss" scoped>
div.spinner-wrapper {
    width: 100%;
    display: flex;
    align-items: center;

    flex-direction: column;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

div.aboutme-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    margin-top: 3em;

    div.author-info {
        max-width: 900px;
        width: 80%;

        border-radius: $border-radius;
        background-color: $content-color;

        display: flex;

        div.avatar {
            height: 250px;
            width: 250px;
            min-width: 240px;

            display: flex;

            align-items: center;
            justify-content: center;

            img {
                height: 60%;
                border-radius: 100%;
            }
        }

        div.author-content {
            padding: 2em;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

    @media screen and (max-width: 700px) {
        div.author-info {
            flex-direction: column;
            text-align: center;
        }

        div.avatar {
            width: 100% !important;
        }

        div.author-content {
            padding-top: unset !important;
        }
    }
}
</style>