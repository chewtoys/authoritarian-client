import { Reader, AvatarState, AvatarWiring } from "../system/interfaces.js";
export declare function createAvatarModel(): {
    reader: Reader<AvatarState>;
    wiring: AvatarWiring;
};
