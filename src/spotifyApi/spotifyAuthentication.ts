export class SpotifyAuthentication {
    private clientId: string;
    private callbackUrl: string;
    private scope: string;
    public expiresIn: number | undefined;
    public obtainDate: Date | undefined;
    public authenticationToken: string | undefined;

    constructor(clientId: string, callbackUrl: string, scope: string) {
        this.clientId = clientId;
        this.callbackUrl = callbackUrl;
        this.scope = scope;
        this.loadAuthInfoFromLocalStorage();
    }

    public setAuthInfoAndSaveInLocalStorage(
        authenticationToken: string,
        expiresIn: number
    ) {
        // Save to parameters
        this.authenticationToken = authenticationToken;
        this.expiresIn = expiresIn;
        this.obtainDate = new Date();

        // Save to localStorage
        localStorage.setItem("AuthenticationToken", this.authenticationToken);
        localStorage.setItem(
            "AuthenticationExpiresIn",
            this.expiresIn.toString()
        );
        localStorage.setItem(
            "AuthenticationObtainDate",
            this.obtainDate.getTime().toString()
        );
    }

    public loadAuthInfoFromLocalStorage() {
        // Get values from localStorage
        let authToken = localStorage.getItem("AuthenticationToken");
        let expiresIn = localStorage.getItem("AuthenticationExpiresIn");
        let obtainDate = localStorage.getItem("AuthenticationObtainDate");

        if (
            // Check if values are valid
            authToken &&
            expiresIn &&
            obtainDate
        ) {
            // Save it to parameters
            this.authenticationToken = authToken;
            this.expiresIn = parseInt(expiresIn);
            this.obtainDate = new Date(parseInt(obtainDate));
        }
    }

    private renewToken() {
        let authUrl = "https://accounts.spotify.com/authorize?";
        let authUrlParams = new URLSearchParams();
        authUrlParams.append("response_type", "token");
        authUrlParams.append("redirect_uri", this.callbackUrl);
        authUrlParams.append("client_id", this.clientId);
        authUrlParams.append("scope", this.scope);

        window.location.replace(authUrl + authUrlParams.toString());
    }

    public getTokenOrRenew(): string | undefined {
        // Check if AuthenticationToken is set
        if (this.authenticationToken) {
            // Get now Unix time
            if (this.isAuthorized()) {
                return this.authenticationToken;
            }
        }
        // if everything up is false
        this.renewToken();
    }

    public logOut() {
        this.expiresIn = undefined;
        this.obtainDate = undefined;
        this.authenticationToken = undefined;

        localStorage.removeItem("AuthenticationToken");
        localStorage.removeItem("AuthenticationExpiresIn");
        localStorage.removeItem("AuthenticationObtainDate");
    }

    public isAuthorized(): boolean {
        let nowUnixTime = new Date().getTime();
        return !!(
            // Check if obtainDate and expiresIn is set
            (
                this.obtainDate &&
                this.expiresIn &&
                // Check if authenticationToken is not expired
                this.obtainDate.getTime() + this.expiresIn * 1000 >= nowUnixTime
            )
        );
    }
}
