import { pubsub } from "../toolbox/pubsub.js";
import { makeReader } from "../toolbox/make-reader.js";
export function createProfileModel({ profiler }) {
    let getAuthContext;
    let cancel = false;
    const state = {
        error: null,
        admin: false,
        loading: true,
        profile: null,
        premium: false,
    };
    const { reader, publishStateUpdate } = makeReader(state);
    const { publish: publishReset, subscribe: subscribeReset } = pubsub();
    async function loadProfile() {
        const { accessToken } = await getAuthContext();
        const profile = await profiler.getFullProfile({ accessToken });
        if (!profile)
            console.warn("failed to load profile");
        return profile;
    }
    return {
        reader,
        subscribeReset,
        actions: {
            async saveProfile(profile) {
                try {
                    state.loading = true;
                    publishStateUpdate();
                    const { accessToken } = await getAuthContext();
                    await profiler.setFullProfile({ accessToken, profile });
                    state.profile = profile;
                }
                catch (error) {
                    state.error = error;
                    state.profile = null;
                }
                state.loading = false;
                publishStateUpdate();
            }
        },
        wiring: {
            publishStateUpdate,
            async receiveUserLoading() {
                cancel = true;
                state.error = null;
                state.loading = true;
                state.profile = null;
                publishStateUpdate();
            },
            async receiveUserLogin(detail) {
                publishReset();
                getAuthContext = detail.getAuthContext;
                cancel = false;
                state.loading = true;
                publishStateUpdate();
                const { user } = await getAuthContext();
                state.admin = !!user.claims.admin;
                state.premium = !!user.claims.premium;
                publishStateUpdate();
                try {
                    const profile = await loadProfile();
                    state.profile = cancel ? null : profile;
                }
                catch (error) {
                    console.error(error);
                    state.error = error;
                }
                state.loading = false;
                publishStateUpdate();
            },
            async receiveUserLogout() {
                state.error = null;
                state.profile = null;
                state.loading = false;
                publishStateUpdate();
            }
        }
    };
}
//# sourceMappingURL=profile-model.js.map