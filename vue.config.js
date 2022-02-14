const path = require('path');

module.exports = {
  publicPath: "/Playlist-Tools",
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/sass/variables.sass";`
      }
    }
  }
};
