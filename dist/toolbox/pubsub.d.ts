import { Pubsub, Pubify, Subify, Pubsubs, AnyListener } from "../system/interfaces.js";
export declare function pubsub<Listener extends AnyListener = AnyListener>(): Pubsub<Listener>;
export declare function pubsubs<O extends Pubsubs>(obj: O): {
    publishers: Pubify<O>;
    subscribers: Subify<O>;
};
