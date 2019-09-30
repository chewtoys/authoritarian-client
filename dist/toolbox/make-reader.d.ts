import { ReaderContext } from "../system/interfaces.js";
/**
 * Produce a "reader" for a given state object
 * - a reader is a pubsub context (controls to publish/subscribe to changes)
 */
export declare function makeReader<S extends {} = {}>(state: S): ReaderContext<S>;
