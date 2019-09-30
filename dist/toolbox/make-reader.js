import { pubsub } from "./pubsub.js";
/**
 * Produce a "reader" for a given state object
 * - a reader is a pubsub context (controls to publish/subscribe to changes)
 */
export function makeReader(state) {
    const { publish, subscribe } = pubsub();
    return {
        reader: {
            subscribe,
            get state() { return Object.freeze({ ...state }); },
        },
        publishStateUpdate: () => publish(Object.freeze({ ...state })),
    };
}
//# sourceMappingURL=make-reader.js.map