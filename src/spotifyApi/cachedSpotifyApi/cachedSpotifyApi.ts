import { SpotifyApi } from "../spotifyApi";
import { SpotifyCache } from "./spotifyCache";

// TODO: SpotifyApi with cache
export class CachedSpotifyApi extends SpotifyApi {
    private spotifyCache: SpotifyCache;

    constructor(clientId: string, callbackUrl: string, scope: string) {
        super(clientId, callbackUrl, scope);
        this.spotifyCache = new SpotifyCache();
    }
}
