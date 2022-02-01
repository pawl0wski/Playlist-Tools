import { CachedSpotifyApi } from "./cachedSpotifyApi/cachedSpotifyApi";
import { SpotifyApi } from "./spotifyApi";

export class SpotifyApiFactory {
    static createSpotifyApiWithDefaultApp(): SpotifyApi {
        return SpotifyApi.getInstance(
            "2ac461b3dda04901ba2cfffb34878a77",
            "http://localhost:8080/authorize",
            "playlist-modify-private user-library-read user-read-private playlist-modify-public user-library-modify playlist-read-collaborative"
        );
    }
    static createCachedSpotifyApiWithDefaultApp(): CachedSpotifyApi {
        return CachedSpotifyApi.getInstance(
            "2ac461b3dda04901ba2cfffb34878a77",
            "http://localhost:8080/authorize",
            "playlist-modify-private user-library-read user-read-private playlist-modify-public user-library-modify playlist-read-collaborative"
        );
    }
}
