const path = require("path");
const { gitDescribeSync } = require("git-describe");

process.env.VUE_APP_GIT_HASH = gitDescribeSync().hash;

module.exports = {
    publicPath: "/Playlist-Tools",
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/sass/variables.sass";`,
            },
        },
    },
};
