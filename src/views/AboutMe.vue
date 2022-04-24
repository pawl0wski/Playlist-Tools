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
        <div class="project-info">
            <h2>
                Why I created <span class="main-color">Playlist Tools</span>?
            </h2>
            <p>
                I really wanted to test my skills in the Vue framework so I
                decided to make an application that would allow me to clean up
                my playlists. This project is open source you can see it
                <a href="https://github.com/pawl0wski/Playlist-Tools">here</a
                >.
            </p>
            <h2>
                Hey, I found a <span class="main-color">bug</span> where can i
                report it to you?
            </h2>
            <p>
                You can report all bugs in the issue panel on GitHub. If you
                want, you can create a pull request.
            </p>
            <h2>My other <span class="main-color">projects</span>:</h2>
            <div class="repositories-holder">
                <Repository
                    v-for="repo in repos"
                    :key="repo"
                    :title="repo.title"
                    :description="repo.description"
                    :repoUrl="repo.url"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

import Spinner from "@/components/Spinner.vue";
import Repository from "@/components/AboutMe/Repository.vue";

export default defineComponent({
    components: {
        Spinner,
        Repository,
    },
    data(): {
        authorUsername: string;
        authorBio: string;
        authorAvatar: string;
        repos: { title: string; description: string; url: string }[];
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

        // Get info about author
        let authorData = (
            await axios.get("https://api.github.com/users/pawl0wski")
        ).data;

        this.$data.authorUsername = authorData.name;
        this.$data.authorBio = authorData.bio;
        this.$data.authorAvatar = authorData.avatar_url;

        // Get author repositories
        let authorRepositoriesData = (
            await axios.get(
                "https://api.github.com/users/pawl0wski/repos?per_page=100"
            )
        ).data;

        authorRepositoriesData.forEach((e: { [key: string]: any }) => {
            this.$data.repos.push({
                title: e.name,
                description: e.description,
                url: e.svn_url,
            });
        });

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

    div.project-info {
        max-width: 900px;
        width: 80%;

        text-align: left;

        p {
            color: $paragraph-color;
            line-height: 1.8;
        }

        h2 {
            margin-top: 2em;
        }

        div.repositories-holder {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 2em;
            justify-content: flex-start;
            align-items: center;
        }
    }

    div.author-info {
        max-width: 900px;
        width: 80%;
        margin-bottom: 1em;

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