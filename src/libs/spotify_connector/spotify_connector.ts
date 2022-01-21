import SpotifyWebApi from "spotify-web-api-js";
import axios from 'axios';

export class SpotifyConnector{
    private static instance : SpotifyConnector;
    private spotifyApi;
    private clientId: string;
    private redirectUri: string;
    private scope: string;

    private username?: string;

    private constructor(clientId : string, redirectUri : string, scope: string){
        this.spotifyApi = new SpotifyWebApi()
        this.clientId = clientId;
        this.redirectUri = redirectUri;
        this.scope = scope;

        let localStorageAccessToken = localStorage.getItem("accessToken");
        if (localStorageAccessToken) {
            this.setAccessToken(localStorageAccessToken)
        }
    }

    public async setAccessToken(accessToken : string){
        this.spotifyApi.setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
    }

    public static getInstance(clientId : string, redirectUrl : string, scope: string) : SpotifyConnector{
        if (SpotifyConnector.instance === undefined) {
            SpotifyConnector.instance = new SpotifyConnector(clientId, redirectUrl, scope);
        }
        return SpotifyConnector.instance;
    }

    public getAuthUrl() : string{
        let authUrl = "https://accounts.spotify.com/authorize?";
        let authUrlParams = new URLSearchParams();
        authUrlParams.append("response_type", "token");
        authUrlParams.append("redirect_uri", this.redirectUri);
        authUrlParams.append("client_id", this.clientId);
        authUrlParams.append("scope", this.scope);

        return authUrl + authUrlParams.toString()
    }

    public async getUsername(): Promise<String>{
        let meData = await this.spotifyApi.getMe();
        if (meData) {
            return meData.display_name!;
        }else{
            return ""
        }
    }

    public async getCurrentPlaying(): Promise<{trackName: string | undefined, trackCover: string | undefined}> {
        let currentPlaying = await this.spotifyApi.getMyCurrentPlayingTrack()
        let trackName = currentPlaying.item?.name;
        let trackCover = currentPlaying.item?.album.images[0].url;
        return {
            trackName: trackName,
            trackCover: trackCover
        }
    }

}