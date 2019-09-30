import { PrivateVimeoGovernorTopic } from "authoritarian/dist/interfaces";
import { VimeoState, LoginDetail } from "../system/interfaces.js";
export declare enum PrivilegeMode {
    LoggedOut = 0,
    Unprivileged = 1,
    Privileged = 2,
    Admin = 3
}
export declare function createPrivateVimeoModel({ videoName, privateVimeoGovernor }: {
    videoName: string;
    privateVimeoGovernor: PrivateVimeoGovernorTopic;
}): {
    reader: import("../system/interfaces.js").Reader<VimeoState>;
    actions: {
        updateVideo(vimeostring: string): Promise<void>;
    };
    wiring: {
        receiveUserLoading(): Promise<void>;
        receiveUserLogin(detail: LoginDetail): Promise<void>;
        receiveUserLogout(): Promise<void>;
    };
};
