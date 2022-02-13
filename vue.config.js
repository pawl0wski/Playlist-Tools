const path = require('path');

module.exports = {
  publicPath: "/Spotify-Tools",
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/sass/variables.sass";`
      }
    }
  }
};
