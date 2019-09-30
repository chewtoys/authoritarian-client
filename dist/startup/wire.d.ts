import { AvatarState, AuthoritarianOptions } from "../system/interfaces.js";
export declare function wire({ debug, profileMagistrate: profiler, tokenStorage, paywallGuardian, loginPopupRoutine, decodeAccessToken, privateVimeoGovernor, userPanels, profilePanels, paywallPanels, privateVimeos, avatarDisplays, }: AuthoritarianOptions): Promise<{
    user: import("../system/interfaces.js").UserModel;
    avatar: {
        reader: import("../system/interfaces.js").Reader<AvatarState>;
        wiring: import("../system/interfaces.js").AvatarWiring;
    };
    paywall: import("../system/interfaces.js").PaywallModel;
    profile: import("../system/interfaces.js").ProfileModel;
    start(): Promise<void>;
}>;
