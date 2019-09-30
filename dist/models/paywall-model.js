import { pubsub, pubsubs } from "../toolbox/pubsub.js";
import { makeReader } from "../toolbox/make-reader.js";
export var PaywallMode;
(function (PaywallMode) {
    PaywallMode[PaywallMode["Loading"] = 0] = "Loading";
    PaywallMode[PaywallMode["Error"] = 1] = "Error";
    PaywallMode[PaywallMode["LoggedOut"] = 2] = "LoggedOut";
    PaywallMode[PaywallMode["NotPremium"] = 3] = "NotPremium";
    PaywallMode[PaywallMode["Premium"] = 4] = "Premium";
})(PaywallMode || (PaywallMode = {}));
export function createPaywallModel({ paywallGuardian }) {
    let getAuthContext;
    const state = {
        mode: PaywallMode.LoggedOut
    };
    const { reader, publishStateUpdate } = makeReader(state);
    const { publishers, subscribers } = pubsubs({
        loginWithAccessToken: pubsub(),
    });
    return {
        reader,
        actions: {
            async makeUserPremium() {
                state.mode = PaywallMode.Loading;
                publishStateUpdate();
                const { accessToken } = await getAuthContext();
                const newAccessToken = await paywallGuardian.makeUserPremium({
                    accessToken
                });
                await publishers.loginWithAccessToken(newAccessToken);
                publishStateUpdate();
            },
            async revokeUserPremium() {
                state.mode = PaywallMode.Loading;
                publishStateUpdate();
                const { accessToken } = await getAuthContext();
                const newAccessToken = await paywallGuardian.revokeUserPremium({
                    accessToken
                });
                await publishers.loginWithAccessToken(newAccessToken);
                publishStateUpdate();
            }
        },
        wiring: {
            publishStateUpdate,
            loginWithAccessToken: subscribers.loginWithAccessToken,
            async receiveUserLogin(options) {
                state.mode = PaywallMode.Loading;
                getAuthContext = options.getAuthContext;
                publishStateUpdate();
                const context = await getAuthContext();
                const premium = !!context.user.claims.premium;
                state.mode = premium
                    ? PaywallMode.Premium
                    : PaywallMode.NotPremium;
                publishStateUpdate();
            },
            async receiveUserLogout() {
                state.mode = PaywallMode.LoggedOut;
                publishStateUpdate();
            }
        }
    };
}
//# sourceMappingURL=paywall-model.js.map