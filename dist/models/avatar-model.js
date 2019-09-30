import { makeReader } from "../toolbox/make-reader.js";
export function createAvatarModel() {
    const state = {
        url: "",
        premium: false,
    };
    const { reader, publishStateUpdate } = makeReader(state);
    return {
        reader,
        wiring: {
            publishStateUpdate,
            setPictureUrl(url) {
                state.url = url;
                publishStateUpdate();
            },
            setPremium(premium) {
                state.premium = premium;
                publishStateUpdate();
            },
        }
    };
}
//# sourceMappingURL=avatar-model.js.map