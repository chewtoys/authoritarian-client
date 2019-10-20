import { pubsub, pubsubs } from "../toolbox/pubsub.js";
import { makeReader } from "../toolbox/make-reader.js";
const expiryGraceSeconds = 60;
export function createUserModel({ tokenStorage, loginPopupRoutine, decodeAccessToken, }) {
    let authContext;
    const state = {
        error: null,
        loading: false,
        loggedIn: true,
    };
    const { reader, publishStateUpdate } = makeReader(state);
    const { publishers, subscribers } = pubsubs({
        userLogin: pubsub(),
        userError: pubsub(),
        userLogout: pubsub(),
        userLoading: pubsub(),
    });
    subscribers.userLoading(() => {
        state.error = null;
        state.loading = true;
        state.loggedIn = false;
        publishStateUpdate();
    });
    subscribers.userLogin(() => {
        state.loggedIn = true;
        state.loading = false;
        publishStateUpdate();
    });
    subscribers.userError(error => {
        state.error = error;
        publishStateUpdate();
    });
    subscribers.userLogout(() => {
        state.loading = false;
        state.error = null;
        state.loggedIn = false;
        publishStateUpdate();
    });
    /** Receive and decode an access token for login
     * - return an async getter which seamlessly refreshes expired tokens
     * - we pass around a getter instead of an auth context, because auth
     *   context can expire, and so consumers are expected to use this getter
     *   for each new interacton */
    function processAccessToken(accessToken) {
        authContext = decodeAccessToken(accessToken);
        return {
            async getAuthContext() {
                const gracedExp = (authContext.exp - expiryGraceSeconds);
                const expired = gracedExp < (Date.now() / 1000);
                if (expired) {
                    const accessToken = await tokenStorage.passiveCheck();
                    authContext = decodeAccessToken(accessToken);
                }
                return authContext;
            }
        };
    }
    return {
        reader,
        subscribers,
        wiring: {
            publishStateUpdate,
            /** Initial passive check, to see if we're already logged in */
            async start() {
                publishers.userLoading();
                try {
                    const accessToken = await tokenStorage.passiveCheck();
                    if (accessToken) {
                        publishers.userLogin(processAccessToken(accessToken));
                    }
                    else {
                        publishers.userLogout();
                    }
                }
                catch (error) {
                    error.message = `user-model error in start(): ${error.message}`;
                    console.error(error);
                    publishers.userError(error);
                }
            },
            /** Process a new token as a login
             * - some services might return new tokens from the auth server for you */
            async loginWithAccessToken(accessToken) {
                const detail = processAccessToken(accessToken);
                await tokenStorage.writeAccessToken(accessToken);
                publishers.userLogin(detail);
            }
        },
        actions: {
            /** Trigger a user login routine */
            async login() {
                publishers.userLoading();
                try {
                    const authTokens = await loginPopupRoutine();
                    await tokenStorage.writeTokens(authTokens);
                    publishers.userLogin(processAccessToken(authTokens.accessToken));
                }
                catch (error) {
                    console.error(error);
                    publishers.userError(error);
                }
            },
            /** Trigger a user logout routine */
            async logout() {
                publishers.userLoading();
                try {
                    await tokenStorage.clearTokens();
                    authContext = null;
                    publishers.userLogout();
                }
                catch (error) {
                    console.error(error);
                    publishers.userError(error);
                }
            }
        }
    };
}
//# sourceMappingURL=user-model.js.map