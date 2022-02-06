import { CachedSpotifyApi } from "./cachedSpotifyApi/cachedSpotifyApi";
import { SpotifyApi } from "./spotifyApi";

export class SpotifyApiFactory {
    static createSpotifyApiWithDefaultApp(): SpotifyApi {
        return SpotifyApi.getInstance(
            process.env.VUE_APP_SPOTIFY_KEY,
            `http://${process.env.VUE_APP_REDIRECT_DOMAIN}/authorize`,
            "playlist-modify-private user-library-read user-read-private playlist-modify-public user-library-modify playlist-read-collaborative playlist-read-private "
        );
    }
    static createCachedSpotifyApiWithDefaultApp(): CachedSpotifyApi {
        return CachedSpotifyApi.getInstance(
            process.env.VUE_APP_SPOTIFY_KEY,
            `http://${process.env.VUE_APP_REDIRECT_DOMAIN}/authorize`,
            "playlist-modify-private user-library-read user-read-private playlist-modify-public user-library-modify playlist-read-collaborative"
        );
    }
}
