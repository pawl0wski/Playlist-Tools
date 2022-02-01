export interface SongStats {
    // id in SongStats store id of Song not id of SongStats from Spotify Api!
    id: string;
    acousticness: number;
    danceability: number;
    energy: number;
    instrumentalness: number;
    liveness: number;
    loudness: number;
    speechiness: number;
    tempo: number;
    valence: number;
}
