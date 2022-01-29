import { SpotifyConnector } from "./spotify_connector";


export class SpotifyCreator {
    static createSpotifyWithDefaultApp() : SpotifyConnector{ 
        return SpotifyConnector.getInstance("2ac461b3dda04901ba2cfffb34878a77",
         "http://localhost:8080/authorize",
         "playlist-modify-private user-library-read user-read-private playlist-modify-public user-library-modify playlist-read-collaborative")
    }
}