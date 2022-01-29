import SpotifyWebApi from "spotify-web-api-js";
import axios from 'axios';

export class SpotifyConnector {
    private static instance: SpotifyConnector;
    private spotifyApi;
    private clientId: string;
    private redirectUri: string;
    private scope: string;

    private username?: string;

    private constructor(clientId: string, redirectUri: string, scope: string) {
        this.spotifyApi = new SpotifyWebApi()
        this.clientId = clientId;
        this.redirectUri = redirectUri;
        this.scope = scope;

        let localStorageAccessToken = localStorage.getItem("accessToken");
        if (localStorageAccessToken) {
            this.setAccessToken(localStorageAccessToken)
        }
    }

    public async setAccessToken(accessToken: string) {
        this.spotifyApi.setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
    }

    public logOut() {
        this.spotifyApi.setAccessToken("");
        localStorage.removeItem("accessToken");
    }

    public static getInstance(clientId: string, redirectUrl: string, scope: string): SpotifyConnector {
        if (SpotifyConnector.instance === undefined) {
            SpotifyConnector.instance = new SpotifyConnector(clientId, redirectUrl, scope);
        }
        return SpotifyConnector.instance;
    }

    public isAuthorized(): boolean {
        return !!localStorage.getItem("accessToken");
    }

    public getAuthUrl(): string {
        let authUrl = "https://accounts.spotify.com/authorize?";
        let authUrlParams = new URLSearchParams();
        authUrlParams.append("response_type", "token");
        authUrlParams.append("redirect_uri", this.redirectUri);
        authUrlParams.append("client_id", this.clientId);
        authUrlParams.append("scope", this.scope);

        return authUrl + authUrlParams.toString()
    }

    public async getUsername(): Promise<string> {
        // Check if user is in localStorage if not get username from spotifyApi
        if (localStorage.getItem("userUsername")) {
            return localStorage.getItem("userUsername")!
        } else {
            let meData = await this.spotifyApi.getMe();
            if (meData) {
                let username = meData.display_name!
                localStorage.setItem("userUsername", username);
                return username;
            } else {
                return ""
            }
        }
    }

    public async getAvatarUrl(): Promise<string> {
        if (localStorage.getItem("userAvatar")) {
            return localStorage.getItem("userAvatar")!;
        } else {
            let meData = await this.spotifyApi.getMe();
            if (meData) {
                let userAvatarUrl = meData.images![0].url;
                localStorage.setItem("userAvatar", userAvatarUrl);
                return userAvatarUrl;
            } else {
                return ""
            }
        }

    }

    public async getCurrentPlaying(): Promise<{ trackName: string | undefined, trackCover: string | undefined }> {
        let currentPlaying = await this.spotifyApi.getMyCurrentPlayingTrack()
        let trackName = currentPlaying.item?.name;
        let trackCover = currentPlaying.item?.album.images[0].url;
        return {
            trackName: trackName,
            trackCover: trackCover
        }
    }

    public async getMyPlaylists(onlyCreatedByMe: boolean = true): Promise<any> {
        let myPlaylists = await this.spotifyApi.getUserPlaylists();

        let authToken = await this.spotifyApi.getAccessToken()!
        
        // Make function for getting playlists recursive by pages
        let getAllPlaylistsByRecursion = async (nextPage : string, accessToken : string): Promise<any[]> => {
            let data = await axios.get(nextPage, {
                headers: {
                    Authorization: `Bearer ${accessToken}` 
                }
            })
            let playlists;
            if (data.data.next) {
                playlists = [...data.data.items, ...await getAllPlaylistsByRecursion(data.data.next, accessToken)]
            }else{
                playlists = data.data.items
            }
            return playlists
        }

        let playlists = [...myPlaylists.items, ...await getAllPlaylistsByRecursion(myPlaylists.next, authToken)]
        
        // Filter only users's playlists
        if (onlyCreatedByMe) {
            let userDisplayName = await this.getUsername()
            playlists = playlists.filter((playlist) => {
                return playlist.owner.display_name === userDisplayName
            })
        }


        return playlists
    }

}